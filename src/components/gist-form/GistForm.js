import React, { Component } from "react";
import axios from "axios";
import FileSubform from "../file-subform/FileSubform";

class GistForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            public: true,
            files: [],
            nextFileId: 1,
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        };

        this.handleChange = this.handleChange.bind(this);
        this.addNewFile = this.addNewFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.addNewFile();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    addNewFile() {
        let newFileList = this.state.files;

        newFileList.push({
            id: this.state.nextFileId,
            filename: '',
            content: '',
        });

        this.setState({
            files: newFileList,
            nextFileId: this.state.nextFileId + 1,
        });
    }

    removeFile() {
        let newFileList = this.state.files;

        if (newFileList.length > 1) {
            newFileList.pop();
        }

        this.setState({
            files: newFileList,
        })
    }

    updateFile(updatedFile) {
        let newFileList = this.state.files.map(file => {
            return file.id === updatedFile.id ? updatedFile : file;
        });

        this.setState({
            files: newFileList,
        });
    }

    fileActions() {
        return (
            <div className="row">
                <div className="col-12 text-right">
                    <button className="btn btn-primary mx-2" onClick={this.addNewFile}>
                        Add File
                    </button>
                    <button className="btn btn-danger" onClick={this.removeFile} disabled={this.state.files.length === 1}>
                        Remove File
                    </button>
                </div>
            </div>
        )
    }

    selectFiles() {
        return this.state.files.map(file => {
            return (
                <div key={file.id} className="mt-3 mb-3">
                    <FileSubform id={file.id} updateFile={this.updateFile} />
                </div>
            )
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        let files = {};

        this.state.files.forEach(file => {
            files[file.filename] = {
                filename: file.filename,
                content: file.content,
            }
        });

        this.state.client.post('gists', {
            description: this.state.description,
            public: this.state.public,
            files: files,
        }).then(response => {
            alert('Gist created successfully');
        })
    }

    render() {
        return (
            <div>
                { this.fileActions() }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Gist description
                        </label>
                        <textarea name="description"
                                  className="form-control"
                                  onChange={this.handleChange}
                                  value={this.state.description}
                                  required />
                    </div>
                    <div className="mt-4 mb-4">
                        { this.selectFiles() }
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default GistForm;
