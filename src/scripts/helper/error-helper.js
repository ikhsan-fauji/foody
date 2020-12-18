const handleError = ({ elementId, functionName, error, noDataTemplate }) => {
  const element = document.querySelector(elementId);
  if (!element) return;
  if (error.message === 'Failed to fetch') {
    element.innerHTML = noDataTemplate('Connection Failed');
  } else {
    element.innerHTML = noDataTemplate('Something went wrong');
  }
  console.error(functionName, error);
};

/* eslint-disable import/prefer-default-export */
export { handleError };
