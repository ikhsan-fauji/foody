class ConsumerReviews extends HTMLElement {
  constructor() {
    super();
  }

  _reviewsTemplate(reviews) {
    let template = `<div class="reviews">`;

    if (reviews.length > 0) {
      reviews.forEach((reviewDetail) => {
        const { name, date, review } = reviewDetail;
        template += `
          <article class="review-item">
            <h3 class="reviewer">${name || 'User****'}</h3>
            <i class="review-date">${date || ''}</i>
            <p class="review-detail">${review || ''}</p>
          </article>
        `;
      });
    } else {
      template += `
        <article class="review-item">
          <span>No Reviews</span>
        </article>
        `;
    }

    template += `</div>`;
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
