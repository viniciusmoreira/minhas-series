import React, { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');

  useEffect(() => {
    api.get(`/api/series/${match.params.id}`)
      .then(res => {
        setData( res.data )
        setForm( res.data )
      })
    
      api.get("/api/genres")
        .then(res => {
          setGenres(res.data.data)
        })
  },[match.params.id])

  const save = useCallback(() => {
    api.put(`/api/series/${match.params.id}`, form)
      .then(res => {
        setSuccess(true)
      })
  }, [form, match.params.id])

  const onEditMode = useCallback(() => {
    setMode('EDIT');
  }, [])

  const onCancelMode = useCallback(() => {
    setMode('INFO');
  }, [])

  const onHandleChange = useCallback((evt) => {
    setForm(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value
    }))
  }, [])

  const onHandleSelect = useCallback((value) => () => {
    setForm(prevState => ({
      ...prevState,
      status: value
    }))
  },[])

  if(success) {
    return (
      <Redirect to="/series"/>
    )
  }

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url(${data.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div>
      <header style={masterHeader} >
        <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }} >
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img className="img-fluid img-thumbnail" alt={data.name} src={data.poster} />
              </div>
              <div className="col-9">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  { data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge> }
                  { data.status === 'PARA_ASSISTIR' && <Badge color="warning">Para assistir</Badge> }
                  Genêro: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button onClick={onEditMode} className="btn btn-warning">Edit</button>
      </div>
      {
        mode === 'EDIT' && 
        <div className="container">
          <h1>Update Serie</h1>
          <button onClick={onCancelMode} className="btn btn-danger">Cancel edition</button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Name of serie" value={form.name || ''} onChange={onHandleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <input type="text" className="form-control" name="comments" id="comments" placeholder="Comments" value={form.comments || ''} onChange={onHandleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="genre_id">Genre</label>
              <select className="form-control" name="genre_id" id="genre_id" value={form.genre_id || ''} onChange={onHandleChange}>
                { !data.genre_id && <option value="" style={{display:'none'}}></option> }
                { genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>) }
              </select>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" onChange={onHandleSelect('ASSISTIDO')} checked={form.status === 'ASSISTIDO'} />
              <label className="form-check-label" htmlFor="assistido">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" onChange={onHandleSelect('PARA_ASSISTIR')} checked={form.status === 'PARA_ASSISTIR'}/>
              <label className="form-check-label" htmlFor="paraAssistir">
                Para assistir
              </label>
            </div>

            <button type="button" className="btn btn-success" onClick={save}>Save</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie;