/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import type {Node} from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Reader from './components/Reader';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaProvider>
      <Header centerComponent={{text: 'Reader', style: {color: '#fff'}}} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Reader />
      </View>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
      </ScrollView> */}
    </SafeAreaProvider>
  );
};

export default App;
