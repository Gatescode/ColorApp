global.Buffer = global.Buffer || require('buffer').Buffer;
import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions, ScrollView, TextInput } from 'react-native';
import { loadAsync } from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
const windowHeight = Dimensions.get("window").height;
import SaveIcon from '../assets/save.svg';
import { Asset } from 'expo-asset';
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
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [currentColor, setCurrentColor] = useState("...");
    const [onScreen, setOnScreen] = useState(false);
    //const [uriSource, setUriSource] = useState(null);
    const navigation = useNavigation();
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
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
                    <Camera ref={cameraRef} style={{flex: 1, justifyContent: "flex-end"}} type={type} onCameraReady={() => {
                        if (cameraRef){
                            // setTimeout(() => {
                            //     cameraRef.current.takePictureAsync({base64: true, skipProcessing: true}).then((data) => {
                            //         //console.log(data.base64);
                            //         const uriSource = "data:image/jpg;base64," + data.base64;
                            //         console.log("in first .then");
                                    

                            //     });
                            // }, 4000);
                            if (!onScreen){
                                cameraRef.current.pausePreview();
                            }
                        }
                    }}>
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