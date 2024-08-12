import { IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { Checkbox, NavLink } from "@mantine/core";

import { NextPage } from "next";
import { ItemlinksType } from "@/types";

export const Itemlinks: NextPage<ItemlinksType> = ({
  sendEditor,
  filteredLists,
  checked,
}) => {
  // if (!Array.isArray(filteredLists)) {
  //   return null;
  // }

  const { checkedState, setCheckedState } = checked;

  const handleCheckboxChange = (id: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const links = filteredLists.map((filterList) => {
    return (
      <div key={filterList.id} className={classes.navlink}>
        <Checkbox
          size="xs"
          checked={checkedState[filterList.id] || false}
          onChange={() => handleCheckboxChange(filterList.id)}
        />
        <NavLink
          label={filterList.title}
          leftSection={<IconTag className={classes.linkIcon} stroke={2} />}
          onClick={() => sendEditor(filterList)}
        />
      </div>
    );
  });
  return links;
};
