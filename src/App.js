import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const mainUrl = 'https://api.unsplash.com/photos'
const key = '67dzJ6HsOJ0oE9moFGN9_AGJ-de6jwkL-CAULtu3QWg'

//https://api.unsplash.com/photos//?client_id=67dzJ6HsOJ0oE9moFGN9_AGJ-de6jwkL-CAULtu3QWg&page=3

const App = () => {

  const [listOfImages, setListOfImages] = ([]);

  
  
  const handleFetching = () => {
    const url1 = `${mainUrl}/?client_id=${key}&page=${3}`;
    const url2 = `${mainUrl}/?client_id=${key}&page=${4}`;

    axios.all([axios.get(url1), axios.get(url2)]).then(([page1, page2]) => {
      console.log(page1.data, page2.data);
      
      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2),
      ];
      
      console.log(data)
      setListOfImages(data);
    });
  };
  
  useEffect(() => {
    handleFetching();
  },[])



  return (
    <>
      <div className="App">
        {listOfImages.map((item) => {
          return (
            <div className='single-card'>
              <img src="" alt="" />
            </div>
          );
        })}
     
    </div>
      <div id='click'>
        <span>Clicks</span>
        <span className='counter'>0</span>
        <button>Reset</button>
      </div>
      </>
  );
}

export default App;
