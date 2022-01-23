import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LanguageSwitch from '../components/LanguageSwitch';
import SettingsContext from '../context/SettingsContext';
export default function SettingsPage({navigation}) {
  const settings = useContext(SettingsContext);

  return (
    <>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <View>
        <Text>Settings</Text>
      </View>
    </>
  );
}
