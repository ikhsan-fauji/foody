import CONFIG from '../globals/config';
import restaurantApi from '../globals/api';
import alert from '../helper/alert-helper';

class ReviewForm extends HTMLElement {
  constructor() {
    super();
  }

  _formTemplate() {
    return `
      <form action="#" class="review-form">
        <div class="form-input">
          <input id="name-input" type="text" placeholder="Name" aria-label="Name Input" />
          <span class="name-error"></span>
        </div>
        <div class="form-input">
          <textarea id="review-input" rows="3" placeholder="Message" aria-label="Review Input"></textarea>
          <span class="review-error"></span>
        </div>
        <button type="button" class="btn-submit btn-primary">
          Submit
        </button>
      </form>
    `;
  }

  set afterSubmitted(callback) {
    this._callback = callback;
  }

  set restaurantId(restaurantId) {
    this._restaurantId = restaurantId;
  }

  connectedCallback() {
    this.render().then(() => {
      this.afterRendered();
    });
  }

  render() {
    return new Promise((resolve) => {
      this.innerHTML = this._formTemplate();
      resolve();
    });
  }

  afterRendered() {
    this._submitEvent();
    this._onInputForm();
  }

  _submitEvent() {
    const submitButton = document.querySelector('.btn-submit');
    submitButton.addEventListener('click', (event) => {
      this._submitForm(submitButton);
      event.stopPropagation();
    });
  }

  _onInputForm() {
    const nameInput = this._nameInput();
    nameInput.oninput = ({ target: { value } }) => {
      this._validate({
        value,
        element: nameInput,
        preClass: 'name'
      });
    };
    const reviewInput = this._reviewInput();
    reviewInput.oninput = ({ target: { value } }) => {
      this._validate({
        value,
        element: reviewInput,
        preClass: 'review'
      });
    };
  }

  async _submitForm(element) {
    try {
      const name = this._nameValue();
      const review = this._reviewValue();
      if (name && review) {
        const id = this._restaurantId;
        const reviewData = { id, name, review };
        this._disableButton(element);
        const response = await this._post(restaurantApi.review, reviewData);
        if (response.error) {
          throw Error(response.message);
        } else if (!this._callback) {
          throw Error('please provide callback');
        } else {
          alert.success('Success', 'Review success');
          this._callback(response.customerReviews);
          this._resetForm();
          this._enableButton(element);
        }
        this._enableButton(element);
      }
    } catch (error) {
      this._enableButton(element);
      console.error('_submitForm', error.message);
      alert.error('Failed', 'Something went wrong.');
    }
  }

  async _post(url, data) {
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

  _disableButton(element) {
    element.setAttribute('disabled', true);
  }

  _enableButton(element) {
    element.removeAttribute('disabled');
  }

  _nameInput() {
    return document.querySelector('#name-input');
  }

  _nameValue() {
    const nameInput = this._nameInput();
    const name = nameInput.value || null;
    this._validate({
      element: nameInput,
      value: name,
      preClass: 'name'
    });
    return name;
  }

  _reviewInput() {
    return document.querySelector('#review-input');
  }

  _reviewValue() {
    const reviewInput = this._reviewInput();
    const review = reviewInput.value || null;
    this._validate({
      element: reviewInput,
      value: review,
      preClass: 'review'
    });
    return review;
  }

  _validate({ element, value, preClass }) {
    if (value) {
      this._error(element, preClass, '', 'remove');
    } else {
      const preRequiredMessage = preClass === 'name' ? 'Name' : 'Message';
      this._error(element, preClass, `${preRequiredMessage} is required`);
    }
  }

  _error(element, preClass, message = '', action = 'add') {
    element.classList[action]('error-input');
    this._errorMessage(`${preClass}-error`, message);
  }

  _errorMessage(errorId, message) {
    const errorContainer = document.querySelector(`.${errorId}`);
    errorContainer.innerHTML = message;
  }

  _resetForm() {
    this._nameInput().value = null;
    this._reviewInput().value = null;
  }
}

customElements.define('review-form', ReviewForm);
