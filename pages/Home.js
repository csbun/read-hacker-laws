import React, {useContext} from 'react';
import {useColorScheme, View /*, Platform*/} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Reader from '../components/Reader';
import LanguageSwitch from '../components/LanguageSwitch';
import SettingsContext from '../context/SettingsContext';
// import {AdMobBanner} from 'react-native-admob';

// const AD_UNIT_ID = (function () {
//   if (Platform.OS === 'android') {
//     return 'ca-app-pub-6414613701003177~2184276959';
//   }
//   return 'ca-app-pub-6414613701003177~3696561378';
// })();

export default function HomePage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const settings = useContext(SettingsContext);

  return (
    <>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Reader lang={settings.lang} />
      </View>
      {/* <AdMobBanner
      adSize="fullBanner"
      adUnitID={AD_UNIT_ID}
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    /> */}
      {/* <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={backgroundStyle}>
  </ScrollView> */}
    </>
  );
}
