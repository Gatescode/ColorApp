import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component, useState} from 'react';
import Home from './Home';
import Homeicon from '../assets/home.svg';
import { loadAsync } from 'expo-font';
import AppLoading from 'expo-app-loading';

// https://www.youtube.com/watch?v=gPaBicMaib4

const getFonts = () =>
    loadAsync({
        ApercuBold: require("../assets/Apercu-Bold.otf"),
        Apercu: require("../assets/Apercu-Regular.otf"),
});


const Tab = createBottomTabNavigator();
const Tabs = () => {
    const [fontsloaded, setFontsLoaded] = useState(false);
    if (fontsloaded){
        return(
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    return <Homeicon />
                }
                
            })} tabBarOptions={{labelStyle: {fontFamily: "Apercu"}}}>
                <Tab.Screen name="Home" component={Home} />
            </Tab.Navigator>
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
    
};
//text: #797876
export default Tabs;

