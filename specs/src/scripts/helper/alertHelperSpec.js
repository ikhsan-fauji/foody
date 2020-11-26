import alert from '../../../../src/scripts/helper/alert-helper';
import showSuccessAlert from './contract/showSuccessAlert';
import showErrorAlert from './contract/showErrorAlert';

describe('Alert Helper', () => {
  const alertContainer = () => {
    document.body.innerHTML = '<div id="alert-container"></div>';
  };

  beforeEach(() => {
    alertContainer();
  });

  showSuccessAlert(alert);

  showErrorAlert(alert);
});
