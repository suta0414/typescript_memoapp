import { Group, Box } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import type { FC } from "react";

export const Header: FC = () => {
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
