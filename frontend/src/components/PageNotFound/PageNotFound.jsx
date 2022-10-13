import React from "react";
import { useNavigate  } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <div className="pageNotFound__container">
        <div className="pageNotFound__content">
          <h2 className="pageNotFound__title">404</h2>
          <p className="pageNotFound__text">Страница не найдена</p>
        </div>
        <button
          className="pageNotFound__button"
          onClick={() => navigate(-1)}
          type="button"
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;