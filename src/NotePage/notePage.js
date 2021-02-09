import React, {Component} from 'react';
import './notePage.css'
import DataContext from '../dataContext'
import Note from '../Note/Note'



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
        const { notes=[] } = this.context //the =[] is if no notes returned?
        const note = notes.find(note => note.id === noteId) || { content: ''} //the || is incase nothing returned?
        return(
            <div className='pageNote'>
                <div className='noteBox'>
                    {
                        note.content === '' ? '' : 
                        <Note 
                            id={note.id}
                            name={note.name}
                            modDate={note.modified}
                            onDeleteNote={this.handleDeleteNote}
                        />
                    }
                </div>
                <p>{note.content}</p>
            </div>
        )
    }
}