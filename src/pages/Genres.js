import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Genres = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    api.get('/api/genres')
      .then(res => {
        setData(res.data.data);
      })
  }, []);

  const deleteItem = useCallback((id) => {
    api.delete(`/api/genres/${id}`)
      .then(res => {
        setData(prevState => prevState.filter(genre => genre.id !== id))
      })
  }, []);

  const renderItems = useCallback(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Remove</button>
          <Link className="btn btn-warning" to={`/genres/${item.id}`}>Update</Link>
        </td>
      </tr>
    )
  }, [deleteItem])

  if(data.length === 0){
    return (
      <div className="container">
        <h1>Genres</h1>
        <Link className="btn btn-primary" to="/genres/new">New</Link>
        <div className="alert alert-info" role="alert">
          Não há genêros para exibir!
        </div>
      </div>
    )
  }
  
  return (
    <div className="container">
      <h1>Genres</h1>
      <Link className="btn btn-primary" to="/genres/new">New</Link>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderItems)}
        </tbody>
      </table>
    </div>
  )
}

export default Genres;