import { v4 as uuidv4 } from "uuid";

export const IdCreate = (idList: string) => {
  const generateRandomID = (): string => {
    return uuidv4();
  };

  const idcheck = (idList: string) => {
    if (!idList) {
      const ID = generateRandomID();
      return ID;
    } else {
      const ID = idList;
      return ID;
    }
  };

  return idcheck(idList);
};
