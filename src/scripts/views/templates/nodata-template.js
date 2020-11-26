const noDataTemplate = (message = 'Data not found.') => {
  return `
    <div class="no-data">
      <div>
        <h1>Oops!!!</h1>
        <p class="error-message">${message}</p>
      </div>
    </div>
  `;
};

export default noDataTemplate;
