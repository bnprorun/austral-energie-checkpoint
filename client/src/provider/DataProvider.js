import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import AuthenticationContext from "../context/AuthenticationContext";
import UserContext from "../context/UserContext";
import { USER_BY_TOKEN } from "../graphql/userGql";

const Dataprovider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const { data } = useQuery(USER_BY_TOKEN, {
    variables: { token: localStorage.getItem("token") },
  });

  useEffect(() => {
    if (data && data.getUserByToken) {
      setIsAuth(true);
      setUser(data.getUserByToken);
    }
  }, [data]);
  return (
    <>
      <AuthenticationContext.Provider value={{ isAuth, setIsAuth }}>
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      </AuthenticationContext.Provider>
    </>
  );
};

export default Dataprovider;
