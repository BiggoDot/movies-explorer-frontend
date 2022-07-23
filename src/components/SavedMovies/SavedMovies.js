import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/cards";
import '../Movies/Movies.css';


const SavedMovies = () => {
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList cards={cards}/>
        </main>
    );
};

export default SavedMovies;
