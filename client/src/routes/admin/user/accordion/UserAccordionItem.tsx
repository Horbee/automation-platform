import {
    AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Center,
    IconButton, Stack, Switch, Table, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";

import { UserModel } from "../../../../types/user-model";
import { useUserRow } from "../../useUserRow";

interface UserAccordionItemProps {
  user: UserModel;
  removeUser: (userId: number) => void;
  updateUser: (user: UserModel) => Promise<void>;
}

export const UserAccordionItem: React.FC<UserAccordionItemProps> = ({
  user,
  removeUser,
  updateUser,
}) => {
  const { currentUser, onChangeAdmin, onChangeAuthorized, saveButtonDisabled } =
    useUserRow(user);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" d="flex" alignItems="center">
            <Avatar
              bg="white"
              name={currentUser.name}
              src={currentUser.profile_pic}
              size="sm"
              mr="3"
            />
            {currentUser.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Id:</Td>
              <Td>{currentUser.id}</Td>
            </Tr>
            <Tr>
              <Td>Username:</Td>
              <Td>{currentUser.name}</Td>
            </Tr>
            <Tr>
              <Td>E-Mail:</Td>
              <Td>{currentUser.email}</Td>
            </Tr>
            <Tr>
              <Td>Authorized:</Td>
              <Td>
                <Switch
                  colorScheme="green"
                  isChecked={currentUser.is_authorized}
                  onChange={onChangeAuthorized}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Admin:</Td>
              <Td>
                <Switch
                  colorScheme="green"
                  isChecked={currentUser.is_admin}
                  onChange={onChangeAdmin}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Center>
          <Stack direction="row" mt="4">
            <Button
              colorScheme="blue"
              isDisabled={saveButtonDisabled}
              onClick={() => updateUser(currentUser)}
            >
              Save
            </Button>
            <IconButton
              colorScheme="red"
              aria-label="Remove User"
              icon={<i className="fas fa-trash-alt"></i>}
              onClick={() => removeUser(currentUser.id)}
            />
          </Stack>
        </Center>
      </AccordionPanel>
    </AccordionItem>
  );
};
