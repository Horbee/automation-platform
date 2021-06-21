import { useEffect } from "react";

import { LoadingWrapper } from "../../custom-components/LoadingWrapper";
import { Navbar } from "../../custom-components/Navbar";
import { useVacuum } from "../../service/useVacuum";
import { userStore } from "../../stores/userStore";
import { NotAuthorized } from "./NotAuthorized";
import { VacuumControls } from "./VacuumControls";
import { VacuumStatus } from "./VacuumStatus";

export const HomePage = () => {
  const authorized = userStore((state) => state.authorized);
  const { status, getStatus, statusLoading } = useVacuum();

  useEffect(() => {
    if (authorized) {
      getStatus();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      {authorized ? (
        <LoadingWrapper loading={statusLoading}>
          {status && <VacuumStatus />}
          <VacuumControls />
        </LoadingWrapper>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};
