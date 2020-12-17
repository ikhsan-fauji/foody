const likeButtonTemplate = () => `
  <button id="like-button" class="like" aria-label="like this restaurant">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const dislikeButtonTemplate = () => `
  <button id="dislike-button" class="like" aria-label="dislike this restaurant">
     <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { likeButtonTemplate, dislikeButtonTemplate };
