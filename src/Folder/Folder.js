import React, {Component} from 'react';
import DataContext from '../dataContext';
import PropTypes from 'prop-types';


export default class Folder extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }
      static contextType = DataContext
    render() { 
        const { notes, folders } = this.context
        const noteId = this.props.match.params.noteId;
        const note = notes.find(note => note.id === noteId) || {}
        const folder = folders.find(folder => folder.id===note.folderId)
        return(
            <div>
                <button onClick={() => this.props.history.goBack()} className='NavCircleButton'>back</button>
                {(folder) && <h3 className='folder'>{folder.name}</h3>}
            </div>
        )
    }
}

Folder.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({  
    params: PropTypes.shape({
    noteId: PropTypes.string
    })
  })
}