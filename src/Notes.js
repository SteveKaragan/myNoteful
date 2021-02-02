import React from 'react';
import Note from './Note'
import './Notes.css'


export default function Notes(props) {
   const notes =  props.notes.map(note => 
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
        <div>
            <ul>
                {notes}
            </ul>
            <button>Add Note</button>
        </div>
    )
}