import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    const workbox = new Workbox('../service-worker.js');
    workbox.register();
  }
};

export default swRegister;
