import { Group, Box } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import type { FC } from "react";
import { NextPage } from "next";

export const Header: NextPage = () => {
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
