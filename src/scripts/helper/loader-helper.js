const loader = {
  start(key) {
    const loaderElement = document.createElement('div');
    loaderElement.setAttribute('class', 'loader');
    const asyncContent = document.querySelector(key);
    asyncContent.appendChild(loaderElement);
  },

  stop() {
    const loaderElement = document.querySelector('.loader');
    loaderElement.remove();
  }
};

export default loader;
