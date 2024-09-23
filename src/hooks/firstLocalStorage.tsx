import { Items } from "@/types";

const key = "ItemList";

// localStorageからデータを取得
export const firstLocalStorage = () => {
  const getVal = window.localStorage.getItem(key);
  if (getVal) {
    const parsedItems: Items[] = JSON.parse(getVal);
    if (Array.isArray(parsedItems)) {
      return parsedItems;
      // setItems(parsedItems);
    } else {
      return [];
    }
  } else return [];
  //   console.error("Failed to parse localStorage data", e);
};
