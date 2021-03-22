import React, { Component } from 'react';
import DataContext from '../dataContext'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types';
import './Note.css';
import { API_URL } from '../config';




export default class Note extends Component  {
    static defaultProps ={
        onDeleteNote: () => {},
      }

      static contextType = DataContext;
    
    handleClickDelete = (e) => {
        e.preventDefault()
        const noteId = this.props.id
        
        fetch(`${API_URL}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
        })
        .then(() => {
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })    
    }

    render() {
        const mod = parseISO(this.props.modDate)
        return(
            <div className='note'>
                <h2 className='Note__title'><Link to={`/note/${this.props.id}`}>{this.props.name}</Link></h2>
                    <button className='Note__delete'type='button' onClick={this.handleClickDelete}>
                        {' '}
                        remove
                    </button>
                    <div className='Note__dates'>
                        <span>Modified {format(mod, 'do MMM yyyy')}</span>
                    </div>
                        
            </div>
        )
    }
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    modDate: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.func.isRequired
  };


