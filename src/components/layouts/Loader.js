import React from 'react';
import LoadingGif from '../../images/loader.gif';

const Loader = () => {
    return (
        <div className="loading-gif">
            <img src={LoadingGif} alt=""/>
        </div>
    )
}

export default Loader;
