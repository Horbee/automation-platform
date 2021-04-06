import React from "react";

import { Accordion } from "@chakra-ui/react";

import { UserModel } from "../../../types/user-model";
import { UserAccordionItem } from "./UserAccordionItem";

interface UserAccordionProps {
  users: UserModel[];
  removeUser: (userId: number) => Promise<void>;
  updateUser: (user: UserModel) => Promise<void>;
}

export const UserAccordion: React.FC<UserAccordionProps> = ({
  users,
  removeUser,
  updateUser
}) => {
  return (
    <Accordion>
      {users.map((user) => (
        <UserAccordionItem
          key={user.id}
          user={user}
          removeUser={removeUser}
          updateUser={updateUser}
        />
      ))}
    </Accordion>
  );
};
