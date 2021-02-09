import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import Notes from '../Notes/Notes'
import Folders from '../Folders/Folders'
import NotePage from '../NotePage/notePage'
import Folder from '../Folder/Folder'
import DataContext from '../dataContext'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import SectionError from '../sectionError'


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

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  
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
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
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
            <SectionError>
              <nav className='nav'>
                <Route exact path='/' component={Folders}/>
                <Route path='/folder/:folderId' component={Folders}/>
                <Route path='/note/:noteId' component={Folder}/>
                <Route path='/add-folder' component={Folder}/>
                <Route path='/add-note' component={Folder}/>
              </nav>
            </SectionError>
            <SectionError>
              <main className='main'>
                <Route exact path='/' component={Notes}/>
                <Route path='/folder/:folderId' component={Notes}/>
                <Route path='/note/:noteId' component={NotePage}/>
                <Route path='/add-folder' component={AddFolder}/>
                <Route path='/add-note' component={AddNote}/>
              </main>
            </SectionError>
          </section>
        </DataContext.Provider>
      </div>
    );
  }
}

export default App;
