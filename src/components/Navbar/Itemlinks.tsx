import { IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { Checkbox, NavLink } from "@mantine/core";

import { NextPage } from "next";
import { CheckedProps, Items, SendEditor } from "@/types";

type ItemlinksType = {
  sendEditor: SendEditor;
  filteredItems: Items[];
  checked: CheckedProps;
};

export const Itemlinks: NextPage<ItemlinksType> = ({
  sendEditor,
  filteredItems,
  checked,
}) => {
  const { checkedState, setCheckedState } = checked;

  // チェックボックスの処理
  const handleCheckboxChange = (id: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const links = filteredItems.map((filterItem) => {
    return (
      <div key={filterItem.id} className={classes.navlink}>
        <Checkbox
          size="xs"
          checked={checkedState[filterItem.id] || false}
          onChange={() => handleCheckboxChange(filterItem.id)}
        />
        <NavLink
          label={filterItem.title}
          leftSection={<IconTag className={classes.linkIcon} stroke={2} />}
          noWrap={true}
          onClick={() => sendEditor(filterItem)}
        />
      </div>
    );
  });
  return links;
};
