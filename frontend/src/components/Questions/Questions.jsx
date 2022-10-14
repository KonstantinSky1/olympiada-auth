import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/UseForm.js';

import './Questions.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Questions() {
  const defaultQuestions = {
    question: '',
    correct_answer: '',
    help: ''
  };
  const defaultTopic = {
    topic: ''
  }

  const { handleSignOut, currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isValid, setIsValid } = useFormWithValidation(defaultQuestions);

  const [addTopicState, setAddTopicState] = useState(false);
  const [inputFieldsWrowngAnswer, setInputFieldsWrowngAnswer] = useState([
    {
      wrong_answer: ''
    }
  ]);
  const [valuesTopic, setValuesTopic] = useState(defaultTopic);
  const [errorsInputTopic, setErrorsInputTopic] = useState(defaultTopic);
  const [showInputsState, setShowInputsState] = useState(false);

  const handleChangeInputTopic = (event) => {
    const {name, value} = event.target;

    setValuesTopic(prev => (
      {
        ...prev,
        [name]: value
      }
    ));

    setErrorsInputTopic(prev => (
      {
        ...prev,
        [name]: event.target.validationMessage
      }
    ));

    setIsValid(event.target.closest("form").checkValidity());
  };

  // Записать значение инпута с неправильным ответом в стейт inputFieldsWrowngAnswer
  function handleChangeInputWrongAnswer(index, event) {
    const values = [...inputFieldsWrowngAnswer];
    values[index][event.target.name] = event.target.value;
    setInputFieldsWrowngAnswer(values);
  }

  // Добавить input с неправильным ответом
  function handleAddInputWrongAnswer() {
    setInputFieldsWrowngAnswer([...inputFieldsWrowngAnswer, {wrong_answer: ''}]);
  }

  // Удалить input с неправильным ответом
  function handleRemoveInputWrongAnswer(index) {
    const values = [...inputFieldsWrowngAnswer];
    values.splice(index, 1);
    setInputFieldsWrowngAnswer(values);
  }

  function handleShowInputs() {
    setShowInputsState(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //нужно блокировать кнопку сабмита во время отправки запроса на сервер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //всё что ниже в console.log можно отправлять на сервер
    console.log(inputFieldsWrowngAnswer) // в inputFieldsWrowngAnswer получаем массив объектов из всех инпутов с неправильными ответами
    console.log(values) // в values получаем данные всех остальных инпутов
    console.log(valuesTopic) // в valuesTopic получаем данные инпута Темы

    // при отправке данных на сервер очищаем всё, кроме поля с Темой
    setInputFieldsWrowngAnswer([
      {
        wrong_answer: ''
      }
    ]);
    resetForm();
  }

  return (
    <div className="questions">
      <div className="questions__header">
        <p className="questions__header-userName">Приветствую {currentUser.name}</p>
        <div className="questions__buttons-block">
          <Link
            onClick={handleSignOut}
            to="/"
            className="questions__signOut"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </div>

      <div className="questions__container">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="questions__form"
          name="questions-form"
        >
          {/* При нажатии на кнопку появляется блок ввода вопросов */}
          <button
            type="button"
            onClick={() => setAddTopicState(true)}
            disabled={addTopicState}
            className={`questions__button ${addTopicState && "visibility"}`}
          >
            Добавить вопрос
          </button>
          {/* Поля ввода вопросов + кнопки Отправить и Завершить */}
          {
            addTopicState &&
            <>
              <div className="questions__form-inputsBlock">
                <div>
                  <p className="questions__form-inputsBlock-text">Тема вопросов*:</p>
                  <input
                    disabled={showInputsState}
                    onChange={handleChangeInputTopic}
                    value={valuesTopic.topic}
                    className="questions__input"
                    type="text"
                    name="topic"
                    placeholder="Тема вопросов..."
                    required
                  />
                  <ErrorMessage
                    errorMessage={errorsInputTopic.topic}
                  />
                  {!showInputsState &&
                    <button
                      className="questions__button questions__button_type_margin"
                      type="button"
                      onClick={handleShowInputs}
                    >
                      Создать тему
                    </button>
                  }
                </div>
                {showInputsState &&
                  <>
                    <div>
                      <p className="questions__form-inputsBlock-text">Вопрос*:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.question}
                        type="text"
                        name="question"
                        placeholder="Вопрос..."
                        required
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.question}
                      />
                    </div>
                    <div>
                      <p className="questions__form-inputsBlock-text">Подсказки:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.help}
                        type="text"
                        name="help"
                        placeholder="Подсказки..."
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.help}
                      />
                    </div>
                    <div>
                      <p className="questions__form-inputsBlock-text">Правильный ответ*:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.correct_answer}
                        type="text"
                        name="correct_answer"
                        placeholder="Правильный ответ..."
                        required
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.correct_answer}
                      />
                    </div>
                    {/* блок добавления неправильных ответов */}
                    <div className="questions__form-add-wrong-answer">
                      <p className="questions__form-inputsBlock-text">Неправильные ответы:</p>
                      {
                        inputFieldsWrowngAnswer.map((inputField, index) => (
                        <div
                          className="questions__form-add-wrong-answer-block"
                          key={index}
                        >
                          <textarea
                            className="questions__input questions__textarea questions__textarea-type_wrong"
                            type="text"
                            name="wrong_answer"
                            placeholder="Неправильный ответ..."
                            value={inputField.wrong_answer}
                            onChange={event => handleChangeInputWrongAnswer(index, event)}
                          >
                          </textarea>
                          <div className="questions__form-add-wrong-answer-buttons-block">
                            <button
                              className="questions__form-add-wrong-answer-button"
                              onClick={() => handleRemoveInputWrongAnswer(index)}
                              type="button"
                            >
                              -
                            </button>
                            <button
                              className="questions__form-add-wrong-answer-button"
                              onClick={() => handleAddInputWrongAnswer()}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        ))
                      }
                    </div>
                  </>
                }


              </div>
              <div className="questions__form-buttonsBlock">
                <button
                  type="submit"
                  className="questions__button"
                  disabled={!isValid}
                  style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
                >
                  Отправить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddTopicState(false);
                    resetForm();
                    setInputFieldsWrowngAnswer([
                      {
                        wrong_answer: ''
                      }
                    ]);
                    setValuesTopic(defaultTopic);
                    setErrorsInputTopic(defaultTopic);
                    setShowInputsState(false);
                  }}
                  className="questions__button"
                >
                  Сброс
                </button>
              </div>
            </>
          }
        </form>
      </div>
    </div>
  );
}

export default Questions;