import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { fetchMovieTrailer } from "../services/api";
import "./MovieCard.css";

export default function MovieCard({ movie, genreListMovieList: genres }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [trailerError, setTrailerError] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setVideoId(null);
    setTrailerError(false);
  };

  const openModal = async (movieId) => {
    setModalOpen(true);
    setTrailerError(false);
    try {
      const key = await fetchMovieTrailer(movieId);
      if (key) {
        setVideoId(key);
      } else {
        setTrailerError(true);
      }
    } catch {
      setTrailerError(true);
    }
  };

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="mt-5">
      <Card className="mt-5 container imgSize titleLine">
        <Card.Img className="hoverImg" variant="top" src={posterSrc} />

        <Card.ImgOverlay
          className={`hiddenContent pb-0 ${showOverlay ? "showOverlay" : ""}`}
        >
          <Card.Title className="font-weight-bolder">{movie.title}</Card.Title>
          <Card.Text className="font-weight-lighter">
            {movie.genre_ids.map((id) => {
              const found = genres.find((genre) => id === genre.id);
              return (
                <Badge key={id} className="mr-2" variant="danger">
                  {found ? found.name : "Unknown"}
                </Badge>
              );
            })}
          </Card.Text>
          <Card.Text className="description">{movie.overview}</Card.Text>
        </Card.ImgOverlay>

        <Card.Body>
          <div className="d-flex justify-content-around align-baseline">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name={`rating-${movie.id}`}
                value={movie.vote_average / 2}
                readOnly
              />
            </Box>
            <Card.Text>{(movie.vote_average / 2).toFixed(1)}</Card.Text>
          </div>
          <Button
            className="float-left"
            onClick={() => openModal(movie.id)}
            variant="outline-danger"
          >
            Trailer
          </Button>
          <Button
            className="float-right"
            variant="outline-danger"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            Description
          </Button>
        </Card.Body>
      </Card>

      <ReactModal
        className="ml-5"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
          },
          content: {
            position: "absolute",
            top: "85px",
            left: "45px",
            right: "30px",
            bottom: "0px",
            border: "1px solid #000",
            background: "#000",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "0px",
          },
        }}
        isOpen={modalOpen}
      >
        <div className="d-flex align-baseline modalBox">
          {trailerError ? (
            <div className="col-9 d-flex align-items-center justify-content-center">
              <h3 style={{ color: "white" }}>Trailer unavailable</h3>
            </div>
          ) : (
            <YouTube
              width="100%"
              height="85%"
              className="col-9"
              video={videoId}
              autoplay
            />
          )}
          <div className="col-3 align-baseline">
            <div className="align-bottom">
              <Button
                className="float-right"
                variant="outline-danger"
                onClick={closeModal}
              >
                x
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
