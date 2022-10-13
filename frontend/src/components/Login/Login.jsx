import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as auth from '../../utils/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/UseForm.js';

import './Login.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Login() {
  const defaultUser = {
    email: '',
    password: ''
  };

  const navigate = useNavigate();

  const { userLoggined } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, errors, errMessage, setErrMessage, setIsValid } = useFormWithValidation(defaultUser);

  function handleLogin(email, password) {
    setIsValid(false); //блокируем сабмит во время отправки запроса

    //запускаем авторизацию, чтобы получить токен и записать его в localStorage. После успешной авторизации редирект на страницу добавления вопросов
    return auth.authorize(email, password)
      .then(() => {
        userLoggined();
        navigate("/questions");
      })
        .catch(err => {
          if (err.status === 401) {
            setErrMessage('Неверные почта или пароль');
          }

          if (err.status === 400) {
            setErrMessage('Некорректные данные email');
          }
        });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password} = values;

    handleLogin(email, password);
  }

  return (
    <section className="login">
      <div className="login__container">
        <h2 className="login__title">
          Рады видеть! Авторизуйтесь:
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="login__form"
          name="login-form"
        >
          <div className="login__inputsBlock">
            <div>
              <input
                onChange={handleChange}
                value={values.email}
                className="login__input"
                type="email"
                name="email"
                placeholder="E-mail"
                required
              />
              <ErrorMessage
                errorMessage={errors.email}
              />
            </div>
            <div>
              <input
                onChange={handleChange}
                value={values.password}
                className="login__input login__input_type_password"
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="4"
                required
              />
              <ErrorMessage
                errorMessage={errors.password}
              />
            </div>
          </div>
          <div className="login__buttonsBlock">
            <ErrorMessage
              errorMessage={errMessage}
              style={{padding: '0 0 10px 0'}}
            />
            <button
              disabled={!isValid}
              className="login__buttonSubmit"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Войти
            </button>
            <Link to="/signup" className="login__link">
              Ещё не зарегистрированы?
              <span className="login__linkText">Регистрация</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;