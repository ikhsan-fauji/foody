const _showAlert = (template) => {
  const alertContainer = document.querySelector('#alert-container');
  alertContainer.innerHTML = template;
  alertContainer.classList.add('show');
  setTimeout(() => {
    alertContainer.classList.remove('show');
  }, 2500);
};

const alert = {
  success(title = '', message = '') {
    const template = `
      <div class="alert success">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;
    _showAlert(template);
  },

  error(title = '', message = '') {
    const template = `
      <div class="alert error">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;
    _showAlert(template);
  }
};

export default alert;
