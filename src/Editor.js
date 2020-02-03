import React,{Component} from 'react';
import './Editor.css';

class Editor extends Component {
    constructor() {
        super();
        this.state = {
            key : '',
            value : ''
        };
        this.json = {};
        this.newEntry = this.newEntry.bind(this);
        this.onKeyEntry = this.onKeyEntry.bind(this);
        this.onValueEntry = this.onValueEntry.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.parseJSON = this.parseJSON.bind(this);
    }
    newEntry = () => {
        let textArea = document.getElementsByClassName('text-area')[0];

        const keyField = document.createElement('input');
        keyField.addEventListener("change",this.onKeyEntry);
        textArea.appendChild(keyField);

        const valueField = document.createElement('input');
        valueField.addEventListener("change",this.onValueEntry);
        valueField.addEventListener("focus",this.onKeyDown);
        textArea.appendChild(valueField);

        textArea.appendChild(document.createElement('br'));
        textArea.appendChild(document.getElementById('add-button'));
        textArea.appendChild(document.getElementById('generate-button'));
    }
     onKeyEntry = (e) => {
        this.setState({ 
            key : e.target.value
        })
    }
    onValueEntry = (e) => {
        this.setState({ value : e.target.value })

        if (Number.isInteger(Number(e.target.value)))
        this.json[this.state.key] = Number(this.state.value);
        else if( e.target.value === "true")
        this.json[this.state.key] = Boolean(this.state.value);   
        else if( e.target.value === "false")     
        this.json[this.state.key] = false;
        else if( e.target.value[0] === "{")
        this.json[this.state.key] = JSON.parse(e.target.value);
        else if( e.target.value[0] === "[")
        this.json[this.state.key] = e.target.value;
        else this.json[this.state.key] = this.state.value;
    }

    onKeyDown = () => {
        this.newEntry();
    }

    parseJSON = () => {
        document.write(JSON.stringify(this.json));
    }

    render() {
        return(
            <div className="text-area">
                <svg id="add-button" xmlns="http://www.w3.org/2000/svg" width="36" height="36" onClick={this.newEntry} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg> 
                <svg id="generate-button" onClick={this.parseJSON} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg> 
            </div>
        )
    }
}

export default Editor;