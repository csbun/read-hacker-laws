/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import type {Node} from 'react';
import {useColorScheme, View /*, Platform*/} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider, Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Reader from './components/Reader';
import {ILang, LANG_EN} from './models/Language';
import SettingsContext from './context/SettingsContext';
import LanguageSwitch from './components/LanguageSwitch';
// import {AdMobBanner} from 'react-native-admob';

// const AD_UNIT_ID = (function () {
//   if (Platform.OS === 'android') {
//     return 'ca-app-pub-6414613701003177~2184276959';
//   }
//   return 'ca-app-pub-6414613701003177~3696561378';
// })();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [lang, setLang] = useState<ILang>(LANG_EN);
  const settingsContext = {lang, setLang}; // TODO: replace with useSettings

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SettingsContext.Provider value={settingsContext}>
          <Header
            centerComponent={{text: 'Hacker Laws', style: {color: '#fff'}}}
            rightComponent={<LanguageSwitch />}
          />
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Reader lang={lang} />
          </View>
          {/* <AdMobBannerd
            adSize="fullBanner"
            adUnitID={AD_UNIT_ID}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          /> */}
          {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
        </ScrollView> */}
        </SettingsContext.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
