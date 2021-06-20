import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { SvgXml } from 'react-native-svg';
import Rainbow from '../assets/HomeRainbow.svg';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
export default function Home(props){
    return (
        <Rainbow style={styles.rainbowimg} />
        
    );
}
const styles = StyleSheet.create({
    rainbowimg: {
        width: widthPercentageToDP('115.2%'),
        height: heightPercentageToDP('44.2%'),
        top: -12,
        alignSelf: 'center'
    }
});