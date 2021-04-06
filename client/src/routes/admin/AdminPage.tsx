import React from "react";

import { useBreakpointValue } from "@chakra-ui/react";

import { Navbar } from "../../custom-components/Navbar";
import { UserAccordion } from "./accordion/UserAccordion";
import { UserTable } from "./table/UserTable";
import { useAdminPage } from "./useAdminPage";

export const AdminPage = () => {
  const { users, updateUser, removeUser } = useAdminPage();
  const breakpoint = useBreakpointValue(["sm", "md", "lg", "xl"]);

  return (
    <div>
      <Navbar />
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
    </div>
  );
};
