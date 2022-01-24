import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { Navbar } from "../../custom-components/Navbar";
import { RoomAdminComponent } from "./room/RoomAdminComponent";
import { UserAdminComponent } from "./user/UserAdminComponent";

export const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <Tabs isLazy variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Users</Tab>
          <Tab>Rooms</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserAdminComponent />
          </TabPanel>
          <TabPanel>
            <RoomAdminComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
