import React, { useRef, useState } from "react";

import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, Button, IconButton, Stack, Switch, Table, TableCaption, Tbody, Td, Th,
    Thead, Tr
} from "@chakra-ui/react";

import { Navbar } from "../../custom-components/Navbar";
import { useAdminPage } from "./useAdminPage";

export const AdminPage = () => {
  const { users } = useAdminPage();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const cancelRef = useRef(null);

  const openDeleteDialog = (userId: number) => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const removeUser = (userId: number) => {
    console.log("send request");
    closeDeleteDialog();
  };

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
            <Tr>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Switch colorScheme="green" enabled={user.admin} />
              </Td>
              <Td>
                <Switch colorScheme="green" enabled={user.authorized} />
              </Td>
              <Td>
                <Stack direction="row">
                  <Button colorScheme="blue">Save</Button>
                  <IconButton
                    colorScheme="red"
                    aria-label="Remove User"
                    icon={<i className="fas fa-trash-alt"></i>}
                    onClick={() => openDeleteDialog(1)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={deleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => removeUser(1)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
