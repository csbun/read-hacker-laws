import React, {useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, useColorScheme, View, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Section from './Section';
import Carousel from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;

const carouselData = [
  {title: 'hello', id: 1},
  {title: 'hello2', id: 2},
  {title: 'hello3', id: 3},
  {title: 'hello4', id: 4},
  // {title: 'hello3'}
];

const Slider = ({children, title, id}): Node => {
  const _renderItem = useCallback(({item, index}) => {
    return (
      <View style={null}>
        <Section
          title={item.title}
          id={item.id}
          loadData={Math.abs(index - this._carousel.currentIndex) <= 2}
        />
      </View>
    );
  }, []);

  // const _beforeSnap = useCallback(idx => {
  //   console.log('>>> before snap', idx);
  // }, []);

  // const _snapTo = useCallback(idx => {
  //   console.log('>>> snap to', idx);
  // }, []);

  return (
    <Carousel
      ref={c => {
        this._carousel = c;
      }}
      // activeSlideAlignment={'start'}
      inactiveSlideScale={1}
      data={carouselData}
      renderItem={_renderItem}
      // onBeforeSnapToItem={_beforeSnap}
      // onSnapToItem={_snapTo}
      sliderWidth={sliderWidth}
      itemWidth={sliderWidth}
    />
  );
};

export default Slider;
