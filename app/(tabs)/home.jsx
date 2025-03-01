import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import SearchInput from '@/components/Search';
import Trending from '@/components/Tending';
import EmptyState from '@/components/EmptyState';
import Button1 from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import useAppwrite from '@/config/useAppwrite'
import { getAllPosts ,getTrendPosts } from '../../config/appWrite_config'
import VideoCard from '@/components/VideoCard';
import {useGlobalContext} from '@/context/GlobalContext'

export default function Home() {
  
  const R = useRouter()
  const [refresh,setRefresh]= useState(false)
  const { user } = useGlobalContext();
  const { data: posts ,refetch} = useAppwrite(getAllPosts)
  console.log(posts)
  const { data: Trendposts } = useAppwrite(getTrendPosts)
  console.log(Trendposts)

  const onRefresh = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
};  
  
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#111133' }}> 
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id ?? index.toString()} 
        renderItem={({ item }) => (
          <View>
              <VideoCard
                title={item.title}
                thumbnail={item.thumbnail}
                username={item?.creator?.username}
                avatar={item?.creator?.avatar}
                video={item.video}
                prompt={item.prompt}
              />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ padding: 5, margin: 5, gap: 5 }}>
            <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
              {!user?(<Button1 button={"Sign in"} handlePress={()=>R.push('/login')} />):(
              <View style={{ padding:10,margin:10}}>
                <Text style={{ color: '#fffddd' ,fontFamily:'Lora',fontSize:30}}>Welcome Back</Text>
                <Text style={{ color: '#fffddd' ,fontFamily:'SpaceMono',color:'#868dfe',fontSize:20, paddingLeft:20}}>{user?.username}</Text>
              </View>
            )}

              <View>
               <Image style={{ height: 50, width: 50 }} resizeMode='contain' source={images.logoSmall} />
              </View>
            </View>
            <SearchInput />
            <View>
              <Text style={{ color: '#fffddd', fontSize: 18 ,padding:10}}>Latest Videos</Text>
              <Trending posts={posts ?? []} />  
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload!"
          />
          
          <Button1 button={"Create Video"} handlePress={()=>R.push('/create')} />
          </View>
        )}
        refreshControl={
        <RefreshControl  refreshing={refresh} onRefresh={onRefresh}/>
      }
      />

    </SafeAreaView>
  );
}
