export type SendEditor = (item: Items) => void;

export type DeleteSubmit = (idList?: string | object) => void;

export type resetContent = () => void;

export type checkedState = { [key: string]: boolean };

export type CheckedProps = {
  checkedState: checkedState;
  setCheckedState: React.Dispatch<React.SetStateAction<checkedState>>;
};

export type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

type SendItems = {
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
  sendItems: SendItems;
  itemTagList: {
    tagList: string[];
    setTagList: React.Dispatch<React.SetStateAction<string[]>>;
  };
};
