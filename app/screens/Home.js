import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Button } from 'react-native';
import Constants from 'expo-constants';
import { SvgXml } from 'react-native-svg';
import Rainbow from '../assets/HomeRainbow.svg';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { loadAsync, useFonts } from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { wp, hp } from '../assets/dimen';

const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});

export default function Home(props){
    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <View>
                <Rainbow style={styles.rainbowimg} />
                <Text style={{fontSize: 35, fontFamily: "ApercuBold", letterSpacing: -2, alignSelf: 'center', top: '-22.7%'}}>Hello.</Text>
                {/*<SafeAreaView style={styles.interactivecontainer}>
                    <Button style={styles.quickbtn} title="Scan" />
                </SafeAreaView>*/}
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
        width: wp(477),
        height: heightPercentageToDP('44.2%'),
        top: '-3%',
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.32,
        shadowRadius: 10
    },
    interactivecontainer:{
        //flex: 1,    
        //flexDirection: 'row',
        /*paddingLeft: '6.28%',
        paddingRight: '6.28%',*/
    },
    quickbtn:{
        //flex: 1,
        borderColor: "#EAE7E2",
        borderRadius: 9,
        paddingTop: '3.14%',
        paddingBottom: '3.14%',
        paddingLeft: '16.18%',
        paddingRight: '16.18%',
        backgroundColor: '#284792',
        width: wp(173),
        height: hp(48)
    }
});