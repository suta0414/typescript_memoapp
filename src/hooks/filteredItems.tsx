import escapeStringRegexp from "escape-string-regexp";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};
type FilteredItemsType = (ListItems: Items[], searchValue: string) => Items[];

// 全角を半角に変換
const full_half = (str: string) => {
  return str
    .replace(/[！-～]/g, function (char) {
      return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
    })
    .replace(/　/g, " "); // 全角スペースを半角スペースに変換
};

export const filteredItems: FilteredItemsType = (ListItems, searchValue) => {
  // 全角を半角に変換
  searchValue = full_half(searchValue);

  const Lists = ListItems.filter((ListItem) => {
    if (!ListItem.title) return true;
    // 全角を半角に変換
    ListItem.title = full_half(ListItem.title);
    // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    const searchText = escapeStringRegexp(searchValue.toLowerCase());
    const itemText = escapeStringRegexp(ListItem.title.toLowerCase());
    // 小文字で比較して部分一致するものだけを残す
    return new RegExp(searchText).test(itemText);
  });
  return Lists;
};
