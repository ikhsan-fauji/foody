import CONFIG from '../globals/config';

const request = {
  async get(url) {
    let responseData = null;

    const response = await fetch(url);
    if (response.ok) {
      responseData = response.json();
    }

    return responseData;
  },

  async post(url, data) {
    let responseData = null;

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
    if (response.ok) {
      responseData = response.json();
    }

    return responseData;
  }
};

export default request;
