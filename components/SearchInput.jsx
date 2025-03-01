import React from "react";
import { View, Image, StyleSheet } from "react-native";

const SearchInput = ({ 
  icon, 
  containerStyle, 
   
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={icon} style={styles.icon} />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#aaa",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
  },
  listView: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#d4d4d4",
    elevation: 3,
  },
});

export default SearchInput;
