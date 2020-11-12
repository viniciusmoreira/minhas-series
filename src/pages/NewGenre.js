import React, { useState, useCallback } from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';

const NewGenre = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChangeName = useCallback((evt) => {
    setName(evt.target.value)
  }, [])

  const save = useCallback(() => {
    api.post('/api/genres', {
      name
    })
      .then(res => {
        setSuccess(true)
      })
  }, [name])

  if(success) {
    return (
      <Redirect to="/genres"/>
    )
  }

  return (
    <div className="container">
      <h1>New Genre</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Name of genre" value={name} onChange={onChangeName}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>Save</button>
      </form>
    </div>
  )
}

export default NewGenre;