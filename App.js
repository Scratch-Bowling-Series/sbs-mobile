import * as React from 'react';
import {StyleSheet, useColorScheme, View, Text} from 'react-native';
import {colorStylesLight, colorStylesDark, styles} from './components/styles';
import SplashScreen from "./components/screens/splashScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from "./components/header";
import {useFonts} from "expo-font";
import {SettingsProvider} from "./components/context/settingsContext";
import HomeScreen from "./components/screens/homeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import TournamentsScreen from "./components/screens/tournamentsScreen";
import MoreScreen from "./components/screens/moreScreen";



const Tab = createBottomTabNavigator();

export default function App() {
    const [settings, setSettings] = React.useState(null);

    const [initialLoading, setInitialLoading] = React.useState(false);
    const [splashFinished, setSplashFinished] = React.useState(false);

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const linking = {
        prefixes: ['https://mobile.scratchbowling.com', 'exps://mobile.scratchbowling.com'],
    };
    const mainScreenOptions = ({ route }) => ({
        header: (props) => <Header {...props} route={route}/>,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'home-outline'
            } else if (route.name === 'Tournaments') {
                iconName = 'list-outline';
            } else if (route.name === 'Rankings') {
                iconName = 'podium-outline';
            } else if (route.name === 'Live') {
                iconName = 'tv-outline';
            } else if (route.name === 'Profile') {
                iconName = 'person-circle-outline';
            } else if (route.name === 'More') {
                iconName = 'menu-outline';
            }

            if(route.name === 'Game'){
                return (
                    <View style={[styles.tabButtonCenter, colors.bkgGreen1]}>
                        <Ionicons style={[styles.tabButtonCenterIcon, {color: focused ? '#d9af62' : '#fff'}]} name={iconName} size={size} color={color} />
                        <Text style={[styles.tabButtonCenterText, styles.fontBold, {color: focused ? '#d9af62' : '#fff'}]}>{route.name}</Text>
                    </View>
                );
            }

            return (
                <View style={[styles.tabButton]}>
                    <Ionicons style={[styles.tabButtonIcon,{color: focused ? '#d9af62' : 'grey'}]} name={iconName} size={size} color={color} />
                    <Text style={[styles.tabButtonText, styles.fontBold, {color: focused ? '#d9af62' : 'grey'}]}>{route.name}</Text>
                </View>
            );
        },
        tabBarStyle:{
            borderTopColor: colorScheme === 'light' ? '#adadad' : '#1e1e1e',
            backgroundColor: colorScheme === 'light' ? '#ffffff' : '#131313',
        },

        tabBarActiveTintColor: colorScheme === 'light' ? '#d9af62' : '#fff' ,
        tabBarInactiveTintColor: route.name !== 'Game' ? 'grey' : '#fff',
        backgroundColor:'red',
    });

    const [fontsLoaded] = useFonts({
        TTOctosquaresCondRegular: require('./assets/fonts/TTOctosquaresCond-Regular.otf'),
        TTOctosquaresCondBlack: require('./assets/fonts/TTOctosquaresCond-Black.otf'),
        TTOctosquaresCondBold: require('./assets/fonts/TTOctosquaresCond-Bold.otf'),
    });

    // Show Splash Screen while doing initial loading
    if (initialLoading || !splashFinished || !fontsLoaded){
        return (
            <SplashScreen setSplashFinished={setSplashFinished}/>
        );
    }

    return (
        <SettingsProvider value={[settings]}>
                <SafeAreaProvider>
                    <NavigationContainer linking={linking}>
                        <Tab.Navigator initialRouteName="Home" screenOptions={mainScreenOptions} >
                            <Tab.Screen name="Home" initialParams={{ loading: false}}>
                                {(props) => <HomeScreen {...props} />}
                            </Tab.Screen>
                            <Tab.Screen name="Tournaments" initialParams={{ loading: false, upcoming: true }} >
                                {(props) => <TournamentsScreen {...props} />}
                            </Tab.Screen>
                            <Tab.Screen name="Rankings" initialParams={{ loading: false}}>
                                {(props) => <HomeScreen {...props} />}
                            </Tab.Screen>
                            <Tab.Screen name="Live" initialParams={{ loading: false}}>
                                {(props) => <HomeScreen {...props} />}
                            </Tab.Screen>
                            <Tab.Screen name="Profile" initialParams={{ loading: false}}>
                                {(props) => <HomeScreen {...props} />}
                            </Tab.Screen>
                        </Tab.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
        </SettingsProvider>
    );
}

const thisStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position:'relative',
    },
    web:{
        flex:1,
        zIndex:1,
    }
});
