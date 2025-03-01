import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import icons from "@/constants/icons";
import useAppwrite from "@/config/useAppwrite";
import EmptyState from "@/components/EmptyState";
import VideoCard from '@/components/VideoCard';
import { getUserPosts, signOut } from "../../config/appWrite_config";
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const Profile = () => {
  const router = useRouter();
  const { user, setUser, setIsLogged } = useGlobalContext();

  // Handle case where user is not logged in
  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>You need to log in to view your profile.</Text>
        <Button button={'Login'} handlePress={()=>router.push('/login')}/>
      </SafeAreaView>
    );
  }

  // Fetch user's posts using userId
  console.log("Logged-in User:", user); 
  const { data: posts, error } = useAppwrite(() => getUserPosts(user?.$id));

  if (error) {
    console.log("Error fetching posts:", error);
  }

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            username={user?.username || "Unknown"}
            avatar={user?.avatar || ""}
          />
        )}
        ListEmptyComponent={() =>
          error ? (
            <Text style={styles.errorText}>Failed to load posts. Please try again.</Text>
          ) : (
            <EmptyState title="No Videos Found" subtitle="No videos found for this profile" />
          )
        }
        ListHeaderComponent={() => (
          <View style={styles.profileCard}>
            {user?.$id && (
              <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
              </TouchableOpacity>
            )}
            <View style={styles.avatarContainer}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <Text style={styles.noAvatar}>No Avatar</Text>
              )}
            </View>

            {/* Username & Stats */}
            <Text style={styles.usernameText}>{user?.username || "Guest"}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>{posts?.length || 0} Posts</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#111133",
  },
  profileCard: {
    backgroundColor: "rgba(8, 62, 83, 0.71)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    position: "absolute",
    right: 15,
    top: 15,
    borderRadius: 20,
  },
  logoutIcon: {
    width: 25,
    height: 25,
    tintColor: "#FFF",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#BB86FC",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#333",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  noAvatar: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  usernameText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#BBBBBB",
    marginRight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111133",
  },
  errorText: {
    color: 'rgb(236, 209, 100)',
    fontSize: 26,
    marginBottom: 10,
  },

});

export default Profile;
