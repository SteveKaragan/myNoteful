import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import DataContext from '../dataContext'
import './Folders.css'



export default class Folders extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }

    static contextType = DataContext;//Does This Have to be Context Type?

    render() {
        const { folders, notes } = this.context
        const countNotesForFolder = (notes=[], folderId) =>
            notes.filter(note => note.folderId === folderId).length  
        const lis = folders.map(folder => 
            <li key={folder.id}>
                <NavLink to={`/folder/${folder.id}`} key={folder.id} className='folder'>
                    {folder.name}
                    <span className='num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                    </span>
                </NavLink>
                
            </li>
        )
        return(
            <div>
                <ul className='list'>{lis}</ul>
                <NavLink to={'/add-folder'}className='addFolder' >Add Folder</NavLink>
            </div>
        )
    }        
}