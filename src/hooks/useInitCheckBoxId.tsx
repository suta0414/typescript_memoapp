import { useEffect, useState } from "react";
import { filteredItems } from "./FilteredItems";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type CheckedProps = {
  checkedState: { [key: string]: boolean };
  setCheckedState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

type InitCheckBoxIdProps = (ListItems: Items[]) => CheckedProps;

// チェックボックスのIDを初期化する
export const useInitCheckBoxId: InitCheckBoxIdProps = (ListItems) => {
  // ListItemのIDを使って初期化する
  const initialCheckedState = ListItems.reduce((acc, ListItem) => {
    acc[ListItem.id] = false;
    return acc;
  }, {} as { [key: string]: boolean });
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  useEffect(() => {
    setCheckedState(initialCheckedState);
  }, [filteredItems]);

  return { checkedState, setCheckedState };
};
