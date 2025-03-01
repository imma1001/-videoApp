import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React from 'react';

export default function Trending({ posts }) {
  const zoomIn = {
    0: { scale: 0.8, opacity: 0 },
    1: { scale: 1, opacity: 1 }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item, index }) => (
        <Animatable.View 
          style={styles.card}
          animation={zoomIn} 
          duration={500} 
          delay={index * 100} 
          useNativeDriver={false}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </Animatable.View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height:250,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "85%",
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

});
