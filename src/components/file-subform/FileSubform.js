import React, { Component } from "react";

class FileSubform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            filename: props.filename,
            content: props.content,
        };

        this.handleChange = this.handleChange.bind(this);
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

            case 'content':
                content = event.target.value;
                break;

            default:
                break;
        }

        let task = {
            id: this.state.id,
            filename: filename,
            content: content,
        };

        this.props.updateFile(task);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label>
                            Filename
                        </label>
                        <input type="text"
                               name="filename"
                               className="form-control"
                               value={this.state.filename}
                               onChange={this.handleChange}
                               required />
                    </div>
                    <div className="form-group">
                        <label>
                            Content
                        </label>
                        <textarea name="content"
                                  className="form-control"
                                  value={this.state.content}
                                  onChange={this.handleChange}
                                  required />
                    </div>
                </div>
            </div>
        )
    }
}

export default FileSubform;
