import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Form, Col } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import ReactAudioPlayer from 'react-audio-player';

function SavedCards(props) {

    if (props.cardType === 'savedBooks') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'book' : 'books'}:`
                        : 'You have no saved books!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((book) => {
                        return (

                            <Card className='mediaCard' key={book._id} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteBook(book._id)}>
                                        Delete this Book!
                                    </Button>
                                </Card.Body>
                            </Card>

                        );
                    })}
                </CardColumns>
            </>
        );
    } else if (props.cardType === 'savedMusic') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved in music:`
                        : 'You have no saved music!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((music) => {
                        return (

                            <Card className='mediaCard' key={music._id} border='dark'>
                                {music.image ? <Card.Img src={music.image} alt={`The cover for ${music.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{music.title}</Card.Title>
                                    <p className='small'>Artist: {music.artist}</p>
                                    <ReactAudioPlayer
                                        src={music.preview}
                                        controls
                                    />
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMusic(music._id)}>
                                        Delete!
                                    </Button>
                                </Card.Body>
                            </Card>

                        );
                    })}
                </CardColumns>
            </>
        );
        // simple move card, couldn't figure out movie review. 
        // savedMovies page does not currently use this component, left it as is for now
        // ratings/review form shoudl be seperate component with its own state, with just bare necessities of props needed from savedMovies state/functionality
    } else if (props.cardType === 'savedMovies') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((movie) => {
                        return (
                            <Card key={movie.movieId} border='dark'>
                                {movie.image === 'N/A' ? null : <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />}
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    {movie.released === 'N/A' ? null : <p className='small'>Released: {movie.released}</p>}
                                    {movie.actors === 'N/A' ? null : <p className='small'>Actors: {movie.actors}</p>}
                                    {movie.director === 'N/A' ? null : <p className='small'>Director: {movie.director}</p>}
                                    {movie.genre === 'N/A' ? null : <p className='small'>Genre: {movie.genre}</p>}
                                    {movie.plot === 'N/A' ? null : <p className='small'>Plot: {movie.plot}</p>}
                                    {movie.rated === 'N/A' ? null : <p className='small'>Rated: {movie.rated}</p>}
                                    {movie.runtime === 'N/A' ? null : <p className='small'>Runtime: {movie.runtime}</p>}
                                    <p className='bold'>Your Rating:
                      {[...Array(movie.userRating)].map((star, i) => {
                                        return (
                                            <label key={i}>
                                                <FaVideo className='read-only-star' color='black' size={25} />
                                            </label>
                                        )
                                    })}
                                    </p>
                                    <p className='bold'>Your Review: {movie.movieReview}</p>

                                    <br></br>

                                    {props.username && (
                                        <>
                                            {(movie.userRating === 0) ?
                                                <Button className='btn-block btn-success' onClick={() => props.startRating({ movie })}  >
                                                    Rate this Movie!
                            </Button>

                                                :

                                                <Button className='btn-block btn-success' onClick={() => props.startRating({ movie })}  >
                                                    Update your Rating?
                            </Button>
                                            }
                                        </>
                                    )}

                                    {props.selectedMovieRating._id && (
                                        <>
                                            {movie._id === props.selectedMovieRating._id
                                                ?
                                                <Form onSubmit={props.handleRatingFormSubmit}>
                                                    {[...Array(5)].map((star, i) => {
                                                        const ratingValue = i + 1;
                                                        return (
                                                            <label key={i}>
                                                                <input type='radio' name='rating'
                                                                    value={i} onClick={() => props.setUserRating(ratingValue)} />
                                                                <FaVideo key={ratingValue} className='star' onMouseEnter={() => props.setHover(ratingValue)}
                                                                    onMouseLeave={() => props.setHover(null)} color={ratingValue <= (props.hover || props.userRating) ? 'black' : '#e4e5e9'} size={25} />
                                                            </label>
                                                        )
                                                    })}

                                                    <Col>
                                                        <Button type='submit' variant='success' size='md'>
                                                            Submit Rating
                                                        </Button>
                                                    </Col>
                                                </Form>
                                                : null
                                            }
                                        </>

                                    )}

                                    {props.username && (
                                        <>
                                            {(movie.movieReview === '') ?
                                                <Button className='btn-block btn-success' onClick={() => props.startReview({ movie })}  >
                                                    Review this Movie!
                            </Button>

                                                :

                                                <Button className='btn-block btn-success' onClick={() => props.startReview({ movie })}  >
                                                    Update your Review?
                            </Button>
                                            }
                                        </>
                                    )}

                                    {props.selectedMovieReview._id && (
                                        <>
                                            {movie._id === props.selectedMovieReview._id
                                                ?
                                                <Form onSubmit={props.handleReviewFormSubmit}>
                                                    <Col>
                                                        <Form.Control
                                                            name='reviewInput'
                                                            value={props.reviewInput}
                                                            onChange={(e) => props.setReviewInput(e.target.value)}
                                                            type='text'
                                                            size='md'
                                                            as='textarea'
                                                            rows='6'
                                                            placeholder='Review this movie'
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Button type='submit' variant='success' size='md'>
                                                            Submit Review
                                                        </Button>
                                                    </Col>
                                                </Form>

                                                : null
                                            }
                                        </>
                                    )}

                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteMovie(movie._id)}>
                                        Delete this Movie!
                      </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else if (props.cardType === 'savedGames') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'video game' : 'video games'}:`
                        : 'You have no saved video games!'}
                </h2>
                <CardColumns>
                    {props.savedArray.map((game) => {
                        return (

                            <Card className='mediaCard' key={game._id} border='dark'>
                                {game.image ? <Card.Img src={game.image} alt={`The image for ${game.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{game.title}</Card.Title>
                                    <p className='small'>Developer: {game.developer}</p>
                                    <Card.Text>{game.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteGame(game._id)}>
                                        Delete this Game!
                                    </Button>
                                </Card.Body>
                            </Card>

                        );
                    })}
                </CardColumns>
            </>
        );
    } else if (props.cardType === 'savedFriends') {
        return (
            <>
                <h2>
                    {props.savedArray.length
                        ? `Viewing ${props.savedArray.length} saved ${props.savedArray.length === 1 ? 'friend' : 'friends'}:`
                        : 'You have no friends!'}
                    {console.log("hey there im in the header", props.savedArray)}
                </h2>
                <CardColumns>
                    {props.savedArray.map(friend => {
                        console.log("this is my friend, ", friend)
                        return (

                            <Card className='mediaCard' key={friend._id} border='dark'>
                                {friend.picture ? <Card.Img src={friend.picture} alt={friend.username} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{friend.username}</Card.Title>
                                    <p className='small'>Email: {friend.email}</p>
                                    <Button className='btn-block btn-danger' onClick={() => props.handleDeleteFriend(friend._id)}>
                                        Remove Friend
                                    </Button>
                                </Card.Body>
                            </Card>

                        );
                    })
                    }
                </CardColumns>
            </>
        );
    }

}

export default SavedCards;