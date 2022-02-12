import React, {useContext} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, useColorScheme} from "react-native";
import {colorStylesLight, colorStylesDark} from '../styles';
import WebView from "react-native-webview";

const base_url = 'https://www.bowl.sbs/';
//const base_url = 'http://10.0.0.211:8000/';


const pageNavigator = (ref, event, navigation) => {
    if (event.url !== base_url) {
        ref.current.stopLoading();
        if(event.url.includes(base_url)){
            const location = event.url.replace(base_url, '');
            if(location === 'tournaments/results'){
                navigation.navigate('Tournaments',{
                    upcoming: false,
                });
            }else if(location === 'tournaments/upcoming'){
                navigation.navigate('Tournaments',{
                    upcoming: false,
                });
            }
            else{
                navigation.navigate('More',{
                    url: location,
                });
            }
        }
    }
}

const HomeScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const webViewRef = React.useRef(null);
    const runFirstJavascript = `
        window.isNativeApp = true;
   `;
    return (
        <SafeAreaView style={[thisStyles.container, colors.bkgGrey1]} edges={['top']}>
            <WebView
                style={thisStyles.container}
                source={{
                    uri: base_url,
                    headers: {
                        'cache-control': 'no-cache',
                    },}}
                ref={webViewRef}
                scalesPageToFit={false}
                injectedJavaScriptBeforeContentLoaded={runFirstJavascript}
                cacheEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                setDisplayZoomControls={false}
                setBuiltInZoomControls={false}
                scrollEnabled
                incognito={true}
                onNavigationStateChange={(event) => { pageNavigator(webViewRef, event, navigation) }}
                pullToRefreshEnabled={true}
                onLoad={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    navigation.setParams({loading:  nativeEvent.loading});
                }}
            />
        </SafeAreaView>
    );
}

const thisStyles = StyleSheet.create({
    container:{
        flex:1,
    },
});

export default HomeScreen;