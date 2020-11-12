import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Genres from './pages/Genres';
import NewGenre from './pages/NewGenre';
import UpdateGenre from './pages/UpdateGenre';
import Series from './pages/Series';
import NewSerie from './pages/NewSerie';
import InfoSerie from './pages/InfoSerie';
// Necessario para navegação.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* Sem o exact, o React carrega as duas rotas, por causa da barra */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/genres" exact component={Genres} />
          <Route path="/genres/new" exact component={NewGenre} />
          <Route path="/genres/:id" exact component={UpdateGenre} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/new" exact component={NewSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
