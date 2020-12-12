const likeButtonTemplate = () => `
  <button id="like-button" class="like" aria-label="like this restaurant">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const unLikeButtonTemplate = () => `
  <button id="un-like-button" class="like" aria-label="unlike this restaurant">
     <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { likeButtonTemplate, unLikeButtonTemplate };
