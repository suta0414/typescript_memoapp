import { IconSearch, IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { Box, Flex, NavLink, TextInput, rem } from "@mantine/core";
import { useState } from "react";
import escapeStringRegexp from "escape-string-regexp";

import { InputSearchValue, MemoAppProps } from "@/types";
import { NextPage } from "next";

export const Navbar: NextPage<
  Pick<MemoAppProps, "ListItems" | "sendEditor">
> = ({ ListItems, sendEditor }) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredLists = ListItems.filter((ListItem) => {
    if (!ListItem.title) return true;
    // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    const searchText = escapeStringRegexp(searchValue.toLowerCase());
    const itemText = escapeStringRegexp(ListItem.title.toLowerCase());
    // 小文字で比較して部分一致するものだけを残す
    return new RegExp(`^${searchText}`).test(itemText);
  });

  const inputSearchValue: InputSearchValue = (searchText) => {
    setSearchValue(searchText);
  };

  const links = filteredLists.map((filterList) => {
    return (
      <NavLink
        // href={filteredList.url}
        label={filterList.title}
        key={filterList.id}
        leftSection={<IconTag className={classes.linkIcon} stroke={2} />}
        onClick={() => sendEditor(filterList)}
      />
    );
  });

  return (
    <Flex direction="column" gap="md" className={classes.navbar_container}>
      <Box className={classes.input}>
        <TextInput
          size="sm"
          radius="md"
          placeholder="タイトル検索"
          onChange={(event) => inputSearchValue(event.currentTarget.value)}
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
      <nav className={classes.navbar}>
        <div>{links}</div>
      </nav>
    </Flex>
  );
};
