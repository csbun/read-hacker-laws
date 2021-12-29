import React, {useContext} from 'react';
import type {Node} from 'react';
// import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {LANG_ZH, LANG_EN} from '../../models/Language';
import SettingsContext from '../../context/SettingsContext';

// const styles = StyleSheet.create({
//   languageSwitch: {},
// });

export default function LanguageSwitch(): Node {
  const settings = useContext(SettingsContext);

  return (
    <Icon
      type="font-awesome"
      name="language"
      color="#fff"
      onPress={() => {
        if (settings.lang === LANG_EN) {
          settings.setLang(LANG_ZH);
        } else {
          settings.setLang(LANG_EN);
        }
      }}
    />
  );
}
