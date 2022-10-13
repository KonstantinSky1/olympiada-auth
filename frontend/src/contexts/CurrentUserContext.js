import React, { useState, useEffect } from 'react';
import * as auth from '../utils/Auth.js';

export const loggedInMap = {
  loggedIn: "loggedIn",
  loggedOut: "loggedOut",
  loading: "loading"
};

const defaultUser = {
  email: "",
  name: "",
  _id: ""
};

export const CurrentUserContext = React.createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(loggedInMap.loading);
  const [currentUser, setCurrentUser] = useState(defaultUser);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(loggedInMap.loggedIn);
          } else {
            setLoggedIn(loggedInMap.loggedOut);
          }
        })
          .catch((err) => {
            if (err) {
              // Если бэкенд недоступен или в БД нет пользователя у которого JWT совпадает с JWT записанным в данный момент в localStorage, то разлогируемся и редирект на главную чтобы приложение работало
              handleSignOut();
            }
          });
    } else {
      setLoggedIn(loggedInMap.loggedOut);
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    
    if (loggedIn === loggedInMap.loggedIn) {
      auth.getUserMe(jwt)
      .then(user => {
        setCurrentUser(user);
      })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function userLoggined() {
    setLoggedIn(loggedInMap.loggedIn);
  }

  function userLoggOut() {
    setLoggedIn(loggedInMap.loggedOut);
  }

  function isLoading() {
    return loggedIn === loggedInMap.loading;
  }

  function isUserLoggined() {
    return loggedIn === loggedInMap.loggedIn;
  }

  function handleSignOut() {
    localStorage.clear();
    userLoggOut();
    setCurrentUser(defaultUser);
  }

  return (
  <CurrentUserContext.Provider value={{currentUser, loggedIn, userLoggined, userLoggOut, isLoading, handleSignOut, isUserLoggined, setCurrentUser}}>
    {children}
  </CurrentUserContext.Provider>
  );
}