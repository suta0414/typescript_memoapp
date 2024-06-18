type AddItemList = (
  TitleValue: string,
  sentence: string,
  TagValue: string[],
  id: string
) => void;

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList: string) => void;

type resetContent = () => void;

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id?: string;
};

export type filteredListsType = (
  ListItems: Items[],
  searchValue: string
) => Items[];

export type Navbar = {
  sendEditor: SendEditor;
  filteredLists: Items[];
};

export type MemoAppProps = {
  deleteSubmit: DeleteSubmit;
  AddItemList: AddItemList;
  ListItems: Items[];
  Items: Items;
  sendEditor: SendEditor;
  resetContent: resetContent;
};
