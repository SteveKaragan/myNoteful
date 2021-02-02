import React from 'react';
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import './Note.css'


export default function Note(props) {
    const date = parseISO(props.modDate)
    return(
        <div >
            <li className='note'>
                <Link to={`/note/${props.id}`}><h3>{props.name}</h3></Link>
                <span>Modified {format(date, 'do MMM yyyy')}</span>
            </li>
        </div>
    )
}