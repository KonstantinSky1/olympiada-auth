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
  console.log("🚀 ~ file: CurrentUserContext.js ~ line 20 ~ CurrentUserContextProvider ~ loggedIn", loggedIn)
  const [currentUser, setCurrentUser] = useState(defaultUser);
  // const [stateInfoTooltip, setStateInfoTooltip] = useState(false);

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
              console.log('ssfsdfff')
              // setStateInfoTooltip(true);
              // userLoggOut();
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
        .catch(err => {
          console.log(err)
          if (err) {
            // setStateInfoTooltip(true);
          }
        });
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