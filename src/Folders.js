import React, { Component} from 'react';
import { NavLink } from 'react-router-dom'
import DataContext from './dataContext'
import './Folders.css'



export default class Folders extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }//Discuss with Mentor

    static contextType = DataContext;

    render() {
        const { folders } = this.context  
        const lis = folders.map(folder => 
            <li key={folder.id}>
                <NavLink to={`/folder/${folder.id}`} key={folder.id} className='folder'>
                    {folder.name}
                </NavLink>
            </li>
        )
        return(
            <div>
                <ul>{lis}</ul>
                <button className='addFolder'>Add Folder</button>
            </div>
        )
    }        
}