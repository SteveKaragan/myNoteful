import React from 'react';
import './notePage.css'


export default function NotePage(props) {

    return(
        <div className='pageNote'>
            <div className='noteBox'>
                <h3>{props.note.name}</h3>
                <p>{props.note.modified}</p>
            </div>
            <p>{props.note.content}</p>
        </div>
    )
}