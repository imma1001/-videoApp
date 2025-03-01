import { View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icons';
import { router, usePathname } from 'expo-router';

export default function SearchInput() {
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query) {
      return Alert.alert('Missing Query', 'Please enter something to search.');
    }

    if(pathname.startsWith('/search'))
        router.setParams({query})
     else 
      router.push(`/search/${query}`)
    
  };
  console.log("Navigating to:", `/search/${query}`)

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="What are you looking for?"
        placeholderTextColor='rgba(225, 219, 211, 0.71)'
        value={query}
        onChangeText={(e)=>setQuery(e)}
      />

      <TouchableOpacity onPress={handleSearch} style={styles.iconWrapper}>
        <Image style={styles.icon} source={icons.search} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(176, 90, 223)',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: 'rgb(231, 163, 67)',
  },
  iconWrapper: {
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
