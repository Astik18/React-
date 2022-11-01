import MoviComponent from "./Component/MoviComponent";
import MovieInfoComponent from "./Component/MovieInfoComponent";
import styled from "styled-components";
import './index.css'
import { useState} from "react";
import Axios from "axios";
const API_KEY = '3746563d';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  background-color: black;
  color: white;
  padding: 10px;
  // padding-left:20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px #555;
  width: 100vw;
`;

const AppName = styled.div`
  display: flex;
  flex-display: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  heigth: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-display: row;
  background-color: white;
  padding: 10px 10px;
  margin: 10px;
  border-radius: 6px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MoviListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
width:120px;
height:120px;
margin:150px;
opacity:50%;
`

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [defaultMovieList, setDefaultMovieList] = useState([]);
  const[movieList , updatedMovieList] = useState([]);
  const[selectedMovie ,updateselectedMovie ] = useState();


  const FetchData = async(searchString)=>{
    const response= await Axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    // console.log(response.data.Search);
    updatedMovieList(response.data.Search);
    if (!defaultMovieList.length) {
      setDefaultMovieList([...movieList]);
    }

  }

  const onTextChange = (event) => {
    
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    if (event.target.value !== "") {
      const timeout = setTimeout(() => FetchData(event.target.value), 500);
      updateTimeoutId(timeout);
    } else {
      updatedMovieList(defaultMovieList);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <AppName>
            <MovieImage src="/movie-icon.svg" />
            Movie App
          </AppName>
          <SearchBox>
            <SearchIcon src="/search-icon.svg" />
            <SearchInput
              placeholder="Search Movies"
              onChange={onTextChange}
              value={searchQuery}
            />
          </SearchBox>
        </Header>
        {selectedMovie ? <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={updateselectedMovie} /> :null}
        <MoviListContainer>
          {
            movieList?.length?movieList.map((movieList , index)=><MoviComponent key={index} movie={movieList} onMovieSelect={updateselectedMovie} />): <Placeholder src="/movie-icon.svg"/>
          }
          {/* <MoviComponent /> */}
          
        </MoviListContainer>
      </Container>
    </>
  );
}

export default App;