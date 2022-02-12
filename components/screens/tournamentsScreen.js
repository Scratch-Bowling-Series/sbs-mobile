import React, {useContext} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, useColorScheme} from "react-native";
import {colorStylesLight, colorStylesDark} from '../styles';
import WebView from "react-native-webview";

//const base_url = 'https://www.bowl.sbs/';
const base_url = 'http://10.0.0.211:8000/';


const pageNavigator = (ref, event, navigation) => {
}

const TournamentsScreen = ({route, navigation}) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const webViewRef = React.useRef(null);
    const runFirstJavascript = `
        window.isNativeApp = true;
   `;

    const {upcoming} = route.params;

    const url = 'tournaments/' + (upcoming ? 'upcoming':'results');
    return (
        <SafeAreaView style={[thisStyles.container, colors.bkgGrey1]} edges={['top']}>
            <WebView
                style={thisStyles.container}
                source={{ uri: url ? base_url + url : base_url }}
                ref={webViewRef}
                scalesPageToFit={false}
                injectedJavaScriptBeforeContentLoaded={runFirstJavascript}
                cacheEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                setDisplayZoomControls={false}
                setBuiltInZoomControls={false}
                scrollEnabled
                onNavigationStateChange={(event) => { pageNavigator(webViewRef, event, navigation, url) }}
            />
        </SafeAreaView>
    );
}

const thisStyles = StyleSheet.create({
    container:{
        flex:1,
    },
});

export default TournamentsScreen;