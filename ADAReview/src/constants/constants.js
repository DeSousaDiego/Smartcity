export const IMAGE_IP = "http://192.168.0.42:3001/images/";
export const AVATAR_IP = "http://192.168.0.42:3001/avatars/";
export const IP = "http://192.168.0.42:3001/";

// actions.js
export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const addLike = (reviewId) => ({
  type: ADD_LIKE,
  reviewId,
});

export const removeLike = (reviewId) => ({
  type: REMOVE_LIKE,
  reviewId,
});