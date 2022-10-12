import React from "react";
import { Link } from 'react-router-dom';

import './Entry.css';

function Entry() {
  return (
    <div className="entry">
      <div className="entry__container">
        <div className="entry__auth-buttons-block">
          <Link
            to="/signin"
            className="entry__auth-buttons-login"
          >
            Вход
          </Link>
          <Link
            to="/signup"
            className="entry__auth-buttons-register"
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Entry;