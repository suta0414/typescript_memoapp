import { IconSearch } from "@tabler/icons-react";

import { Dispatch, SetStateAction } from "react";

import classes from "./Search.module.css";
import { TextInput, rem } from "@mantine/core";
import { inputSearchValue } from "@/src/hooks/inputSearchValue";
import { NextPage } from "next";

type SearchComponent = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

// 検索ボックス
export const SearchComponent: NextPage<SearchComponent> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className={classes.input}>
      <TextInput
        size="sm"
        radius="md"
        placeholder="タイトル検索"
        value={searchValue}
        className={classes.textinput}
        onChange={(event) =>
          inputSearchValue(event.currentTarget.value, setSearchValue)
        }
        rightSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
      />
    </div>
  );
};
