import restaurantApi from '../globals/api';
import request from '../helper/request-helper';
import alert from '../helper/alert-helper';

class ReviewForm extends HTMLElement {
  constructor() {
    super();
  }

  _formTemplate() {
    return `
      <form action="#" class="review-form">
        <div class="form-input">
          <input id="name-input" type="text" placeholder="Name" />
        </div>
        <div class="form-input">
          <textarea id="review-input" rows="3" placeholder="Message"></textarea>
        </div>
        <button type="button" class="btn-submit btn-primary">
          Submit
        </button>
        <div id="error-message"></div>
      </form>
    `;
  }

  _validateMessage(message) {
    const reviewForm = document.querySelector('#error-message');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    reviewForm.appendChild(messageElement);
  }

  _nameValue() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value || null;
    if (!name) this._validateMessage('Name is required');
    return name;
  }

  _reviewValue() {
    const reviewInput = document.querySelector('#review-input');
    const review = reviewInput.value || null;
    if (!review) this._validateMessage('Message is required');
    return review;
  }

  _resetErrorMessage() {
    const reviewForm = document.querySelector('#error-message');
    reviewForm.innerHTML = '';
  }

  _resetForm() {
    document.querySelector('#name-input').value = null;
    document.querySelector('#review-input').value = null;
  }

  set afterSubmitted(callback) {
    this._callback = callback;
  }

  set restaurantId(restaurantId) {
    this._restaurantId = restaurantId;
  }

  async _submitForm() {
    try {
      this._resetErrorMessage();
      const name = this._nameValue();
      const review = this._reviewValue();
      if (name && review) {
        const id = this._restaurantId;
        const reviewData = { id, name, review };
        const response = await request.post(restaurantApi.review, reviewData);
        if (response.error) {
          throw Error(response.message);
        } else if (this._callback) {
          alert.success('Success', 'Review success');
          this._callback(response.customerReviews);
          this._resetForm();
        } else {
          throw Error('please provide callback');
        }
      }
    } catch (error) {
      console.error(error.message);
      alert.error('Failed', error.message);
    }
  }

  _submitEvent() {
    const submitButton = document.querySelector('.btn-submit');
    submitButton.addEventListener('click', (event) => {
      this._submitForm();
      event.stopPropagation();
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
  }

  connectedCallback() {
    this.render().then(() => {
      this.afterRendered();
    });
  }
}

customElements.define('review-form', ReviewForm);
