import React, {useRef} from 'react';
import type {Node} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  loading: {
    padding: 100,
  },
});

export default (): Node => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.loading, {transform: [{rotate: spin}]}]}>
      {/* TODO: add icon to Android https://github.com/oblador/react-native-vector-icons#option-with-gradle-recommended */}
      <Icon type="antdesign" name="loading1" />
    </Animated.View>
  );
};
