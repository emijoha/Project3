import React, { useContext, useState } from 'react';
import { Jumbotron, Container, Row, Col, CardColumns } from 'react-bootstrap';
import NotLoggedIn from '../../components/NotLoggedIn';
import SavedCards from '../../components/SavedCards';
import SavedIconLinks from '../../components/SavedIconLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBookOpen, faGamepad, faMusic, faAsterisk, faSearch } from '@fortawesome/free-solid-svg-icons';
// import context for global state
import UserInfoContext from '../../utils/UserInfoContext';

import * as API from '../../utils/API';
import AuthService from '../../utils/auth';
import './style.css';

function SavedBooks() {
  const [reviewInput, setReviewInput] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  // set state to activate review form
  const [selectedMediaReview, setSelectedMediaReview] = useState('');
  const [selectedMediaRating, setSelectedMediaRating] = useState(0);


  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  const startReview = (media) => {

    setSelectedMediaReview(media);
  }

  const handleReviewFormSubmit = (event) => {
    event.preventDefault();

    saveUserReview();
  }

  const makeFavorite = (media) => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let isFavorite;

    if (media.userFavorite === true) {
      isFavorite = false;
    } else {
      isFavorite = true;
    }

    let updateCriteria = {
      type: media.mediaType,
      id: media._id,
      favorite: isFavorite
    }

    API.makeFavorite(updateCriteria, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  const saveUserReview = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      type: selectedMediaReview.mediaType,
      id: selectedMediaReview._id,
      review: reviewInput
    }

    API.saveUserReview(updateCriteria, token)
      .then(() => setReviewInput(''))
      .then(() => setSelectedMediaReview(''))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  const startRating = (book) => {

    setSelectedMediaRating(book);
  }

  const handleRatingFormSubmit = (event) => {
    event.preventDefault();

    saveUserRating();
  }

  const saveUserRating = () => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    let updateCriteria = {
      type: selectedMediaRating.mediaType,
      id: selectedMediaRating._id,
      userRating: userRating
    }

    API.saveUserRating(updateCriteria, token)
      .then(() => setUserRating(0))
      .then(() => setSelectedMediaRating(0))
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (book_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    API.deleteThisMedia(book_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    API.deleteBook(book_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={0} s={0} md={1} lg={2}></Col>
          <Col id='search-wrap' xs={12} s={12} md={10} lg={8}>
            <div id="sub-container" >
              <div id="header-div">
                <h5 className="text-center" id="media-header">MY BOOKS</h5>
                <SavedIconLinks userData={userData}></SavedIconLinks>
              </div>
            </div>
          </Col>
          <Col xs={0} s={0} md={1} lg={2}></Col>
        </Row>
        <hr></hr>
      </Container>
      <Container>
        <a className='muted-subtext' id='neon-hover' href='/search_books'>
          <div className="empty-message">
            Add books to your collection
            <FontAwesomeIcon
              className='search-icon-media'
              icon={faSearch}
            />
          </div>
        </a>
        <CardColumns>
          <SavedCards
            cardType='savedBooks'
            savedArray={userData.savedBooks}
            username={userData.username}
            userData={userData}
            startRating={startRating}
            selectedMediaRating={selectedMediaRating}
            handleRatingFormSubmit={handleRatingFormSubmit}
            setUserRating={setUserRating}
            setHover={setHover}
            hover={hover}
            userRating={userRating}
            startReview={startReview}
            selectedMediaReview={selectedMediaReview}
            handleReviewFormSubmit={handleReviewFormSubmit}
            reviewInput={reviewInput}
            setReviewInput={setReviewInput}
            handleDeleteBook={handleDeleteBook}
            makeFavorite={makeFavorite}
            comments={userData.savedBooks.comments}
          />
          {/* ITS BUGGY */}
          {/* {!userData.username
          ? <NotLoggedIn />
          : null
          } */}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedBooks;