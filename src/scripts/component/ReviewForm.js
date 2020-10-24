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
      this._submitForm();
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
