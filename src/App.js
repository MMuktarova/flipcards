import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from "nanoid";
import './App.css';

const mainUrl = 'https://api.unsplash.com/photos'
const key = '67dzJ6HsOJ0oE9moFGN9_AGJ-de6jwkL-CAULtu3QWg'

//https://api.unsplash.com/photos//?client_id=67dzJ6HsOJ0oE9moFGN9_AGJ-de6jwkL-CAULtu3QWg&page=3

const App = () => {

  const [listOfImages, setListOfImages] = useState([]);
  const [loading, setLoading] = useState('Loading...');
  const [selected, setSelected] = useState(null);
  const [click, setClick] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [reset, setReset] = useState(false);

  
  
  const handleFetching = () => {
    const url1 = `${mainUrl}/?client_id=${key}&page=${3}`;
    const url2 = `${mainUrl}/?client_id=${key}&page=${4}`;

    axios.all([axios.get(url1), axios.get(url2)]).then(([page1, page2]) => {
     // console.log(page1.data, page2.data);
      
      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2),
      ];
      
      data = data.map((item) => {
        return { ...item, uniqueId: nanoid() };
      });

      data = shuffle(data);
      //console.log(data)
      setListOfImages(data);
    })
    .catch ((err) => {
      console.log(err)
    })
  };

  const shuffle = (array) => {
    for (let i = 0; i < array.length; i++){
      let temp = Math.floor(Math.random() * array.length);
      let curr = array[temp];
      array[temp] = array[i];
      array[i] = curr;
    }
    return array;
  }
  
  useEffect(() => {
    handleFetching();
  },[])



  return (
    <>
      <div className="App">
        {listOfImages.map((item) => {
          return (
            <div className='single-card'>
              <img src={item.urls.thumb} alt={item.alt_description} />
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
