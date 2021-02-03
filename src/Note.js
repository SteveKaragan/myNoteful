import React, { Component } from 'react';
import DataContext from './dataContext'
import { Link } from 'react-router-dom'
//import { format } from 'date-fns'
import './Note.css'




export default class Note extends Component  {
    static defaultProps ={
        onDeleteNote: () => {},
      }

      static contextType = DataContext;
    
    handleClickDelete = (e) => {
        e.preventDefault()
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
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            // allow parent to perform extra behaviour
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })    
    }

    render() {
        return(
            <div className='note'>
                    <Link to={`/note/${this.props.id}`}><h3>{this.props.name}</h3></Link>
                    <span>{this.props.modDate}</span>
                    <button onClick={this.handleClickDelete}>Delete Note</button>
            </div>
        )
    }
}

