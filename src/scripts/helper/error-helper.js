import noDataTemplate from '../views/templates/nodata-template';

const handleError = ({ elementId, functionName, error }) => {
  const element = document.querySelector(elementId);
  if (!element) return;
  if (error.message === 'Failed to fetch') {
    element.innerHTML = noDataTemplate('Connection Failed');
  } else {
    element.innerHTML = noDataTemplate('Something went wrong');
  }
  console.error(functionName, error);
};

export default handleError;
