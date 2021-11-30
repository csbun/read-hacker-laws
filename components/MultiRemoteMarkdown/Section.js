import React, {useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Markdown from 'react-native-markdown-display';

const md = `
This is **Markdown file**

- just a list
- of items
- with some **bold** text
- and some \`code\`

`;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

const Section = ({children, title, id, loadData}): Node => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [mdContent, setMdContent] = React.useState('');

  useEffect(() => {
    if (!loadData) {
      return;
    }
    // console.log('Section', id);
    // console.log('1-----------------> fetch', id);
    fetch(
      // 'https://raw.githubusercontent.com/meliorence/react-native-snap-carousel/master/README.md',
      'https://raw.fastgit.org/meliorence/react-native-snap-carousel/master/README.md',
    )
      .then(response => response.text())
      .then(text => {
        setMdContent(text);
      })
      .catch(error => {
        console.log('error: ----------------->', error);
      });
  }, [id, setMdContent, loadData]);

  return (
    <View style={styles.sectionContainer}>
      <Markdown>{`# ${title}\n${mdContent}`}</Markdown>
      {/*
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
       */}
    </View>
  );
};

export default Section;
