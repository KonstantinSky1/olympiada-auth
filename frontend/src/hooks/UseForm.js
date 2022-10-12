import React, { useState, useCallback } from "react";

export function useFormWithValidation(defaultData) {
  const [isValid, setIsValid] = React.useState(false);
  const [values, setValues] = React.useState(defaultData);
  const [errors, setErrors] = React.useState(defaultData);
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;

    setValues(prev => (
      {
        ...prev,
        [name]: value
      }
    ));

    setErrors(prev => (
      {
        ...prev,
        [name]: event.target.validationMessage
      }
    ));

    setErrMessage('');

    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = defaultData, newErrors = defaultData, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, isValid, setIsValid, errors, errMessage, setErrMessage, resetForm };
}