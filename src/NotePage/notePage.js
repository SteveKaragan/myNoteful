import React, {Component} from 'react';
import './notePage.css';
import DataContext from '../dataContext';
import PropTypes from 'prop-types';
import Note from '../Note/Note';



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
                <p className='content'>{note.content}</p>
            </div>
        )
    }
}

NotePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({  
        params: PropTypes.shape({
          noteId: PropTypes.string
        })
      }),
};
