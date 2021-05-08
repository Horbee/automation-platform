import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import shallow from "zustand/shallow";

import {
    Avatar, Badge, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text
} from "@chakra-ui/react";

import { AppConfig } from "../constants/config";
import { Routes } from "../constants/routes";
import { useAuthService } from "../service/useAuthService";
import { userStore } from "../stores/userStore";

export const Navbar = () => {
  const { username, picture, admin } = userStore(
    (state) => ({
      username: state.username,
      picture: state.picture,
      admin: state.admin
    }),
    shallow
  );

  const { logUserOut } = useAuthService();

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: logUserOut,
    onFailure: () => console.log("Logout error"),
    clientId: AppConfig.clientId
  });

  const history = useHistory();

  const handleHomeClick = () => {
    history.push(Routes.Home);
  };

  const handleAdminClick = () => {
    history.push(Routes.Admin);
  };

  return (
    <Flex alignItems="center" justifyContent={"space-between"}>
      <Box d="flex" p="3">
        <Avatar name={username} src={picture} bgColor="white" />
        <Box ml="3">
          <Text fontWeight="bold">{username}</Text>
          {admin ? (
            <Badge colorScheme="orange">Admin</Badge>
          ) : (
            <Badge colorScheme="green">User</Badge>
          )}
        </Box>
      </Box>
      <Box p="3">
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<i className="fas fa-bars"></i>}
            aria-label="Options"
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={handleHomeClick}>Home</MenuItem>
            {admin && <MenuItem onClick={handleAdminClick}>Admin</MenuItem>}
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
