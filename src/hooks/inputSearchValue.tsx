import { Dispatch, SetStateAction } from "react";

type InputSearchValue = (
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<string>>
) => void;

export const inputSearchValue: InputSearchValue = (
  searchValue,
  setSearchValue
) => {
  setSearchValue(searchValue);
};
