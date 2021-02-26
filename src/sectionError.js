import React, { Component } from 'react';

export default class SectionError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        console.log('check')
        return { haserror: true };
    }

    render() {
        if (this.state.hasError) {
           return (
               <h2>Could not display this section</h2>
           ) 
        }
        return this.props.children
    }
}