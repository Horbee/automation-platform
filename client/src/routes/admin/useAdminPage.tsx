import { useEffect, useState } from "react";

import { UserEndpoints } from "../../api/user";
import { UserModel } from "../../types/user-model";

export const useAdminPage = () => {
  const [users, setUsers] = useState<UserModel[]>();

  useEffect(() => {
    UserEndpoints.getAll().then((users) => setUsers(users));
  }, []);

  return {
    users
  };
};
