import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Redux Hooks & Actions
import { useSelector, useDispatch } from 'react-redux';
import { getNowPlaying, clearNowPlaying } from '../../actions/index'; // Our Action is in the props

// Child Components
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const NowPlaying = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);

    const nowPlaying = useSelector(state => state.nowPlaying);
    const dispatch = useDispatch();

     useEffect( () => {
        getNowPlaying(dispatch, currentPage);

        return () => clearNowPlaying(dispatch);
    }, [dispatch, currentPage]);

    const changePage = useCallback((page) => setCurrentPage(page), [setCurrentPage]);
    const handleToggle = useCallback(() => setToggle(!toggle), [toggle, setToggle]);

    if(nowPlaying.movies === null || nowPlaying.loading === true){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }

    const { results, total_results, total_pages } = nowPlaying.movies;
    return (
        <>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar thePage={"nowPlaying"} toggle={toggle} setToggle={handleToggle} />
                </div>
                <div className={!toggle ? "discover-container" : "discover-container full"}>
                    <div className="home-page">
                        <h2 className="page-title">Now Playing Movies</h2>
                        <div className="movies-list">
                            {results.map( (result) => (
                                <Link 
                                    className="single-movie-link" 
                                    key={result.id} 
                                    to={`/movie/${result.id}`}
                                    >
                                    <MovieBox movie={result} />
                                </Link>
                            ))}
                        </div>
                        <Pagination 
                            changePage={changePage} 
                            currentPage={currentPage}
                            moviesPerPage={20} 
                            totalMovies={total_results} 
                            totalPages={total_pages}
                            />
                    </div>
                </div>
            </div>
        </>
    )
};
export default NowPlaying;