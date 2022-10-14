import React, { useContext } from "react";
import { Link, useNavigate   } from "react-router-dom";
import * as auth from '../../utils/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/UseForm.js';

import './Register.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Register() {
  const defaultUser = {
    email: '',
    password: '',
    name: '',
    tel: '',
    sms: ''
  };

  const navigate = useNavigate();

  const { userLoggined } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, errors, errMessage, setErrMessage, setIsValid } = useFormWithValidation(defaultUser);

  function handleRegister(email, password, name) {
    setIsValid(false); //блокируем сабмит во время отправки запроса

    //записываем в БД данные пользователя
    return auth.register(email, password, name)
      .then((res) => {
        if (!res) return;

        //после регистрации запускаем авторизацию, чтобы получить токен и записать его в localStorage. После успешной авторизации редирект на страницу добавления вопросов
        return auth.authorize(email, password)
          .then(() => {
            userLoggined();
            navigate("/questions");
          })
      })
        .catch(err => {
          if (err.status === 400) {
            setErrMessage('Некорректные данные name или email');
          }

          if (err.status === 409) {
            setErrMessage('Данный емеил уже занят');
          }
        })
  }

  //в этой функции получаем данные инпута с телефоном
  function getPhoneNumber(event) {
    event.preventDefault();

    const { tel } = values;

    console.log(tel)
    return tel;
  }

    function handleSubmit(event) {
    event.preventDefault();

    const {email, password, name} = values;

    handleRegister(email, password, name);
  }

  return (
    <section className="register">
      <div className="register__container">
        <h2 className="register__title">
          Регистрация
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="register__form"
          name="register-form"
        >
          <div className="register__inputsBlock">
            {/* <div>
              <input
                onChange={handleChange}
                value={values.name}
                className="register__input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                required
              />
              <ErrorMessage
                errorMessage={errors.name}
              />
            </div>
            <div>
              <input
                onChange={handleChange}
                value={values.email}
                className="register__input"
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
                className="register__input register__input_type_password"
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="4"
                required
              />
              <ErrorMessage
                errorMessage={errors.password}
              />
            </div> */}
            <div>
              <input
                onChange={handleChange}
                value={values.tel}
                className="register__input"
                type="tel"
                name="tel"
                placeholder="Введите номер телефона..."
                required
              />
              <ErrorMessage
                errorMessage={errors.tel}
              />
            </div>
            {/* этот инпут должен будет появляться только после получения смс */}
            <div>
              <input
                onChange={handleChange}
                value={values.sms}
                className="register__input"
                type="text"
                name="sms"
                placeholder="Введите полученный смс..."
                // required
              />
              <ErrorMessage
                errorMessage={errors.sms}
              />
            </div>
          </div>

          <button
            onClick={getPhoneNumber}
            type="button"
            disabled={!isValid}
            className="register__buttonSubmit"
            style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
          >
            Получить смс
          </button>

          {/* <div className="register__buttonsBlock">
            <ErrorMessage
              errorMessage={errMessage}
              style={{padding: '0 0 10px 0'}}
            />
            <button
              disabled={!isValid}
              className="register__buttonSubmit"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Зарегистрироваться
            </button>
            <Link to="/signin" className="register__link">
              Уже зарегистрированы?
              <span className="register__linkText">Войти</span>
            </Link>
          </div> */}
        </form>
      </div>
    </section>
  );
}

export default Register;