export const MarkdownType = {
  SingleFileWithSpliter: 'SingleFileWithSpliter',
  MultiRemoteFiles: 'MultiRemoteFiles',
};

export class Setting {
  markdownType: MarkdownType = MarkdownType.SingleFileWithSpliter;
  markdownUrl: string = '';
}
