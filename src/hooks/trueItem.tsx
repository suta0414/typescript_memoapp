type CheckedState = { [key: string]: boolean };

// チェックが入ったものだけを抽出
export const trueItem = (checkedState: CheckedState) => {
  return Object.entries(checkedState)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
};
