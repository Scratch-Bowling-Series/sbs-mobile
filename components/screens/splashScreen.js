import React from "react";
import {StyleSheet, View} from "react-native";
import {Video} from "expo-av";

const welcomeVideo = require('../../assets/SBS_Logo_Reveal.mp4');

const SplashScreen = ({colors, setSplashFinished}) => {

    return (
        <View style={[thisStyles.container]}>
            <Video source={welcomeVideo}
                   style={[thisStyles.video]}
                   resizeMode="contain" shouldPlay={true}
                   onPlaybackStatusUpdate={(playbackStatus) => {
                       if (playbackStatus.didJustFinish) {
                           setSplashFinished(true);
                       }
                   }}/>
        </View>
    );
}


const thisStyles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 10,
    },
    video:{
        flex: 1, resizeMode: 'contain'
    }
});

export default SplashScreen;