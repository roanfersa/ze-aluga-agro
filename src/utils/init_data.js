import usersData from "../data/users.json";

export const initializeUserData = () => {
  const existingUsers = localStorage.getItem("ze_aluga_users");

  if (!existingUsers) {
    const usersWithPasswords = usersData.map((user) => ({
      ...user,

      password: user.name.toLowerCase().replace(/\s/g, ""),
    }));

    localStorage.setItem("ze_aluga_users", JSON.stringify(usersWithPasswords));
    console.log("User data initialized in localStorage");
  }
};
