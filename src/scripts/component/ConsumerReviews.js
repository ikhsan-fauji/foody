class ConsumerReviews extends HTMLElement {
  constructor() {
    super();
  }

  _reviewsTemplate(reviews) {
    let template = `<ul class="reviews">`;

    if (reviews.length > 0) {
      reviews.forEach((reviewDetail) => {
        const { name, date, review } = reviewDetail;
        template += `
          <li class="review-item">
            <h4 class="reviewer">${name || 'User****'}</h4>
            <i class="review-date">${date || ''}</i>
            <p class="review-detail">${review || ''}</p>
          </li>
        `;
      });
    } else {
      template += `
        <li class="review-item">
          <span>No Reviews</span>
        </li>
        `;
    }

    template += `</ul>`;
    return template;
  }

  set reviews(reviews = []) {
    this._reviews = reviews;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this._reviewsTemplate(this._reviews);
  }
}

customElements.define('consumer-reviews', ConsumerReviews);
