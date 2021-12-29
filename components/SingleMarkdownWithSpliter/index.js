import React, {useState, useContext, useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Linking} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Markdown from 'react-native-markdown-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsContext from '../../context/SettingsContext';
import Loading from '../Loading';
import {LANG_EN} from '../../models/Language';

const SLIDER_WIDTH = Dimensions.get('window').width;
const LAST_READ_KEY = '@SingleMarkdownWithSpliter:LastRead';

const styles = StyleSheet.create({
  markdownView: {
    padding: 10,
    paddingBottom: 80,
  },
  markdownDisplay: {
    paragraph: {lineHeight: 20},
    heading3: {lineHeight: 40, fontWeight: 'bold'},
  },
});

const Slider = ({children}): Node => {
  const [firstItem, setFirstItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mdList, setMdList] = useState([]);

  const settings = useContext(SettingsContext);

  const _onLinkPress = useCallback(url => {
    if (url.startsWith('http')) {
      // open url in browser
      Linking.openURL(url);
    } else {
      // TODO: navigate to page
      console.log(url);
    }
  }, []);

  const _renderItem = useCallback(
    ({item}) => {
      return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.markdownView}>
            <Markdown style={styles.markdownDisplay} onLinkPress={_onLinkPress}>
              {item.content || ''}
            </Markdown>
          </View>
        </ScrollView>
      );
    },
    [_onLinkPress],
  );

  const _onSnapToItem = useCallback(index => {
    AsyncStorage.setItem(LAST_READ_KEY, index.toString()).then(() => {
      // console.log('_onSnapToItem:', index);
    });
  }, []);

  useEffect(() => {
    // TODO: global loading in context?
    setLoading(true);

    // TODO: move url to config or settings
    const URL =
      settings.lang === LANG_EN
        ? 'https://raw.githubusercontent.com/dwmkerr/hacker-laws/main/README.md'
        : 'https://raw.fastgit.org/nusr/hacker-laws-zh/master/README.md';

    fetch(URL)
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
        // console.log('this._carousel.snapToItem(lastReadNumber);');
        this?._carousel?.snapToItem(lastReadNumber);
        setFirstItem(lastReadNumber);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('error: ----------------->', error);
      });
  }, [settings.lang, setLoading, setFirstItem, setMdList]);

  if (loading) {
    return <Loading />;
  }

  // console.log('render carousel', mdList.length, firstItem);
  return (
    <Carousel
      ref={c => {
        if (this && c) {
          this._carousel = c;
        }
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
