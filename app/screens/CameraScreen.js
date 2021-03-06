global.Buffer = global.Buffer || require('buffer').Buffer;
import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions, ScrollView, TextInput } from 'react-native';
import { loadAsync } from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera } from 'react-native-camera';
import { GLView } from 'expo-gl';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
const windowHeight = Dimensions.get("window").height;
import SaveIcon from '../assets/save.svg';
import { Asset } from 'expo-asset';
import ViewShot from "react-native-view-shot";
import { useNavigation } from '@react-navigation/native';
import { decode } from 'base64-arraybuffer';
var jpeg = require('jpeg-js');
import Expo2DContext from 'expo-2d-context';
var base64 = require('base-64');
const re = require('data-uri-regex');
const windowWidth = Dimensions.get("window").width;






const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});
export default function CameraScreen(props){
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [type, setType] = useState(RNCamera.Constants.Type.back);
    const [currentColor, setCurrentColor] = useState("...");
    const [onScreen, setOnScreen] = useState(false);
    //const [uriSource, setUriSource] = useState(null);
    const navigation = useNavigation();
    const cameraRef = useRef(null);
    navigation.addListener("blur", () => {
        setOnScreen(false);
    });
    
    navigation.addListener("focus", () => {
        setOnScreen(true);
    });
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await RNCamera.requestPermissionsAsync();
    //         console.log(status);
    //         setHasPermission(status === 'granted');
    //     })();
    // }, []);


    
    if (fontsloaded){
        if (onScreen){
            return (
                <View style={{flex: 1}}>
                    {/* <ViewShot onCapture={(uri) => {console.log("VIEW URI:  HERE----" + uri)}}> */}
                        <RNCamera captureAudio={false} ref={cameraRef} style={{flex: 1, justifyContent: "flex-end"}} type={type} androidCameraPermissionOptions={{title: "Permission to use camera", message: "We need your permission to use your camera", buttonNegative: 'Cancel', buttonPositive: "OK"}} onCameraReady={() => {
                            if (cameraRef){
                                
                            }
                        }} />
                    {/* </ViewShot> */}
                        
                        {/* <GLView style={{width: 1, height: 1}} onContextCreate={(gl) => {
                            console.log("in contextCreate");
                            if (uriSource){
                                console.log("e yes");

                                // Asset.fromURI(uriSource).downloadAsync().then((data) => {console.log(data)}).catch((error) => {
                                //     console.log(error)
                                // });
                                // var ctx = new Expo2DContext(gl, {renderWithOffscreenBuffer: true});
                                // ctx.drawImage(asset, 0, 0, asset.width, asset.height);
                                // const imageData = ctx.getImageData(50, 50, 1, 1).data;
                                // console.log(imageData);
                            }

                        }}/> */}

                        <View style={{alignSelf: "center", backgroundColor: "#58c488", width: 25, height: 25}}>
                        </View>
                        <View style={{flexDirection: "row", height: (75/736)*windowHeight, alignItems: "center", justifyContent: "space-evenly", backgroundColor: "transparent"}}>
                            <View style={{backgroundColor: "#a684b0", borderRadius: 9, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: (150/414)*windowWidth}}>
                                <Text style={{color: "white", fontFamily: "ApercuBold", letterSpacing: -1, fontSize: 20}}>{currentColor}</Text>
                            </View>
                            <Pressable style={{backgroundColor: "transparent", borderRadius: 9, borderColor: "#EAE7E2", borderWidth: 2, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: (150/414)*windowWidth}}>
                                <Text style={{fontFamily: "ApercuBold", letterSpacing: -1, fontSize: 16, color: "rgba(140, 140, 140, 1)"}}>Copy to Clipboard</Text>
                            </Pressable>
                            <Pressable style={{backgroundColor: "white", borderRadius: 9, borderColor: "#EAE7E2", borderWidth: 2, height: "55%", justifyContent: "space-evenly", alignItems: "center", width: 0.55*(75/736)*windowHeight}}>
                                <SaveIcon />
                            </Pressable>
                        </View>
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