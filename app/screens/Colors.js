import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions, ScrollView, TextInput } from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import { useState } from 'react';
import BackIcon from '../assets/back.svg';
import Gallery from './Gallery';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});



var k = 1;




export default function Colors({paintingName, hexCodesArray, paintingId}){
    var hexCodesArrayReal = JSON.parse(hexCodesArray);
    const [fontsloaded, setFontsLoaded] = useState(false);
    if (fontsloaded){
        return (
            <SafeAreaView style={{top: (45/734)*windowHeight}}>
                <Pressable style={{position: "absolute", left: (18.2/414)*windowWidth}} onPress={() => {console.log("btn cliked"); Gallery.colorsLoaded = false}}>
                    <BackIcon />
                </Pressable>
                <Text style={{fontFamily: 'ApercuBold', fontSize: 40, letterSpacing: -2, alignSelf: "center", marginBottom: (27/734)*windowHeight}}>{paintingName}</Text>
                <ScrollView>
                    {hexCodesArrayReal.map(item => (
                        <View key={++k} style={{backgroundColor: item, width: "100%", justifyContent: 'center', height: (78/734)*windowHeight, paddingLeft: (16/414)*windowWidth}}>
                            <Text style={{fontFamily: "ApercuBold", fontSize: 25, letterSpacing: -2}}>
                                {item}
                            </Text>
                        </View>
                    ))}
                    <Pressable style={{width: "100%", justifyContent: 'center', alignItems: "center", height: (78/734)*windowHeight}}>
                        <Text style={{fontFamily: "ApercuBold", fontSize: 25, letterSpacing: -2}}>
                            + Add color
                        </Text>
                    </Pressable>
                    
                </ScrollView>

            </SafeAreaView>
        );
        
    }else {
        return (
            <AppLoading
                
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}
