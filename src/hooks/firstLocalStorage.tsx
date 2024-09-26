import { Items } from "@/types";

const key = "ItemList";

// localStorageからデータを取得
export const firstLocalStorage = () => {
  const getVal = window.localStorage.getItem(key);
  if (getVal) {
    const parsedItems: Items[] = JSON.parse(getVal);
    if (Array.isArray(parsedItems)) {
      return parsedItems;
    } else {
      return [];
    }
  } else return [];
};
