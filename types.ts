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

export type MemoAppProps = {
  AddItemList: AddItemList;
  resetContent: resetContent;
  deleteSubmit: DeleteSubmit;
  sendEditor: SendEditor;
  Items: Items;
};

export type filteredListsType = (
  ListItems: Items[],
  searchValue: string
) => Items[];

export type NavbarType = {
  sendEditor: SendEditor;
  ListItems: Items[];
};

export type ItemlinksType = {
  sendEditor: SendEditor;
  filteredLists: Items[];
};
