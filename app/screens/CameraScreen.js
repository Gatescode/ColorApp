import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions, ScrollView, TextInput } from 'react-native';
import { loadAsync } from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BitMap } from 'glaciall-bitmap';
import { Camera } from 'expo-camera';
const windowHeight = Dimensions.get("window").height;
import SaveIcon from '../assets/save.svg';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get("window").width;
const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});
export default function CameraScreen(props){
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [currentColor, setCurrentColor] = useState("...");
    const [onScreen, setOnScreen] = useState(false);
    const navigation = useNavigation();
    const cameraRef = useRef(null);
    navigation.addListener("blur", () => {
        setOnScreen(false);
    });
    navigation.addListener("focus", () => {
        setOnScreen(true);
    });
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            console.log(status);
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView>
                <Text>No access to camera</Text>
            </SafeAreaView>
        );
    }
    
    if (fontsloaded){
        if (onScreen){
            return (
                <View style={{flex: 1}}>
                    <Camera ref={cameraRef} style={{flex: 1, justifyContent: "flex-end"}} type={type} onCameraReady={async () => {
                        if (cameraRef){
                            await cameraRef.current.takePictureAsync({base64: true}).then((data) => {
                                console.log(data.width, data.height);
                                // var hi = new BitMap();
                                // hi.fromBase64(data.base64);
                                // console.log(hi.data.length);

                                //console.log(data);
                                //207, 336.5, USE STATE, SAME AS POINTER POSITION
                                
                            });
                            if (!onScreen){
                                cameraRef.current.pausePreview();
                            }
                        }
                    }}>
                        <View style={{alignSelf: "center", backgroundColor: "#58c488", width: 25, height: 25}}>
    
                        </View>
                        <View style={{flexDirection: "row", height: (75/736)*windowHeight, alignItems: "center", justifyContent: "space-evenly", backgroundColor: "transparent"}}>
                            <View style={{backgroundColor: "#a684b0", borderRadius: 9, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: (150/414)*windowWidth}}>
                                <Text style={{color: "white", fontFamily: "ApercuBold", letterSpacing: -1, fontSize: 20}}>#lskdjf</Text>
                            </View>
                            <Pressable style={{backgroundColor: "transparent", borderRadius: 9, borderColor: "#EAE7E2", borderWidth: 2, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: (150/414)*windowWidth}}>
                                <Text style={{fontFamily: "ApercuBold", letterSpacing: -1, fontSize: 16, color: "rgba(140, 140, 140, 1)"}}>Copy to Clipboard</Text>
                            </Pressable>
                            <Pressable style={{backgroundColor: "white", borderRadius: 9, borderColor: "#EAE7E2", borderWidth: 2, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: 0.55*(75/736)*windowHeight}}>
                                <SaveIcon />
                            </Pressable>
                        </View>
                    </Camera>
                    
                </View>
            );
        } else {
            return null;
        }
    } else {
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