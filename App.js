/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import type {Node} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Icon, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import SettingsContext from './context/SettingsContext';
import {ILang, LANG_EN} from './models/Language';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const App: () => Node = () => {
  const [lang, setLang] = useState<ILang>(LANG_EN);
  const settingsContext = {lang, setLang}; // TODO: replace with useSettings

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SettingsContext.Provider value={settingsContext}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={({navigation, route}) => ({
                headerRight: () => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('Settings');
                    }}>
                    <Icon
                      name="settings-2-outline"
                      fill="#8F9BB3"
                      style={styles.icon}
                    />
                  </TouchableWithoutFeedback>
                ),
              })}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsPage}
              options={({navigation, route}) => ({
                headerLeft: () => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('Home');
                    }}>
                    <Icon
                      name="arrow-back"
                      fill="#8F9BB3"
                      style={styles.icon}
                    />
                  </TouchableWithoutFeedback>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </SettingsContext.Provider>
  );
};

export default App;
