import React from 'react';
import { format, parseISO } from 'date-fns'
import './notePage.css'


export default function NotePage(props) {
    const date = parseISO(props.note.modified)
    return(
        <div className='pageNote'>
            <div className='noteBox'>
                <h3>{props.note.name}</h3>
                <p>Modified {format(date, 'do MMM yyyy')}</p>
            </div>
            <p>{props.note.content}</p>
        </div>
    )
}