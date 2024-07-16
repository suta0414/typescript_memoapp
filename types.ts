type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList: string) => void;

type resetContent = () => void;

export type Items = {
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
