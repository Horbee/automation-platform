import { useEffect, useState } from "react";

import { UserEndpoints } from "../../api/user";
import {
    useConfirmationModal
} from "../../custom-components/confirmation-dialog/useConfirmationDialog";
import { userStore } from "../../stores/userStore";
import { UserModel } from "../../types/user-model";

export const useAdminPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const { getConfirmation } = useConfirmationModal();
  const loggedInUserId = userStore((state) => state.id);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    UserEndpoints.getAll().then((users) => setUsers(users));
  };

  const updateUser = async (user: UserModel) => {
    if (user.id === loggedInUserId) {
      const confirmed = await getConfirmation(
        "Confirmation",
        "Are you sure you want to continue? You may loose access to the application."
      );

      if (!confirmed) return;
    }

    try {
      await UserEndpoints.updateById(user.id, user);
      fetchUsers();
    } catch (err) {}
  };

  const removeUser = async (userId: number) => {
    if (userId === loggedInUserId) {
      const confirmed = await getConfirmation(
        "Delete User",
        "Are you sure you want to continue? You may loose access to the application."
      );

      if (!confirmed) return;
    } else {
      const confirmed = await getConfirmation(
        "Delete User",
        "Are you sure you want to delete this user?"
      );

      if (!confirmed) return;
    }
    try {
      await UserEndpoints.deleteUserById(userId);
      fetchUsers();
    } catch (err) {}
  };

  return {
    users,
    updateUser,
    removeUser
  };
};
