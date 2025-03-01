import { View, Text, Image, TouchableOpacity } from 'react-native';
import icons from '@/constants/icons'
import React, { useState } from 'react';
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoCard({ title, thumbnail, username, avatar,prompt ,video}) {
    const [isPlaying,setIsPlaying] = useState(false)
    function getYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    
    // Example usage:
    const videoId = getYouTubeVideoId(video);
    console.log(videoId); 

  return (
    <View style={{paddingTop:10,margin:10}}>
        <View style={styles.infoContainer}>
        
        <Image source={{ uri: avatar }} style={styles.avatar} />
    
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.creator}>By {username}</Text>
        </View>
        </View>
     {isPlaying?(<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <YoutubePlayer
                style={{flex: 1,  justifyContent: "center",alignItems: "center",}}
                height={300}
                width={'80%'}
                play={isPlaying}
                videoId={videoId}
                onChangeState={(event) => {
                    if (event === "ended") setIsPlaying(false);
                }}
                /></View>):(
    <TouchableOpacity onPress={()=>setIsPlaying(true)} style={styles.card} activeOpacity={0.7}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <Image 
        source={icons.play} 
        style={{ width: 30, height: 30, tintColor: 'white', position:'absolute', bottom:'45%',left:'47%'}} 
        resizeMode="contain"
        />
    </TouchableOpacity>
     )}
     <Text style={styles.prompt} numberOfLines={2}>{prompt}</Text>
  </View>
  );
}

const styles = {
  card: {
    position:'relative',
    width: '80%',  
    alignSelf: 'center', 
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 6,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', //repeat-cover-center-contain-stretch
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  creator: {
    fontSize: 15,
    color: '#bbb',
  },
  prompt: {
    fontSize: 15,
    color: '#ffffdd',
    marginTop: 2,
    textAlign: 'center', 
  },
  
};
