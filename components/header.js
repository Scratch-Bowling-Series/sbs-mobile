import React, { useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Animated, Image, TouchableOpacity,useColorScheme,SafeAreaView,Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";

import sbsLogo from '../assets/logo-beta.png';
import topBarGraphic from '../assets/top-bar.png';
import topBarGraphicDark from '../assets/top-bar-dark.png';
import defaultProfilePhoto from '../assets/profile-default.png';
import {colorStylesLight, colorStylesDark} from './styles';
//import UserContext from "./context/userContext";
import NotificationsModal from "./notificationsModal";
//import AuthContext from "./context/authContext";


const Header = ({route, navigation}) => {
    const {loading} = route.params;
    const [isLoading, setIsLoading] = React.useState(false);

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(true);
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;



    const NavigationTop = () => {

        return (
        <View style={[styles.header, colors.bkgGreen1 ]}>
            { colorScheme === 'light' ? (
                <Image source={topBarGraphic} style={[styles.headerLines]}/>
            ) : (
                <Image source={topBarGraphicDark} style={[styles.headerLines]}/>
            )}
            <TouchableOpacity style={[styles.headerLogoWrap]} onPress={() => {navigation.navigate('Home');}}>
                <Image source={sbsLogo} style={[styles.headerLogo, colors.logoTint]}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, {marginRight:0,}]} onPress={() => setNotificationsVisible(true)}>
                { hasNotifications ? (<View style={styles.headerButtonNotify} />): null}
                <Ionicons style={styles.headerButtonText} name="notifications-outline" size={30} color="#fff" />
            </TouchableOpacity>
            { route.name !== 'Profile' ? (
                <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
                    <Ionicons style={styles.headerButtonIcon} name="menu-outline" size={30} color="#fff" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.headerButton} onPress={() => setSettingsVisible(true)}>
                    <Ionicons style={styles.headerButtonText} name="settings-outline" size={30} color="#fff" />
                </TouchableOpacity>
            )}
            <LoadingBar visible={isLoading}/>
        </View>
        );
    }

    const LoadingBar = ({visible}) => {
        const windowWidth = Dimensions.get('window').width;
        const progressWidth = React.useRef(new Animated.Value(0)).current;
        const progressOpacity = React.useRef(new Animated.Value(1)).current;

        const startLoadingAnimation = () => {
            Animated.timing(progressWidth, {
                toValue: windowWidth,
                duration: 3000,
                useNativeDriver: false,
            }).start();
            Animated.timing(progressOpacity, {
                delay: 3000,
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
        const finishLoadingAnimation = () => {
            setTimeout(()=>{
                progressWidth.stopAnimation();
                progressOpacity.stopAnimation();
                Animated.timing(progressWidth, {
                    toValue: windowWidth,
                    duration: 250,
                    useNativeDriver: false,
                }).start();
                Animated.timing(progressOpacity, {
                    delay: 250,
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }, 500);
        };

        React.useEffect(()=>{
            if(visible){
                startLoadingAnimation();
            }else{
                finishLoadingAnimation();
            }
        },[visible]);

        return (
            <View style={[styles.loadingBar]}>
                <Animated.View style={[styles.loadingInnerBar, colors.bkgTan, { width: progressWidth, opacity: progressOpacity}]}>
                </Animated.View>
            </View>
        );
    }

    const NavigationDrop = () => {

    }

    React.useEffect(()=>{
        setIsLoading(loading);
    }, [loading])

    return (
        <SafeAreaView style={[styles.headerWrap, colors.bkgGrey1]} edges={['top']}>
            { colorScheme === 'light' ? (<StatusBar style='dark'/>) : (<StatusBar style='light'/>) }

            <NavigationTop />
            <LoadingBar />
            <NavigationDrop />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({


    headerWrap:{
        height:65,
        paddingTop: 25,
        position:'relative',
    },
    header:{
        height:65,
        backgroundColor: '#214031',
        position: 'relative',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
    },
    headerLogoWrap:{
        position: 'absolute',
        height:50,
        width: 95,
        top:7.5,
        left:85,
    },
    headerLogo:{
        position: 'absolute',
        height:50,
        width: 95,
        top:0,
        left:0,
    },
    headerLines:{
        height:65,
        width: 269,
        left:0,
        position: "absolute",
        top: 0,
    },
    headerButton:{
        height:65,
        width:40,
        marginRight:10,
        alignSelf:'flex-end',
        position:'relative',
    },
    headerButtonText:{
        height:40,
        width:40,
        fontSize:25,
        textAlign:'center',
        textAlignVertical:'center',
        lineHeight:40,
        borderRadius: 20,
        marginVertical:12.5,
    },
    headerButtonIcon:{
        height:40,
        width:40,
        fontSize:30,
        textAlign:'center',
        textAlignVertical:'center',
        lineHeight:40,
        borderRadius: 20,
        marginVertical:12.5,
    },
    headerButtonImage:{
        height:30,
        width:30,
        backgroundColor:'orange',
        marginVertical:17.5,
        borderRadius:15,
    },
    headerButtonNotify:{
        position:"absolute",
        top:17,right:8,
        backgroundColor:'red',
        borderRadius:4,
        width:8,height:8,
        zIndex:2,
    },

    loadingBar:{
        position:'absolute',
        height: 3,
        bottom: -3,
        width: '100%',
    },
    loadingInnerBar:{
        position:'absolute',
        left:0,
        bottom:0,
        width:1,
        top:0,
        right:0,
        height: 3,
    }



});




export default Header;