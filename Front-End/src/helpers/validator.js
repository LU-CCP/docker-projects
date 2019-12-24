import * as yup from "yup";

export const paramValidation = function paramValidation(yup) {
  return function validator(form, formValidator) {
    const options = {
      allowUnknown: true,
      abortEarly: false,
    };

    if (!formValidator) {
      throw new Error();
    }

    const result = yup.isValid(form, formValidator, options);

    if (result.error) {
      console.log("validation error - %s", result.error.message);

      const details = [];
      result.error.details.forEach((element) => {
        details.push({ message: element.message, key: element.path[0] });
      });

      return details;
    }

    return [];
  };
};
