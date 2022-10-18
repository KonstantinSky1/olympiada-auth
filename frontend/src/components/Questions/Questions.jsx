import React, { useContext, useState, useRef } from "react";
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/UseForm.js';

import './Questions.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Questions() {
  const defaultQuestions = {
    question: '',
    correct_answer: '',
    help: '',
    wrong_answer_one: '',
    wrong_answer_two: ''
  };
  const defaultTopic = {
    topic: ''
  }

  const { handleSignOut, currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, isValid } = useFormWithValidation(defaultQuestions);

  const [addTopicState, setAddTopicState] = useState(false);
  //Для динамически создаваемых инпутов:
  // const [inputFieldsWrowngAnswer, setInputFieldsWrowngAnswer] = useState([
  //   {
  //     wrong_answer: ''
  //   }
  // ]);
  //Данные предмета в valuesTopic
  const [valuesTopic, setValuesTopic] = useState(defaultTopic);
  const [errorsInputTopic, setErrorsInputTopic] = useState(defaultTopic);
  const [isValidInputTopic, setIsValidInputTopic] = useState(false);
  const [showInputsState, setShowInputsState] = useState(false);
  //Файлы вопроса в selectedQuestionFiles
  const [selectedQuestionFiles, setSelectedQuestionFiles] = useState(null);
  //Файл Правильного ответа в selectedCorrectAnswerFile
  const [selectedCorrectAnswerFile, setSelectedCorrectAnswerFile] = useState(null);
  //Файл Неправильного ответа1 в selectedWrongAnswerOneFile
  const [selectedWrongAnswerFirstFile, setSelectedWrongAnswerFirstFile] = useState(null);
  //Файл Неправильного ответа2 в selectedWrongAnswerSecondFile
  const [selectedWrongAnswerSecondFile, setSelectedWrongAnswerSecondFile] = useState(null);
  //Стейты установки ошибки в случае превышения файла заданного размера
  const [errorMessageFileSizeCorrectAnswer, setErrorMessageFileSizeCorrectAnswer] = useState('');
  const [errorMessageFileSizeWrongAnswerFirst, setErrorMessageFileSizeWrongAnswerFirst] = useState('');
  const [errorMessageFileSizeWrongAnswerSecond, setErrorMessageFileSizeWrongAnswerSecond] = useState('');
  const [errorMessageFileSizeQuestion, setErrorMessageFileSizeQuestion] = useState('');

  const filePickerQuestion = useRef(null);
  const filePickerCorrectAnswer = useRef(null);
  const filePickerWrongAnswerFirst = useRef(null);
  const filePickerWrongAnswerSecond = useRef(null);

  function handlePickFileQuestion(e) {
    e.preventDefault();
    filePickerQuestion.current.click();
  }

  function handlePickFileCorrectAnswer(e) {
    e.preventDefault();
    filePickerCorrectAnswer.current.click();
  }

  function handlePickFileWrongAnswerOne(e) {
    e.preventDefault();
    filePickerWrongAnswerFirst.current.click();
  }

  function handlePickFileWrongAnswerTwo(e) {
    e.preventDefault();
    filePickerWrongAnswerSecond.current.click();
  }

  function handleQuestionFileUploadChange(e) {
    e.preventDefault();
    let arr = [...e.target.files];
    for (let i=0; i<arr.length; i++) {
      if (arr[i].size > 2000000) {
        setErrorMessageFileSizeQuestion('Каждый файл не должен превышать 2 МБ');
        return;
      } else {
        setErrorMessageFileSizeQuestion('');
      }
    }
    setSelectedQuestionFiles([...e.target.files]);
  }

  function handleCorrectAnswerFileUploadChange(e) {
    e.preventDefault();
    if (e.target.files[0].size < 2000000) {
      setErrorMessageFileSizeCorrectAnswer('');
      setSelectedCorrectAnswerFile([e.target.files[0]]);
    } else {
      setErrorMessageFileSizeCorrectAnswer('Файл превышает 2Мб');
    }
  }

  function handleWrongAnswerFirstFileUploadChange(e) {
    e.preventDefault();
    if (e.target.files[0].size < 2000000) {
      setErrorMessageFileSizeWrongAnswerFirst('');
      setSelectedWrongAnswerFirstFile([e.target.files[0]]);
    } else {
        setErrorMessageFileSizeWrongAnswerFirst('Файл превышает 2Мб');
    }
  }

  function handleWrongAnswerSecondFileUploadChange(e) {
    e.preventDefault();
    if (e.target.files[0].size < 2000000) {
      setErrorMessageFileSizeWrongAnswerSecond('');
      setSelectedWrongAnswerSecondFile([e.target.files[0]]);
    } else {
        setErrorMessageFileSizeWrongAnswerSecond('Файл превышает 2Мб');
    }
  }

  const handleChangeInputTopic = (event) => {
    let {name, value} = event.target;

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

    setIsValidInputTopic(event.target.closest("form").checkValidity());
  };

  //Для динамически создаваемых инпутов: ============================================
  // Записать значение инпута с неправильным ответом в стейт inputFieldsWrowngAnswer
  // function handleChangeInputWrongAnswer(index, event) {
  //   const values = [...inputFieldsWrowngAnswer];
  //   values[index][event.target.name] = event.target.value;
  //   setInputFieldsWrowngAnswer(values);
  // }

  // // Добавить input с неправильным ответом
  // function handleAddInputWrongAnswer() {
  //   setInputFieldsWrowngAnswer([...inputFieldsWrowngAnswer, {wrong_answer: ''}]);
  // }

  // // Удалить input с неправильным ответом
  // function handleRemoveInputWrongAnswer(index) {
  //   const values = [...inputFieldsWrowngAnswer];
  //   values.splice(index, 1);
  //   setInputFieldsWrowngAnswer(values);
  // }
  // =================================================================================

  function handleShowInputs() {
    setShowInputsState(true);
  }

  //Удалить картинку Вопроса
  function handleRemoveQuestionImage(index) {
    const values = [...selectedQuestionFiles];
    values.splice(index, 1);
    setSelectedQuestionFiles(values);
  }

  //Сдвинуть картинку Вопроса вверх и вниз =========================
  function handleUpIndexQuestionImage(index) {
    const values = [...selectedQuestionFiles];

    if (index !== (values.length-1)) {
      let item = (values.splice(index, 1))[0];
      values.splice(index+1, 0, item);
      setSelectedQuestionFiles(values);
    }
  }

  function handleDownIndexQuestionImage(index) {
    if (index !== 0) {
      const values = [...selectedQuestionFiles];
      let item = (values.splice(index, 1))[0];
      values.splice(index-1, 0, item);
      setSelectedQuestionFiles(values);
    }
  }
  //================================================================

  function handleSubmit(event) {
    event.preventDefault();

    //нужно блокировать кнопку сабмита во время отправки запроса на сервер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //всё что ниже в console.log можно отправлять на сервер:
    // в values получаем данные всех остальных инпутов
    console.log(values)
    // в valuesTopic получаем данные инпута Темы
    console.log(valuesTopic)
    // в selectedQuestionFiles получаем картинки вопроса
    console.log(selectedQuestionFiles)
    //в selectedCorrectAnswerFile получаем картинку Правильного ответам
    console.log(selectedCorrectAnswerFile)
    //в selectedWrongAnswerFirstFile получаем картинку Первого неправильного ответа
    console.log(selectedWrongAnswerFirstFile)
    //в selectedWrongAnswerSecondFile получаем картинку Второго неправильного ответа
    console.log(selectedWrongAnswerSecondFile)

    // при отправке данных на сервер очищаем всё, кроме поля с Темой
    resetForm();
    setSelectedQuestionFiles(null);
    setSelectedCorrectAnswerFile(null);
    setSelectedWrongAnswerFirstFile(null);
    setSelectedWrongAnswerSecondFile(null);
    setErrorMessageFileSizeCorrectAnswer('');
    setErrorMessageFileSizeWrongAnswerFirst('');
    setErrorMessageFileSizeWrongAnswerSecond('');
    setErrorMessageFileSizeQuestion('');
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
                  <p className="questions__form-inputsBlock-text">Предмет*:</p>
                  <input
                    disabled={showInputsState}
                    onChange={handleChangeInputTopic}
                    value={valuesTopic.topic}
                    className="questions__input"
                    type="text"
                    name="topic"
                    placeholder="Введите название предмета..."
                    required
                  />
                  <ErrorMessage
                    errorMessage={errorsInputTopic.topic}
                  />
                  {!showInputsState &&
                    <button
                      disabled={!isValidInputTopic}
                      style={!isValidInputTopic ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
                      className="questions__button questions__button_type_margin"
                      type="button"
                      onClick={handleShowInputs}
                    >
                      Создать
                    </button>
                  }
                </div>
                {showInputsState &&
                  <>
                    {/* Вопрос может быть текст или картинка. Текстовое поле обязательно, картинки не обязательно */}
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
                    {/* Картинки вопроса: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Картинки вопроса:</p>
                      <button
                        onClick={handlePickFileQuestion}
                        className="questions__button"
                      >
                        Выбрать файл
                      </button>
                      <input
                        className="questions__form-fileInput-hidden"
                        ref={filePickerQuestion}
                        type="file"
                        onClick={(e) => e.target.value=null}
                        onChange={handleQuestionFileUploadChange}
                        accept="image/*,.png,.jpg,.gif,.web"
                        multiple
                      />
                      <ErrorMessage
                        errorMessage={errorMessageFileSizeQuestion}
                        style={{fontSize: '.8em'}}
                      />
                      {
                        (selectedQuestionFiles) &&
                          Array.from(selectedQuestionFiles).map((file, index) => {
                            return (
                                    <div
                                      className="questions__form-image-block"
                                      key={index}
                                    >
                                      <div>
                                        <img
                                          src={URL.createObjectURL(file)}
                                          alt="Картинка"
                                          className="questions__form-image"
                                        />
                                      </div>
                                      <div className="questions__form-image-buttons">
                                        {
                                          (Array.from(selectedQuestionFiles).length > 1) &&
                                          <div className="questions__form-image-buttons-up_down">
                                            <button
                                              type="button"
                                              className="questions__form-button-image-down"
                                              onClick={() => handleUpIndexQuestionImage(index)}
                                            >
                                            </button>
                                            <button
                                              type="button"
                                              className="questions__form-button-image-up"
                                              onClick={() => handleDownIndexQuestionImage(index)}
                                            >
                                            </button>
                                          </div>
                                        }
                                        <button
                                          onClick={() => handleRemoveQuestionImage(index)}
                                          className="questions__form-button-image-delete"
                                          type="button"
                                        >
                                        </button>
                                      </div>
                                    </div>
                                  )
                        })
                      }
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
                    {/* Правильный ответ: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Правильный ответ:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.correct_answer}
                        type="text"
                        name="correct_answer"
                        placeholder="Правильный ответ..."
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.correct_answer}
                      />
                    </div>
                    {/* Картинка ответа: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Картинка правильного ответа:</p>
                      <button
                        onClick={handlePickFileCorrectAnswer}
                        className="questions__button"
                      >
                        Выбрать файл
                      </button>
                      <input
                        className="questions__form-fileInput-hidden"
                        ref={filePickerCorrectAnswer}
                        type="file"
                        onClick={(e) => e.target.value=null}
                        onChange={handleCorrectAnswerFileUploadChange}
                        accept="image/*,.png,.jpg,.gif,.web"
                      />
                      <ErrorMessage
                        errorMessage={errorMessageFileSizeCorrectAnswer}
                        style={{fontSize: '.8em'}}
                      />
                      {
                        (selectedCorrectAnswerFile) &&
                        <div className="questions__form-image-block">
                          <div>
                            <img
                              src={URL.createObjectURL(selectedCorrectAnswerFile[0])}
                              alt="Картинка"
                              className="questions__form-image"
                            />
                          </div>
                          <div className="questions__form-image-buttons">
                          <button
                            onClick={() => setSelectedCorrectAnswerFile(null)}
                            className="questions__form-button-image-delete"
                            type="button"
                          >
                          </button>
                          </div>
                        </div>
                      }
                    </div>
                    {/* блок добавления неправильных ответов (Динамически создаваемые инпуты. Можно добавить или удалить)*/}
                    {/* <div className="questions__form-add-wrong-answer">
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
                    </div> */}

                    {/* Неправильный ответ 1: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Неправильный ответ 1:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.wrong_answer_one}
                        type="text"
                        name="wrong_answer_one"
                        placeholder="Неправильный ответ 1..."
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.wrong_answer_one}
                      />
                    </div>
                    {/* Картинка неправильного ответа 1: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Картинка неправильного ответа 1:</p>
                      <button
                        onClick={handlePickFileWrongAnswerOne}
                        className="questions__button"
                      >
                        Выбрать файл
                      </button>
                      <input
                        className="questions__form-fileInput-hidden"
                        ref={filePickerWrongAnswerFirst}
                        type="file"
                        onClick={(e) => e.target.value=null}
                        onChange={handleWrongAnswerFirstFileUploadChange}
                        accept="image/*,.png,.jpg,.gif,.web"
                      />
                      <ErrorMessage
                        errorMessage={errorMessageFileSizeWrongAnswerFirst}
                        style={{fontSize: '.8em'}}
                      />
                      {
                        (selectedWrongAnswerFirstFile) &&
                        <div className="questions__form-image-block">
                          <div>
                            <img
                              src={URL.createObjectURL(selectedWrongAnswerFirstFile[0])}
                              alt="Картинка"
                              className="questions__form-image"
                            />
                          </div>
                          <div className="questions__form-image-buttons">
                          <button
                            onClick={() => setSelectedWrongAnswerFirstFile(null)}
                            className="questions__form-button-image-delete"
                            type="button"
                          >
                          </button>
                          </div>
                        </div>
                      }
                    </div>

                    {/* Неправильный ответ 2: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Неправильный ответ 2:</p>
                      <textarea
                        className="questions__input questions__textarea"
                        onChange={handleChange}
                        value={values.wrong_answer_two}
                        type="text"
                        name="wrong_answer_two"
                        placeholder="Неправильный ответ 2..."
                      >
                      </textarea>
                      <ErrorMessage
                        errorMessage={errors.wrong_answer_two}
                      />
                    </div>
                    {/* Картинка неправильного ответа 2: */}
                    <div>
                      <p className="questions__form-inputsBlock-text">Картинка неправильного ответа 2:</p>
                      <button
                        onClick={handlePickFileWrongAnswerTwo}
                        className="questions__button"
                      >
                        Выбрать файл
                      </button>
                      <input
                        className="questions__form-fileInput-hidden"
                        ref={filePickerWrongAnswerSecond}
                        type="file"
                        onClick={(e) => e.target.value=null}
                        onChange={handleWrongAnswerSecondFileUploadChange}
                        accept="image/*,.png,.jpg,.gif,.web"
                      />
                      <ErrorMessage
                        errorMessage={errorMessageFileSizeWrongAnswerSecond}
                        style={{fontSize: '.8em'}}
                      />
                      {
                        (selectedWrongAnswerSecondFile) &&
                        <div className="questions__form-image-block">
                          <div>
                            <img
                              src={URL.createObjectURL(selectedWrongAnswerSecondFile[0])}
                              alt="Картинка"
                              className="questions__form-image"
                            />
                          </div>
                          <div className="questions__form-image-buttons">
                          <button
                            onClick={() => setSelectedWrongAnswerSecondFile(null)}
                            className="questions__form-button-image-delete"
                            type="button"
                          >
                          </button>
                          </div>
                        </div>
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
                    setValuesTopic(defaultTopic);
                    setErrorsInputTopic(defaultTopic);
                    setShowInputsState(false);
                    setIsValidInputTopic(false);
                    setSelectedQuestionFiles(null);
                    setSelectedCorrectAnswerFile(null);
                    setSelectedWrongAnswerFirstFile(null);
                    setSelectedWrongAnswerSecondFile(null);
                    setErrorMessageFileSizeCorrectAnswer('');
                    setErrorMessageFileSizeWrongAnswerFirst('');
                    setErrorMessageFileSizeWrongAnswerSecond('');
                    setErrorMessageFileSizeQuestion('');
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