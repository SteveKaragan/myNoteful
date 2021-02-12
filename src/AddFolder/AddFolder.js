import React, { Component } from 'react';
import DataContext from '../dataContext';
import PropTypes from 'prop-types';
import './AddFolder.css'





export default class AddFolder extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    static contextType = DataContext;

    handleSubmit = e => {
        e.preventDefault();
        const note = {
            name: e.target['folder-name'].value
          }
        fetch(`http://localhost:9090/folders/`, {
            method: 'POST',
            body: JSON.stringify(note),
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
          .then(folder => {
            this.context.addFolder(folder);
            this.props.history.push(`/folder/${folder.id}`)
          })
          .catch(error => {
            console.error({ error })
          })    
    }

    render() {
        return(
            <form className='Noteful-form' onSubmit={this.handleSubmit}>
                <h3>Create a Folder</h3>
                <label htmlFor="folder-name-input">Name</label>
                <input type="text" className="registration__control"
                name="folder-name" id="folder-name-input" required/>
                <br/>
                <button type="submit">
                    Add Folder
                </button>
            </form>
        )
    }

}

AddFolder.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape({
    push: PropTypes.func.isRequired,
  })),
};
