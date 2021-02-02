import React from 'react';

export default function Folder(props) {
    console.log(props)
    return(
        <div>
            <button onClick={props.onClickBack}>Go back</button>
            <h3>{props.folder.name}</h3>
            
        </div>
    )
}