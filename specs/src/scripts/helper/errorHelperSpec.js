import { handleError } from '../../../../src/scripts/helper/error-helper';
import { noDataTemplate } from '../../../../src/scripts/views/templates/html-template';

describe('Error Helper #handleError', () => {
  const createWrapper = () => {
    document.body.innerHTML = '<div id="wrapper"></div>';
  };

  const defaultErrorMessage = 'Something went wrong';
  const connectionErrorMessage = 'Connection Failed';

  beforeEach(() => {
    createWrapper();
  });

  it('should render default error message', () => {
    const params = {
      noDataTemplate,
      elementId: '#wrapper',
      functionName: 'testFunction',
      error: new Error('Error')
    };
    handleError(params);
    const wrapperElement = document.querySelector('#wrapper');
    const errorMessage = document.querySelector('.error-message');
    expect(wrapperElement.textContent).not.toBeNull();
    expect(wrapperElement.textContent).not.toEqual('');
    console.log(errorMessage.textContent);
    expect(errorMessage.textContent).toBe(defaultErrorMessage);
  });

  it('should render connection error message', () => {
    const params = {
      noDataTemplate,
      elementId: '#wrapper',
      functionName: 'testFunction',
      error: new Error('Failed to fetch')
    };
    handleError(params);
    const wrapperElement = document.querySelector('#wrapper');
    const errorMessage = document.querySelector('.error-message');
    expect(wrapperElement.textContent).not.toBeNull();
    expect(wrapperElement.textContent).not.toEqual('');
    expect(errorMessage.textContent).toBe(connectionErrorMessage);
  });

  it('must not to be defined', () => {
    const params = {
      noDataTemplate,
      elementId: '#wrapperX',
      functionName: 'testFunction',
      error: new Error('Error')
    };
    expect(handleError(params)).not.toBeDefined();

    const wrapperElement = document.querySelector('#wrapper');
    expect(wrapperElement.textContent).toEqual('');
  });
});
