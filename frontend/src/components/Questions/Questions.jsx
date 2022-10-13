import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/UseForm.js';

import './Questions.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Questions() {
  // здесь поля придумать!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const defaultQuestions = {
    topic: '',
    question: '',
    correct_answer: '',
    help: ''
  };

  const { handleSignOut, currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isValid } = useFormWithValidation(defaultQuestions);

  const [addTopicState, setAddTopicState] = useState(false);
  const [addInput, setAddInput] = useState([]);

  function handleAddInput() {
    const input = (
      <input type="text" />
    );

    setAddInput(prev => 
      [...prev, input]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    //нужно блокировать кнопку сабмита во время отправки запроса!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
                  <p className="questions__form-inputsBlock-text">Тема вопросов:</p>
                  <input
                    onChange={handleChange}
                    value={values.topic}
                    className="questions__input"
                    type="text"
                    name="topic"
                    placeholder="Тема вопросов..."
                    required
                  />
                  <ErrorMessage
                    errorMessage={errors.topic}
                  />
                </div>
                <div>
                  <p className="questions__form-inputsBlock-text">Вопрос:</p>
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
                  <p className="questions__form-inputsBlock-text">Правильный ответ:</p>
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
                  {
                    addInput.map((item, index) => item)
                  }
                  <button
                    onClick={() => handleAddInput()}
                    type="button"
                    className="questions__button-add-wrong-answer"
                  >
                    Добавить неправильный ответ
                  </button>
                </div>
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
                  }}
                  className="questions__button"
                >
                  Завершить тему
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