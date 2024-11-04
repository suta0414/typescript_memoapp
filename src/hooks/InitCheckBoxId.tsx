import { useMemo } from "react";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type InitCheckBoxIdProps = (ListItems: Items[]) => {
  [key: string]: boolean;
};

// ListItemのIDとチェックボックスとを紐づける
export const InitCheckBoxId: InitCheckBoxIdProps = (ListItems) => {
  const initialCheckedState = useMemo(() => {
    return ListItems.reduce((acc, ListItem) => {
      acc[ListItem.id] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  }, [ListItems]);

  return initialCheckedState;
};
