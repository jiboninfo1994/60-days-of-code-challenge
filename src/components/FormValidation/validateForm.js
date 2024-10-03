export const validateForm = (formData, formRef, setErrors) => {
  let isError = true;

  if (!formData.name.trim()) {
    formRef.current.name.classList.add('error');
    setErrors({ name: 'Name field is required!' });

    return isError;
  }

  if (!formData.email.trim()) {
    formRef.current.email.classList.add('error');
    setErrors({ name: 'Email field is required!' });

    return isError;
  } else if (!isEmailValid(formData.email)) {
    formRef.current.email.classList.add('error');
    setErrors({ name: 'Email is invalid!' });

    return isError;
  }

  if (!formData.password.trim()) {
    formRef.current.password.classList.add('error');
    setErrors({ password: 'Password field is required!' });

    return isError;
  } else if (formData.password.trim().length < 0) {
    formRef.current.password.classList.add('error');
    setErrors({ password: 'Password should be at least 6 characters!' });

    return isError;
  }

  if (!formData.confirmPassword.trim()) {
    formRef.current.confirmPassword.classList.add('error');
    setErrors({ confirmPassword: 'Confirm password field is required!' });

    return isError;
  } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
    formRef.current.confirmPassword.classList.add('error');
    setErrors({ confirmPassword: 'Password did not match!' });

    return isError;
  }

  return (isError = false);
};

const isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
