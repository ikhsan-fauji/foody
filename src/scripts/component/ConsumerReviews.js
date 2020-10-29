class ConsumerReviews extends HTMLElement {
  constructor() {
    super();
  }

  set reviews(reviews = []) {
    this._reviews = reviews;
    this.render();
  }

  _reviewsTemplate() {
    let template = `<ul class="reviews">`;

    this._reviews.forEach((reviewDetail) => {
      const { name, date, review } = reviewDetail;
      template += `
        <li class="review-item">
          <h4 class="reviewer">${name || 'User****'}</h4>
          <i class="review-date">${date || ''}</i>
          <p class="review-detail">${review || ''}</p>
        </li>
      `;
    });

    template += `</ul>`;
    return template;
  }

  render() {
    this.innerHTML = this._reviewsTemplate();
  }
}

customElements.define('consumer-reviews', ConsumerReviews);
