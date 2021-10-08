
import React, { useState, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (urlPrames) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({show: false, msg: ''});
    const [data, setData] = useState([]);

    
  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json(); 

      if ( data.Response === 'True' ) {
          setData(data.Search || data);
          setError({show: false, msg: ''});
      } else {
        setError({show: true, msg: data.Error});
      }
      setLoading(false)
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlPrames}`);
  }, [urlPrames])

    return  {loading, error, data}
}

export default useFetch;