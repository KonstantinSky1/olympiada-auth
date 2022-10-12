import React, { useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Entry from '../Entry/Entry.jsx';
import Questions from '../Questions/Questions.jsx';
import Register from '../Register/Register.jsx';

import './App.css';

function App() {
  const { isLoading, isUserLoggined } = useContext(CurrentUserContext);

  return isLoading() ? '' : (
    <Routes>
      {/* Если пользователь залогинен, то перенаправляем на /questions. Если не залогинены то показываем главную страницу - Entry */}
      <Route path="/" element={isUserLoggined() ? <Navigate to="/questions" replace /> : <Entry />} />

      {/* защитить роут Register (если Залогинен, то нельзя на него попасть) */}
      <Route path="/signup" element={<Register />} />

      {/* защитить этот роут (Если НЕ залогинены, то на него нельзя попасть): */}
      <Route path="/questions" element={<Questions />} />
    </Routes>
  );
}

export default App;