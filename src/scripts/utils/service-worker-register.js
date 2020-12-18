const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    import('workbox-window').then(({ Workbox }) => {
      const workbox = new Workbox('../service-worker.js');
      workbox.register();
    });
  }
};

export default swRegister;
