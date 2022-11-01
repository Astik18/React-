import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
const API_KEY = '3746563d';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto auto 15px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

function MovieInfoComponent(props) {

    const[movieInfo , setMovieInfo] = useState();
    const{selectedMovie} = props;

    useEffect(()=>{
        Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`).then((response)=>{
            console.log(response);
            console.log('hellow');
            setMovieInfo(response);
        })
    },[selectedMovie])

    console.log(props);
    console.log("Movie Info" + movieInfo);
  return (
    <>
      <Container>
        {
          movieInfo ? 
          <>
            <CoverImage src={movieInfo.data.Poster} />
              <InfoColumn>
                <MovieName>Movie : {movieInfo.data.Title}</MovieName>
                <MovieInfo>IMBD Rating : <span>{movieInfo.data.imdbRating}</span></MovieInfo>
                <MovieInfo>Year : <span>{movieInfo.data.Year}</span></MovieInfo>
                <MovieInfo>Language : <span>{movieInfo.data.Language}</span></MovieInfo>
                <MovieInfo>Awards : <span>{movieInfo.data.Awards}</span></MovieInfo>
                <MovieInfo>Country : <span>{movieInfo.data.Country}</span></MovieInfo>
                <MovieInfo>Runtime : <span>{movieInfo.data.Runtime}</span></MovieInfo>
                <MovieInfo>Genre : <span>{movieInfo.data.Genre}</span></MovieInfo>
                <MovieInfo>Director : <span>{movieInfo.data.Director}</span></MovieInfo>
                <MovieInfo>Type : <span>{movieInfo.data.Type}</span></MovieInfo>
                <MovieInfo>Writer : <span>{movieInfo.data.Writer}</span></MovieInfo>
                <MovieInfo>Plot : <span>{movieInfo.data.Plot}</span></MovieInfo>
              </InfoColumn>
              <Close onClick={()=>props.onMovieSelect()} >X</Close>
          </> : <MovieInfo>"Loading...."</MovieInfo>
        }
      </Container>
    </>
  )
}

export default MovieInfoComponent