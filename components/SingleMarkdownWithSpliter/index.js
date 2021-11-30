import React, {useState, useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Markdown from 'react-native-markdown-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loading';

const SLIDER_WIDTH = Dimensions.get('window').width;
const LAST_READ_KEY = '@SingleMarkdownWithSpliter:LastRead';

const styles = StyleSheet.create({
  reader: {
    padding: 10,
  },
});

const Slider = ({children}): Node => {
  const [firstItem, setFirstItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mdList, setMdList] = useState([]);

  const _renderItem = useCallback(({item}) => {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.reader}>
          <Markdown>{item.content || ''}</Markdown>
        </View>
      </ScrollView>
    );
  }, []);

  const _onSnapToItem = useCallback(index => {
    AsyncStorage.setItem(LAST_READ_KEY, index.toString()).then(() => {
      console.log('_onSnapToItem:', index);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      // 'https://raw.githubusercontent.com/nusr/hacker-laws-zh/master/README.md'
      'https://raw.fastgit.org/nusr/hacker-laws-zh/master/README.md',
    )
      .then(response => response.text())
      .then(text => {
        const list = text
          .split(/\n(?=##)/)
          .filter(item => item && item.length > 0)
          .map((item, idx) => ({id: idx, content: `${item}\n`}));
        setMdList(list);
        return AsyncStorage.getItem(LAST_READ_KEY);
      })
      .then(lastRead => {
        const lastReadNumber = lastRead ? parseInt(lastRead, 10) : 0;
        if (this._carousel) {
          // console.log('this._carousel.snapToItem(lastReadNumber);');
          this._carousel.snapToItem(lastReadNumber);
        }
        setFirstItem(lastReadNumber);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('error: ----------------->', error);
      });
  }, [setLoading, setFirstItem, setMdList]);

  if (loading) {
    return <Loading />;
  }

  // console.log('render carousel', mdList.length, firstItem);
  return (
    <Carousel
      ref={c => {
        this._carousel = c;
      }}
      // activeSlideAlignment={'start'}
      inactiveSlideScale={1}
      data={mdList}
      renderItem={_renderItem}
      firstItem={firstItem}
      initialNumToRender={firstItem + 1} // 初始化渲染的 item 数量，确保能包含 firstItem
      // onBeforeSnapToItem={_beforeSnap}
      onSnapToItem={_onSnapToItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={SLIDER_WIDTH}
    />
  );
};

export default Slider;
