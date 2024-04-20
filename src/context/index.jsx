import React, { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const userInfos = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userToken = JSON.parse(localStorage.getItem("token"));
    setUserId(userData ? userData.id : null);
    setUsername(userData ? userData.name : null);
    setToken(userToken ? userToken : null);
    setUserRole(userData ? userData.role : null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        token,
        setToken,
        userId,
        setUserId,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
