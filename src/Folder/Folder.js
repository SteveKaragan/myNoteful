import React, {Component} from 'react';
import DataContext from '../dataContext'


export default class Folder extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },//discuss with mentor
        match: {
          params: {}
        }
      }
      static contextType = DataContext
    render() { 
        const { notes, folders } = this.context
        const noteId = this.props.match.params.noteId;//need to understand this better
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