import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import DataContext from '../dataContext'
import './Folders.css'



export default class Folders extends Component {

    static contextType = DataContext;

    render() {
        const { folders, notes } = this.context
        const countNotesForFolder = (notes=[], folderId) =>
            notes.filter(note => note.folder_id === folderId).length  
        const lis = folders.map(folder => 
            <li key={folder.folder_id}>
                <NavLink to={`/folder/${folder.folder_id}`} key={folder.folder_id} className='folder'>
                    {folder.name}
                    <span className='num-notes'>
                    {countNotesForFolder(notes, folder.folder_id)}
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