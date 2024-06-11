type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id?: string;
};

type HandleSubmit = (
  TitleValue: string,
  sentence: string,
  TagValue: string[],
  id: string
) => void;

type SendEditor = (item: Items) => void;

export type InputSearchValue = (searchText: string) => void;

type DeleteSubmit = (idList: string) => void;

type resetContent = () => void;

export type MemoAppProps = {
  deleteSubmit: DeleteSubmit;
  handleSubmit: HandleSubmit;
  ListItems: Items[];
  Items: Items;
  sendEditor: SendEditor;
  resetContent: resetContent;
};
