import CONFIG from '../globals/config';

const request = {
  async get(url) {
    const response = await fetch(url);
    return response.json();
  },

  async post(url, data) {
    const postConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    };

    const response = await fetch(url, postConfig);
    return response.json();
  }
};

export default request;
