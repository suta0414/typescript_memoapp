type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList?: string | object) => void;

type resetContent = () => void;

type checkedState = { [key: string]: boolean };

export type CheckedProps = {
  checkedState: checkedState;
  setCheckedState: React.Dispatch<React.SetStateAction<checkedState>>;
};

export type SendItems = {
  title?: string;
  text?: string;
  tags?: string[];
  id?: string;
};

export type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

export type MemoAppProps = {
  AddItemList: AddItemList;
  resetContent: resetContent;
  deleteSubmit: DeleteSubmit;
  sendEditor: SendEditor;
  sendItems: SendItems;
};

export type filteredListsType = (
  ListItems: Items[],
  searchValue: string
) => Items[];

export type NavbarType = {
  sendEditor: SendEditor;
  ListItems: Items[];
  deleteSubmit: DeleteSubmit;
};

export type ItemlinksType = {
  sendEditor: SendEditor;
  filteredLists: Items[];
  checked: CheckedProps;
};

export type DelBtnProps = {
  state: string | string[];
  deleteFnc: DeleteSubmit;
  type: string;
};
