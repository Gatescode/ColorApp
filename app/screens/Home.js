import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, Dimensions } from 'react-native';
import Rainbow from '../assets/HomeRainbow.svg';
import { loadAsync, useFonts } from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


//FOLLOW IT, BUT DONT IMPLEMENT TABS.JS IN APP, DO IN HOME SCREENS





const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});
// const bottomTabNavigator = createBottomTabNavigator(
//     {
//       Home: HomeScreen,
//       Gallery: GalleryScreen,
//     },
//     {
//       initialRouteName: 'Home'
//     }
// );
// class HomeScreen extends React.Component {
//     render() {
//       return(
//         <Home />
//       );
//     }
// }
// class GalleryScreen extends React.Component {
//     render() {
//       return(
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Text> This is my gallery screen </Text>
//         </View>
//       );
//     }
// }
// const AppContainer = createAppContainer(bottomTabNavigator);

export default function Home(props){
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <View style={{alignItems: "center", top:(5/100)*windowHeight}}>
                <View style={{top: "-20%"}}>
                    <Rainbow style={styles.rainbowimg} />
                    <View style={{position: "relative", zIndex: 1, top: "-20%"}}>
                        <Text style={{fontSize: 35, fontFamily: "ApercuBold", letterSpacing: -2, alignSelf: 'center'}}>Hello.</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", top: "65%", width: windowWidth, paddingLeft: (26/414)*windowWidth, paddingRight: (26/414)*windowWidth}}>
                    <View style={{flexDirection: 'row', justifyContent:"space-between", marginBottom: windowHeight*(22/734)}}>
                        <Pressable style={styles.quickbtn}>
                            <Text style={{fontFamily: "ApercuBold", fontSize: 18}}>Scan</Text>
                        </Pressable>
                        <Pressable style={styles.quickbtn}>
                            <Text style={{fontFamily: "ApercuBold", fontSize: 18}}>Import</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.largequickbtn}>
                            <Text style={{fontFamily: "ApercuBold", left: "5.2486%", top: "19.8%",marginBottom: "9.48%", fontSize: 15}}>Recents</Text>
                            <Text style={{fontFamily: "Apercu", left: "5.2486%", position: "absolute", top: "44.8%", fontSize: 12}}>View your recent scanned colors.</Text> 
                        </Pressable>
                        <Pressable style={styles.largequickbtn}>
                            <Text style={{fontFamily: "ApercuBold", left: "5.2486%", top: "21.55%",marginBottom: "9.48%", fontSize: 15}}>Gallery</Text>
                            <Text style={{fontFamily: "Apercu", left: "5.2486%", position: "absolute", top: "46.55%", fontSize: 12}}>View all of your palettes.</Text> 
                        </Pressable>
                    </View>
                </View>
                
            </View>
        );
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
const styles = StyleSheet.create({
    rainbowimg: {
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.32,
        shadowRadius: 10
    },
    quickbtn: {
        //flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#EAE7E2',
        borderRadius: 9,
        paddingTop: '1.77%',
        paddingBottom: '1.77%',
        // paddingLeft: '16.17%',
        // paddingRight: '16.17%',
        width: (173/414)*windowWidth

    },
    largequickbtn: {
        marginBottom: windowHeight*(22/734),
        backgroundColor: "#F5F3F0",
        borderRadius: 9,
        height: windowHeight*(116/734)
    }
});
//87.4%

//26/414 * width