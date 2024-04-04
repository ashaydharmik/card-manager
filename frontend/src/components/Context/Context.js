import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    showUsers()
  }, []);

  const showUsers=()=>{
    setIsLoading(true);
    axios
      .get("https://card-manager-m4wb.onrender.com/getUsers")
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        users,
        setIsLoading,
        setUsers,
        showUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobal };
