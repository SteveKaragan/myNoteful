import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import store from './store'
import Notes from './Notes'
import Folders from './Folders'
import NotePage from './notePage'
import Folder from './Folder'


class App extends Component {
    state = {
      notes: store.notes,
      folders: store.folders
    }
  
  
  render() {
    const { notes, folders } = this.state
    return (
      <div className='App'>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <section className='container'>
          <nav className='nav'>
            <Route exact path='/' render={() => 
              <Folders folders={folders}/>}
            />
            <Route path='/folder/:folderId' render={() => 
              <Folders folders={folders}/>}//need to highlight the chosen folder
            />
            <Route path='/note/:noteId' render={(routeProps) => {
              const noteId = routeProps.match.params.noteId;
              const note = notes.find(note => note.id === noteId);
              const folder = folders.find(folder => folder.id===note.folderId);
              return <Folder folder={folder} onClickBack={() => {routeProps.history.goBack('/')}}
              />}}
            />
          </nav>
          <main className='main'>
            <Route exact path='/' render={() => 
              <Notes notes={notes}/>}
            />
            <Route path='/folder/:folderId' render={(routeProps) => {
              const folderId = routeProps.match.params.folderId//help me understand where this comes from
              return (<Notes notes={notes.filter(note => note.folderId === folderId)}/>)}}
            />
            <Route path='/note/:noteId' render={(routeProps) => {
              const noteId = routeProps.match.params.noteId
              return (<NotePage note={notes.find(note => note.id === noteId)}/>)}}
            />
          </main>
        </section>
      </div>
    );
  }
}

export default App;
