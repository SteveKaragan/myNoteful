import React from 'react';
import { NavLink } from 'react-router-dom'
import './Folders.css'



export default function Folders(props) {
    const folders = props.folders.map(folder => 
        <li key={folder.id}>
            <NavLink to={`/folder/${folder.id}`} key={folder.id} className='folder'>
                {folder.name}
            </NavLink>
        </li>
        )
    return(
        <div>
            <ul>{folders}</ul>
            <button className='addFolder'>Add Folder</button>
        </div>
    )
}