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
          <span class="name-error"></span>
        </div>
        <div class="form-input">
          <textarea id="review-input" rows="3" placeholder="Message"></textarea>
          <span class="review-error"></span>
        </div>
        <button type="button" class="btn-submit btn-primary">
          Submit
        </button>
      </form>
    `;
  }

  _validateMessage(errorId, message) {
    const errorContainer = document.querySelector(`.${errorId}`);
    errorContainer.innerHTML = message;
  }

  _nameValue() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value || null;
    if (!name) {
      nameInput.classList.add('error-input');
      this._validateMessage('name-error', 'Name is required');
    } else {
      nameInput.classList.remove('error-input');
      this._validateMessage('name-error', '');
    }
    return name;
  }

  _reviewValue() {
    const reviewInput = document.querySelector('#review-input');
    const review = reviewInput.value || null;
    if (!review) {
      reviewInput.classList.add('error-input');
      this._validateMessage('review-error', 'Message is required');
    } else {
      reviewInput.classList.remove('error-input');
      this._validateMessage('review-error', '');
    }
    return review;
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

  _onInputForm() {
    const nameInput = document.querySelector('#name-input');
    nameInput.oninput = ({ target: { value } }) => {
      if (value) {
        nameInput.classList.remove('error-input');
        this._validateMessage('name-error', '');
      } else {
        nameInput.classList.add('error-input');
        this._validateMessage('name-error', 'Name is required');
      }
    };
    const reviewInput = document.querySelector('#review-input');
    reviewInput.oninput = ({ target: { value } }) => {
      if (value) {
        reviewInput.classList.remove('error-input');
        this._validateMessage('review-error', '');
      } else {
        reviewInput.classList.add('error-input');
        this._validateMessage('review-error', 'Message is required');
      }
    };
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

  connectedCallback() {
    this.render().then(() => {
      this.afterRendered();
    });
  }
}

customElements.define('review-form', ReviewForm);
