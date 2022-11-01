import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  margin : 0px 0px 10px 0px;
  gap:24px;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 400px;
`;

const MovieName = styled.span`
font-size : 18px;
font-weight:600;
color:black;
margin:5px 0px  0px 0px;
white-space: nowrap;
text-overflow: ellipsis;
overflow : hidden;
`;

const InfoColumn = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`

const MovieInfo = styled.span`
font-size:16px;
font-weight:500;
color:black;
text-transform:capitalize;
`;

function MoviComponent(props) {
    console.log(props);
  return (
    <>
      <MovieContainer onClick={()=>props.onMovieSelect(props.movie.imdbID)}>
        {" "}
        <CoverImage src={props.movie.Poster}/>
        <MovieName>{props.movie.Title}</MovieName>
        <InfoColumn>
            <MovieInfo>{props.movie.Year}</MovieInfo>
            <MovieInfo>{props.movie.Type}</MovieInfo>
        </InfoColumn>
        
      </MovieContainer>
    </>
  );
}

export default MoviComponent;