import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/Search';
import EmptyState from '@/components/EmptyState';
import { useEffect } from 'react';
import useAppwrite from '@/config/useAppwrite';
import { searchPosts } from '../../config/appWrite_config';
import VideoCard from '@/components/VideoCard';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
              title={item.title}
                thumbnail={item.thumbnail}
                username={item.creator.username}
                avatar={item.creator.avatar}
                video={item.video}
                prompt={item.prompt}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.subTitle}>Search Results</Text>
            <Text style={styles.title}>{query}</Text>

            <View style={styles.searchContainer}>
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111133", 
    height: "100%", 
  },
  headerContainer: {
    paddingHorizontal: 16, 
    marginVertical: 24, 
  },
  subTitle: {
    fontSize: 14, 
    fontFamily: "Popp", 
    color: "#D1D5DB", 
  },
  title: {
    fontSize: 24, 
    fontFamily: "Popp",
    color: "#FFFFFF", 
    marginTop: 4, 
  },
  searchContainer: {
    marginTop: 24, 
    marginBottom: 32, 
  },
});

export default Search;
