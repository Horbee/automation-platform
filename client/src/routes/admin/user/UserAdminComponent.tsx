import { useBreakpointValue } from "@chakra-ui/react";

import { useUserAdminPage } from "../useUserAdminPage";
import { UserAccordion } from "./accordion/UserAccordion";
import { UserTable } from "./table/UserTable";

export const UserAdminComponent = () => {
  const breakpoint = useBreakpointValue(["sm", "md", "lg", "xl"]);
  const { users, updateUser, removeUser } = useUserAdminPage();

  return (
    <>
      {breakpoint === "sm" || breakpoint === "md" ? (
        <UserAccordion
          users={users}
          updateUser={updateUser}
          removeUser={removeUser}
        />
      ) : (
        <UserTable
          users={users}
          updateUser={updateUser}
          removeUser={removeUser}
        />
      )}
    </>
  );
};
