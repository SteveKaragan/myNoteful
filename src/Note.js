import React, { Component } from 'react';
import DataContext from './dataContext'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types';
import './Note.css'




export default class Note extends Component  {
    static defaultProps ={
        onDeleteNote: () => {},
      }

      static contextType = DataContext;
    
    handleClickDelete = (e) => {
        e.preventDefault()//Do I need to prevent default?  Not a submit.
        const noteId = this.props.id
        
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()//we don't do anything with this, right?
        })
        .then(() => {
            this.context.deleteNote(noteId) //this one updates state
            this.props.onDeleteNote(noteId) //this is passed when <Note /> is called from notePage, goes back to main page
        })
        .catch(error => {
            console.error({ error })
        })    
    }

    render() {
        const modified = parseISO(this.props.modDate)//How do I fix the date?
        return(
            <div className='note'>
                    <Link to={`/note/${this.props.id}`}><h3>{this.props.name}</h3></Link>
                    <span>{format(modified, 'do MMM yyyy')}</span>
                    <button onClick={this.handleClickDelete}>Delete Note</button>
            </div>
        )
    }
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modDate: PropTypes.string.isRequired,
    folder: PropTypes.string
  };

                    // id={note.id}
                    // name={note.name}
                    // modDate={note.modified}
                    // folder={note.folderId}