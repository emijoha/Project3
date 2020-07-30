const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  searchAllUsers,
  getSingleUser,
  saveBook,
  saveGame,
  deleteBook,
  deleteGame,
  savePicture,
  saveUserBio,
  saveFriend,
  saveLike,
  deleteFriend,
  saveMusic,
  deleteMusic,
  saveMovie,
  deleteMovie,
  login,
  addBookLike,
  addMusicLike,
  addMovieLike,
  addGameLike,
  addBookComment,
  addMovieComment,
  addMusicComment,
  addGameComment,
  saveUserReview,
  saveUserRating,
  addNotification,
  deleteNotification,
  makeFavorite,
  deleteMedia,
  getBook,
  getGame,
  getMovie,
  getMusic,
  saveChat,
  saveMessage,
  getMedia,
  deleteThisMedia
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
const auth = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/signup').get(getAllUsers).post(createUser);

router.route('/books').get(getAllUsers).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/search-all/:anyname').get(searchAllUsers);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:id').get(getSingleUser);

router.route('/find/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook).put(addBookLike).get(getBook);

router.route('/games').get(getAllUsers).post(createUser).put(authMiddleware, saveGame);

router.route('/games/:id').delete(authMiddleware, deleteGame).put(addGameLike).get(getGame);

router.route('/music/:id').delete(authMiddleware, deleteMusic).put(addMusicLike).get(getMusic);

router.route('/movies/:id').delete(authMiddleware, deleteMovie).put(addMovieLike).get(getMovie);

router.route('/media/:type/:id').delete(authMiddleware, deleteMedia);

router.route('/music').get(getAllUsers).put(authMiddleware, saveMusic);

router.route('/picture').get(getAllUsers).put(authMiddleware, savePicture);

router.route('/user-bio').get(getAllUsers).put(authMiddleware, saveUserBio);

router.route('/movies').get(getAllUsers).put(authMiddleware, saveMovie);

router.route('/user-review').get(getAllUsers).put(authMiddleware, saveUserReview);

router.route('/user-rating').get(getAllUsers).put(authMiddleware, saveUserRating);

router.route('/likes').get(getAllUsers).put(authMiddleware, saveLike);

router.route('/friends').put(authMiddleware, saveFriend);

router.route('/friends/:id').delete(authMiddleware, deleteFriend);

router.route('/notifications').put(addNotification);

router.route('/notifications/:id').delete(deleteNotification);

router.route('/books/comments/:id').put(addBookComment);

router.route('/games/comments/:id').put(addGameComment);

router.route('/music/comments/:id').put(addMusicComment);

router.route('/movies/comments/:id').put(addMovieComment);

router.route('/chats').get(getAllUsers).put(saveChat);

router.route('/make-favorite').get(getAllUsers).put(authMiddleware, makeFavorite);

router.route('/messages').get(getAllUsers).put(saveMessage);

router.route('/all-media/:id').delete(deleteThisMedia).get(getMedia);



module.exports = router;
