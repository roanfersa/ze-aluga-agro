const getAllUsers = () => {
  try {
    const usersFromStorage = localStorage.getItem("ze_aluga_users");
    if (usersFromStorage) {
      return JSON.parse(usersFromStorage);
    }

    return [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

const registerUser = (userData) => {
  try {
    const users = getAllUsers();

    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      throw new Error("Este email já está cadastrado");
    }

    const maxId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
    const newUserId = maxId + 1;

    const newUser = {
      id: newUserId,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone || "",
      is_seller: userData.userType === "owner",
      password: userData.password, // In a real app, this would be hashed!
      ...(userData.userType === "owner" && {
        store_name: `Loja de ${userData.fullName.split(" ")[0]}`,
        product_count: 0,
        followers_count: 0,
      }),
    };

    users.push(newUser);

    localStorage.setItem("ze_aluga_users", JSON.stringify(users));

    setCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: error.message };
  }
};

const loginUser = (email, password) => {
  try {
    const users = getAllUsers();

    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error("Email não encontrado");
    }

    if (user.password !== password) {
      throw new Error("Senha incorreta");
    }

    setCurrentUser(user);

    return { success: true, user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error: error.message };
  }
};

const setCurrentUser = (user) => {
  const { password, ...safeUserData } = user;
  localStorage.setItem("ze_aluga_current_user", JSON.stringify(safeUserData));
};

const getCurrentUser = () => {
  try {
    const userJson = localStorage.getItem("ze_aluga_current_user");
    if (!userJson) return null;

    return JSON.parse(userJson);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

const logoutUser = () => {
  localStorage.removeItem("ze_aluga_current_user");
  return { success: true };
};

const isLoggedIn = () => {
  return !!getCurrentUser();
};

export {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isLoggedIn,
};
