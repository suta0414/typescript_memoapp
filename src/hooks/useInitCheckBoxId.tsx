import { CheckedProps, Items } from "@/types";
import { useEffect, useState } from "react";
import { filteredLists } from "./filteredLists";

type initCheckBoxIdProps = (ListItems: Items[]) => CheckedProps;

export const useInitCheckBoxId: initCheckBoxIdProps = (ListItems) => {
  // ListItemのIDを使って初期化する
  const initialCheckedState = ListItems.reduce((acc, ListItem) => {
    acc[ListItem.id] = false;
    return acc;
  }, {} as { [key: string]: boolean });
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>(
    initialCheckedState
  );

  useEffect(() => {
    setCheckedState(initialCheckedState);
  }, [filteredLists]);

  return { checkedState, setCheckedState };
};
