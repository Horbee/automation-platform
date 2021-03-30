import { Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { Navbar } from "../../custom-components/Navbar";
import { useAdminPage } from "./useAdminPage";
import { UserRow } from "./UserRow";

export const AdminPage = () => {
  const { users, updateUser, removeUser } = useAdminPage();

  return (
    <div>
      <Navbar />
      <Table variant="simple">
        <TableCaption>User informations</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
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
    </div>
  );
};
