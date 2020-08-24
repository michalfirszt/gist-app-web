import React, { Component } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-github";

class FileSubform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            filename: props.filename,
            content: props.content,
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateCode = this.updateCode.bind(this);
    }

    static defaultProps = {
        filename: '',
        content: '',
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        let filename = this.state.filename;
        let content = this.state.content;

        switch (event.target.name) {
            case 'filename':
                filename = event.target.value;
                break;

            default:
                break;
        }

        let file = {
            id: this.state.id,
            filename: filename,
            content: content,
        };

        this.props.updateFile(file);
    }

    updateCode(code) {
        this.setState({
            content: code,
        });

        let file = {
            id: this.state.id,
            filename: this.state.filename,
            content: code,
        };

        this.props.updateFile(file);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <input type="text"
                           name="filename"
                           placeholder="Filename with extension"
                           className="form-control"
                           value={this.state.filename}
                           onChange={this.handleChange}
                           required />
                </div>
                <div className="card-body p-0">
                    <AceEditor mode="jsx"
                               theme="github"
                               name="content"
                               defaultValue={this.state.content}
                               onChange={this.updateCode}
                               height="200px"
                               width="100%" />
                </div>
            </div>
        )
    }
}

export default FileSubform;
