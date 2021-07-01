import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component, useState} from 'react';
import Home from './Home';
import Gallery from './Gallery';
import HomeIcon from '../assets/home.svg';
import GalleryIcon from '../assets/gallery.svg';
import SettingsIcon from '../assets/settings.svg';
import { loadAsync } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Settings from './Settings';

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
                    if (route.name === "Home"){
                        return <HomeIcon />;
                    }
                    else if (route.name === "Gallery"){
                        return <GalleryIcon />;
                    }
                    else if (route.name === "Settings"){
                        return <SettingsIcon />;
                    }
                }
                
            })} tabBarOptions={{labelStyle: {fontFamily: "Apercu"}}}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Gallery" component={Gallery}/>
                <Tab.Screen name="Settings" component={Settings}/>
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

