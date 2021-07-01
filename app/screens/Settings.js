import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions, ScrollView, TextInput, Switch } from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import { useState } from 'react';
import * as Linking from 'expo-linking';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});
const storeColorMode = async (value) => {
    try {
      await AsyncStorage.setItem('colormode', value);
    } catch (e) {
      // saving error
      console.error(e);
    }
}

const retrieveColorMode = async () => {
  try {
    const value = await AsyncStorage.getItem('colormode');
    if(value !== null) {
        return value;
      // value previously stored
    }
    else {
        return value;
    }
  } catch(e) {
      console.error(e);
    // error reading value
  }
}
if (!retrieveColorMode()){
    storeColorMode("HEX");
}
export default function Settings(props){
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [colorMode, setColorMode] = useState(null);
    React.useEffect(() => {
        retrieveColorMode().then(setColorMode);
    }, []);
    
    if (fontsloaded){
        return (
            
            <SafeAreaView style={{top: (45/734)*windowHeight, alignItems: "center"}}>
                <Text style={{fontFamily: 'ApercuBold', fontSize: 40, letterSpacing: -2, alignSelf: "center", marginBottom: (27/734)*windowHeight}}>Settings</Text>
                <Text style={{fontFamily: "Apercu", fontSize: 20, letterSpacing: -2, marginBottom: (15/734)*windowHeight}}>What color system do you wish to use?</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: (45/734)*windowHeight}}>
                    <Text style={{fontFamily: "ApercuBold", fontSize: 20, letterSpacing: -2, color: colorMode == "HEX" ? "#3A3937" : "#939393", marginRight: (11/414)*windowWidth}}>HEX</Text>
                    {/*add switchable here}*/}
                    <Switch style={{marginRight: (11/414)*windowWidth}} trackColor={{false: "#3A3937", true: "#3A3937"}} onValueChange={() => {
                        if (colorMode == "HEX"){
                            setColorMode("RGB");
                            storeColorMode("RGB");
                        }
                        else {
                            setColorMode("HEX");
                            storeColorMode("HEX");
                        }
                    }} ios_backgroundColor="#3A3937" value={colorMode == "RGB"} />
                    <Text style={{fontFamily: "ApercuBold", fontSize: 20, letterSpacing: -2, color: colorMode == "RGB" ? "#3A3937" : "#939393"}}>RGB</Text>
                </View>
                
                <Text style={styles.settingssubhead}>Instructions and FAQ</Text>

                
                <Pressable>
                    <Text style={styles.settingssubtext}>How it works</Text>
                    
                </Pressable>
                <Pressable>
                    <Text style={[styles.settingssubtext, {marginBottom: (47/734)*windowHeight}]}>FAQ</Text>
                    
                </Pressable>
                <Text style={styles.settingssubhead}>Support and Share</Text>
                    
                <Pressable>
                    <Text style={styles.settingssubtext}>Help us improve Color</Text>

                </Pressable>
                <Pressable>
                    <Text style={styles.settingssubtext}>Request a feature</Text>
                    
                </Pressable>
                <Pressable onPress={() => {Linking.openURL("https://www.cnn.com/")}}>
                    <Text style={styles.settingssubtext}>Report bugs/features</Text>
                
                </Pressable>
                <Pressable>
                    <Text style={[styles.settingssubtext, {marginBottom: (47/734)*windowHeight}]}>Share with a friend</Text>
                    
                </Pressable>
                <Pressable>
                    <Text style={[styles.settingssubhead, {textDecorationLine: "underline"}]}>Privacy Policy</Text>
                </Pressable>
                <Pressable>
                    <Text style={[styles.settingssubhead, {textDecorationLine: "underline"}]}>Terms of Conditions</Text>

                </Pressable>


            </SafeAreaView>
            
        );
    }
    else {
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
const styles = StyleSheet.create({
    settingssubhead: {
        fontFamily: "ApercuBold",
        fontSize: 25,
        letterSpacing: -2,
        marginBottom: (9/734)*windowHeight
    },
    settingssubtext: {
        fontFamily: "Apercu",
        fontSize: 20,
        letterSpacing: -2,
        marginBottom: (1/734)*windowHeight,
        color: "#2a88c7"
    }
});