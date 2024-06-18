import { IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { NavLink } from "@mantine/core";

import { NextPage } from "next";
import { Navbar } from "@/types";

export const Itemlinks: NextPage<Navbar> = ({ sendEditor, filteredLists }) => {
  if (!Array.isArray(filteredLists)) {
    return null;
  }
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
  return links;
};
