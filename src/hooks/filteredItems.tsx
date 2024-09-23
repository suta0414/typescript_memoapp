import escapeStringRegexp from "escape-string-regexp";
import { filteredItemsType } from "@/types";

export const filteredItems: filteredItemsType = (ListItems, searchValue) => {
  // console.log(ListItems);
  const Lists = ListItems.filter((ListItem) => {
    if (!ListItem.title) return true;
    // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    const searchText = escapeStringRegexp(searchValue.toLowerCase());
    const itemText = escapeStringRegexp(ListItem.title.toLowerCase());
    // 小文字で比較して部分一致するものだけを残す
    return new RegExp(`^${searchText}`).test(itemText);
  });
  return Lists;
};
