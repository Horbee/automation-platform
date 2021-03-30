import { isEqual } from "lodash";
import React, { useMemo, useState } from "react";

import { Button, IconButton, Stack, Switch, Td, Tr } from "@chakra-ui/react";

import { UserModel } from "../../types/user-model";

interface UserRowProps {
  user: UserModel;
  removeUser: (userId: number) => void;
  updateUser: (user: UserModel) => Promise<void>;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
  removeUser,
  updateUser
}) => {
  const [currentUser, setCurrentUser] = useState(user);

  const saveButtonDisabled = useMemo(() => {
    return isEqual(user, currentUser);
  }, [currentUser, user]);

  const onChangeAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((prev) => ({ ...prev, admin: e.target.checked }));
  };

  const onChangeAuthorized = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((prev) => ({ ...prev, authorized: e.target.checked }));
  };

  return (
    <Tr>
      <Td>{currentUser.id}</Td>
      <Td>{currentUser.name}</Td>
      <Td>{currentUser.email}</Td>
      <Td>
        <Switch
          colorScheme="green"
          isChecked={currentUser.authorized}
          onChange={onChangeAuthorized}
        />
      </Td>
      <Td>
        <Switch
          colorScheme="green"
          isChecked={currentUser.admin}
          onChange={onChangeAdmin}
        />
      </Td>
      <Td>
        <Stack direction="row">
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
      </Td>
    </Tr>
  );
};
