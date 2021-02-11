import React, { Component } from 'react';
import Note from '../Note/Note'
import DataContext from '../dataContext'
import { NavLink } from 'react-router-dom'
import './Notes.css'


export default class Notes extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = DataContext;
  
    render() {
        const { folderId } = this.props.match.params
        const { notes } = this.context
        let folderNotes
        (!folderId) 
            ? folderNotes = notes
            : folderNotes = notes.filter(note => note.folderId === folderId)
        const lis =  folderNotes.map(note => 
            <li key={note.id}>
                <Note 
                    id={note.id}
                    name={note.name}
                    modDate={note.modified}
                    folder={note.folderId}
                />
            </li>
            )
        return(
            <div className='NoteListMain'>
                <ul>
                    {lis}
                </ul>
                <div>
                    <NavLink to={'/add-note'} className='NavCircleButton'>Add Note</NavLink>
                </div>
            </div>
        )
    }
}