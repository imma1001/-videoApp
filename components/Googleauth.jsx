import { View, Text, StyleSheet, TouchableOpacity, Image, Alert,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import  icons  from '../constants/icons'
import { auth ,provider} from '@/config/firebase_config';
import { signInWithPopup, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function Googleauth() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web-based Google Sign-In
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
      } else {
        if (!request) {
          console.error("Auth request not ready yet");
          return;
        }
      }
      router.push('/(tabs)/home');  // Navigate after login
    
      const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID
      const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email%20profile&prompt=consent`;

      const result = await AuthSession.authenticateAsync({ url: authUrl });

      if (result?.type === "success") {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        Alert.alert("Success", "Google Sign-In Successful!");
        router.push("/(tabs)/home");
      } else {
        Alert.alert("Failed", "Google Sign-In Canceled");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signInWithGoogle} style={styles.googleButton}>
        <Image source={icons.google} style={styles.googleIcon} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  googleButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 5, elevation: 2 },
  googleIcon: { width: 24, height: 24, marginRight: 10 },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

