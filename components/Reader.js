import React from 'react';
import type {Node} from 'react';
import {MarkdownType} from '../models/Setting';
import SingleMarkdownWithSpliter from './SingleMarkdownWithSpliter';
import MultiRemoteMarkdown from './MultiRemoteMarkdown';

const Reader = (): Node => {
  // const [mdType, setMdType] = React.useState(
  //   MarkdownType.SingleFileWithSpliter,
  // );

  const mdType = MarkdownType.SingleFileWithSpliter;

  if (mdType === MarkdownType.SingleFileWithSpliter) {
    return <SingleMarkdownWithSpliter />;
  } else {
    return <MultiRemoteMarkdown />;
  }
};

export default Reader;
