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
      name="ellipsis-v"
      // name="bars"
      color="#fff"
      onPress={() => {}}
    />
  );
}
