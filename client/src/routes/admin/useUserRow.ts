import { isEqual } from "lodash";
import { useMemo, useState } from "react";

import { UserModel } from "../../types/user-model";

export const useUserRow = (user: UserModel) => {
  const [currentUser, setCurrentUser] = useState(user);

  const saveButtonDisabled = useMemo(() => {
    return isEqual(user, currentUser);
  }, [currentUser, user]);

  const onChangeAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((prev) => ({ ...prev, is_admin: e.target.checked }));
  };

  const onChangeAuthorized = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((prev) => ({ ...prev, is_authorized: e.target.checked }));
  };

  return {
    currentUser,
    onChangeAdmin,
    onChangeAuthorized,
    saveButtonDisabled
  };
};
