import { Box } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { NextPage } from "next";

export const Header: NextPage = () => {
  return (
    <header className={classes.header}>
      <Box mx="3rem" my="md">
        <MantineLogo size={28} />
      </Box>
    </header>
  );
};
