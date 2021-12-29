import {ILang, LANG_EN} from './Language';

export const MarkdownType = {
  SingleFileWithSpliter: 'SingleFileWithSpliter',
  MultiRemoteFiles: 'MultiRemoteFiles',
};

export class Setting {
  markdownType: MarkdownType = MarkdownType.SingleFileWithSpliter;
  markdownUrl: string = '';

  lang: ILang = LANG_EN;
  setLang: (lang: ILang) => void = () => {};
}
