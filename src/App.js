import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import Notes from './Notes'
import Folders from './Folders'
import NotePage from './notePage'
import Folder from './Folder'
import DataContext from './dataContext'


class App extends Component {
    state = {
      notes: [],
      folders: []
    }
  
  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };
  
  componentDidMount() {
    Promise.all(
      [fetch('http://localhost:9090/notes'), fetch('http://localhost:9090/folders')]
    )
      .then(([notesData, foldersData]) => {
        if (!notesData.ok)
          return notesData.json().then(e => Promise.reject(e));
        if (!foldersData.ok)
          return foldersData.json().then(e => Promise.reject(e));
        
        return Promise.all([notesData.json(), foldersData.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.log({error})
      })
  }
  
  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }
    return (
      <div className='App'>
        <DataContext.Provider value={contextValue}>
          <header>
            <Link to='/'>
              <h1>Noteful</h1>
            </Link>
          </header>
          <section className='container'>
            <nav className='nav'>
              <Route exact path='/' component={Folders}/>
              <Route path='/folder/:folderId' component={Folders}/>
              <Route path='/note/:noteId' component={Folder}/>
            </nav>
            <main className='main'>
              <Route exact path='/' component={Notes}/>
              <Route path='/folder/:folderId' component={Notes}/>
              <Route path='/note/:noteId' component={NotePage}/>
            </main>
          </section>
        </DataContext.Provider>
      </div>
    );
  }
}

export default App;
