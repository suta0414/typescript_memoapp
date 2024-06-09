import { IconSearch, IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { Box, Flex, NavLink, TextInput, rem } from "@mantine/core";
import { FC } from "react";
import { MemoAppProps } from "@/types";
import { NextPage } from "next";

export const Navbar: NextPage<
  Pick<MemoAppProps, "FilterItems" | "sendEditor" | "inputSearchValue">
> = ({ inputSearchValue, FilterItems, sendEditor }) => {
  const links = FilterItems.map((FilterItem) => {
    return (
      <NavLink
        // href={filteredList.url}
        label={FilterItem.title}
        key={FilterItem.id}
        leftSection={<IconTag className={classes.linkIcon} stroke={2} />}
        onClick={() => sendEditor(FilterItem)}
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
