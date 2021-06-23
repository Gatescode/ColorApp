import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen'; // <-- import it
import Home from './app/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './app/screens/BottomNavBar';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync().catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App() {
    React.useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 1000); // <-- Set this to `5000` ms to hide it after 5 seconds
    }, []);
    const theme = {
        dark: false,
        colors: {
            primary: 'blue',
            background: 'white',
            card: 'white',
            border: '#EAE7E2'
        },
    };
    return (
        <NavigationContainer theme={theme}>
            <Tabs />
        </NavigationContainer>
    );
}
