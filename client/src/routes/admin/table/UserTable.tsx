import React from "react";

import { Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { UserModel } from "../../../types/user-model";
import { UserRow } from "./UserRow";

interface UserTableProps {
  users: UserModel[];
  removeUser: (userId: number) => Promise<void>;
  updateUser: (user: UserModel) => Promise<void>;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  updateUser,
  removeUser
}) => {
  return (
    <Table variant="simple">
      <TableCaption>User informations</TableCaption>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Picture</Th>
          <Th>Username</Th>
          <Th>E-Mail</Th>
          <Th>Is Authorized</Th>
          <Th>Is Admin</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            removeUser={removeUser}
            updateUser={updateUser}
          />
        ))}
      </Tbody>
    </Table>
  );
};
