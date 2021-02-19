import React, { Component } from 'react';
import DataContext from '../dataContext';
import PropTypes from 'prop-types';
import './AddNote.css'



export default class AddNote extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    static contextType = DataContext;

    handleSubmit = e => {
        e.preventDefault();
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
          }
        fetch(`http://localhost:9090/notes/`, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
              'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                throw error
              })
            }
            return res.json()
          })
          .then(note => {
            this.context.addNote(note);
            this.props.history.push(`/folder/${note.folderId}`)
          })
          .catch(error => {
            console.error({ error })
          })    
    }

    render() {
        const { folders } = this.context
        return(
            <form onSubmit={this.handleSubmit} className='Noteful-form'>
                <h2>Create a Note</h2>
                <label htmlFor="note-name-input">Name</label>
                <input type="text" className="registration__control"
                name="note-name" id="note-name-input" required/>
                <br/>
                <label htmlFor="note-content-input">Content</label>
                <input type="text" className="registration__control"
                name="note-content" id="note-content-input"/>
                <br/>
                <label htmlFor='note-folder-select'>
                    Folder
                </label>
                <select id='note-folder-select' name='note-folder-id' >
                    <option value={null}>...</option>
                    {folders.map(folder =>
                    <option key={folder.id} value={folder.id}>
                        {folder.name}
                    </option>
                    )}
                </select>
                <br/>
                <button type="submit" className="registration__button">
                    Add Note
                </button>
            </form>
        )
    }
}

AddNote.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
};