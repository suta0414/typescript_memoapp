import { IconSearch } from "@tabler/icons-react";

import { Dispatch, SetStateAction } from "react";

import classes from "./Navbar.module.css";
import { Box, TextInput, rem } from "@mantine/core";
import { inputSearchValue } from "@/src/hooks/inputSearchValue";
import { NextPage } from "next";

type SearchComponent = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const SearchComponent: NextPage<SearchComponent> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <Box className={classes.input}>
      <TextInput
        size="sm"
        radius="md"
        placeholder="タイトル検索"
        value={searchValue}
        onChange={(event) =>
          inputSearchValue(event.currentTarget.value, setSearchValue)
        }
        rightSection={
          <a>
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </a>
        }
      />
    </Box>
  );
};
