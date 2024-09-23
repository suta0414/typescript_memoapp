import { Dispatch, SetStateAction } from "react";

type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList?: string | object) => void;

type resetContent = () => void;

export type checkedState = { [key: string]: boolean };

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

export type filteredItemsType = (
  ListItems: Items[],
  searchValue: string
) => Items[];

export type ItemPropsType = {
  items: Items[];
  searchValue: string;
};

export type NavbarType = {
  sendEditor: SendEditor;
  ListItems: Items[];
  deleteSubmit: DeleteSubmit;
};

export type ItemlinksType = {
  sendEditor: SendEditor;
  filteredItems: Items[];
  checked: CheckedProps;
};

export type BtnProps = {
  state: string | string[];
  fnc: DeleteSubmit;
  type: string;
};

export type TitleEreaType = {
  Title: {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
  };
  resetbutton: () => void;
  deletebutton: DeleteSubmit;
  id: string;
};
