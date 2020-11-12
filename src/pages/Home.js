import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get('api')
      .then(res => {
        setData(res.data);
      })
  }, []);
  
  return (
    <div>
      Home
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default Home;