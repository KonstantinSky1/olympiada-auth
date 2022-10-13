import React, { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Entry from '../Entry/Entry.jsx';
import Questions from '../Questions/Questions.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';

import './App.css';

function App() {
  const { isLoading, isUserLoggined } = useContext(CurrentUserContext);

  return isLoading() ? '' : (
    // залогинен - значит в localStorage есть токен (проверить: devTools=>Приложение=>localStorage)
    <Routes>
      {/* Если пользователь залогинен, то перенаправляем на /questions. Если не залогинен то показываем главную страницу - Entry */}
      <Route path="/" element={isUserLoggined() ? <Navigate to="/questions" replace={true} /> : <Entry />} />

      {/*Если пользователь залогинен, то перенаправляем на /questions. Если не залогинен то можно попасть на страницу регистрации*/}
      <Route path="/signup" element={isUserLoggined() ? <Navigate to="/questions" replace={true} /> : <Register />} />

      {/*Если пользователь залогинен, то перенаправляем на /questions. Если не залогинен то можно попасть на страницу авторизации*/}
      <Route path="/signin" element={isUserLoggined() ? <Navigate to="/questions" replace={true} /> : <Login />} />

      {/* Если пользователь залогинен, то можно попасть на /questions. Если не залогинен то перенаправляем на главную */}
      <Route path="/questions" element={isUserLoggined() ? <Questions /> : <Navigate to="/" replace={true} />} />

      {/* страница 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;