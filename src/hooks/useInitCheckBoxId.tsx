import { CheckedProps, checkedState, Items } from "@/types";
import { useEffect, useState } from "react";
import { filteredItems } from "./filteredItems";

type initCheckBoxIdProps = (ListItems: Items[]) => CheckedProps;

// チェックボックスのIDを初期化する
export const useInitCheckBoxId: initCheckBoxIdProps = (ListItems) => {
  // ListItemのIDを使って初期化する
  const initialCheckedState = ListItems.reduce((acc, ListItem) => {
    acc[ListItem.id] = false;
    return acc;
  }, {} as checkedState);
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  useEffect(() => {
    setCheckedState(initialCheckedState);
  }, [filteredItems]);

  return { checkedState, setCheckedState };
};
