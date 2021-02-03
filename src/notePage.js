import React, {Component} from 'react';
import './notePage.css'
import DataContext from './dataContext'
import Note from './Note'
import { format, parseISO } from 'date-fns'


export default class NotePage extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
      static contextType = DataContext
    
    handleDeleteNote = () => {
        this.props.history.push('/')
    }

    render() {
        const noteId = this.props.match.params.noteId
        const { notes=[] } = this.context
        const note = notes.find(note => note.id === noteId) || { content: ''}
        // const date = parseISO(note.modified)
        return(
            <div className='pageNote'>
                <div className='noteBox'>
                    <Note 
                        id={note.id}
                        name={note.name}
                        modDate={note.modified}
                        onDeleteNote={this.handleDeleteNote}
                    />
                </div>
                <p>{note.content}</p>
            </div>
        )
    }
}