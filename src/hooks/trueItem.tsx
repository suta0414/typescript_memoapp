import { checkedState } from "@/types";

// チェックが入ったものだけを抽出
export const trueItem = (checkedState: checkedState) => {
  return Object.entries(checkedState)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
};
