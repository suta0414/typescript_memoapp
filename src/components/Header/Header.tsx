import { Group, Box } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import React from "react";
import { NextPage } from "next";

// コンポーネントの定義
const HeaderComponent: NextPage = () => {
  return (
    <header className={classes.header}>
      <Box mx="3rem" my="md">
        <Group justify="space-between" align="center">
          <MantineLogo size={28} />
        </Group>
      </Box>
    </header>
  );
};

// React.memoを使ってコンポーネントをメモ化
export const Header: NextPage = React.memo(HeaderComponent);
