type ListItems = {
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

type SendEditor = (item: ListItems) => void;

type InputSearchValue = (searchText: string) => void;

type DeleteSubmit = (idList: string) => void;

type resetContent = () => void;

export type MemoAppProps = {
  inputSearchValue: InputSearchValue;
  deleteSubmit: DeleteSubmit;
  handleSubmit: HandleSubmit;
  listItems: ListItems;
  FilterItems: ListItems[];
  sendEditor: SendEditor;
  resetContent: resetContent;
};
