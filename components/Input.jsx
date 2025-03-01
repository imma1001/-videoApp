import { View, Text,KeyboardAvoidingView,TextInput, Image,TouchableWithoutFeedback,Platform,StyleSheet, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

export default function Input({lable,lableStyle,inputStyle, placeholder,placeColor,placeTextColor,icon ,value,onChangeText}) {
  const [secureText, setSecureText] = useState(true)
  
  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS ==='ios'?'padding':'height'}
    keyboardVerticalOffset={Platform.OS === 'ios'?100:0}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View> 
                <Text style={lableStyle}>{lable}</Text>
                <View style={styles.inputContainer}>
                {icon && <Image source={icon} style={styles.icon} />}
                    <TextInput
                        style={[styles.input, inputStyle]}
                        placeholder={placeholder}
                        placeholderColor={placeColor}
                        placeholderTextColor={placeTextColor}
                        secureTextEntry={lable === 'Password' && secureText}
                        value={value}
                        onChangeText={onChangeText}
                    />
                    {lable === 'Password' &&(
                      <TouchableOpacity onPress={()=>{setSecureText(!secureText)}}>
                      <Image source={secureText ? icons.eye : icons.eyeHide} style={styles.eye}></Image>
                      </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    innerContainer: {
      width: '100%',
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 1,
      borderColor: 'rgb(140, 101, 218)',
      borderRadius: 8,
      paddingHorizontal: 10,
      margin:10
    },
   
    input: {
      flex: 1, 
      padding: 10,
      color:'rgb(236, 170, 65)'
    },
    icon: {
      width: 20, 
      height: 20, 
      marginLeft: 10, 
    },
    eye:{
      width:25,
      height:25 
    }
  });
  