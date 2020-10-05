const likeButtonTemplate = () => `
  <button id="like-button" class="like" aria-label="like this restaurant">
     <span class="material-icons" aria-hidden="true">favorite_border</span>
  </button>
`;

const unLikeButtonTemplate = () => `
  <button id="un-like-button" class="like" aria-label="unlike this restaurant">
     <span class="material-icons" aria-hidden="true">favorite</span>
  </button>
`;

export { likeButtonTemplate, unLikeButtonTemplate };
