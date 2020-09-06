import React, { Component } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import FileSubform from "../file-subform/FileSubform";

class GistForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            public: true,
            files: [],
            nextFileId: 1,
            loading: false,
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
        if (this.props.gistId) {
            this.getGist();
        } else {
            this.addNewFile();
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    getGist() {
        this.setState({
            loading: true,
        });

        this.state.client.get('gists/' + this.props.gistId)
            .then(response => {
                Object.keys(response.data.files).forEach(key => {
                    this.addNewFile(response.data.files[key].filename, response.data.files[key].content)
                });

                this.setState({
                    description: response.data.description,
                    loading: false,
                });
            })
    }

    addNewFile(filename = '', content = '') {
        let newFileList = [...this.state.files, {
            id: this.state.nextFileId,
            filename: filename,
            content: content,
        }];

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
                    <button className="btn btn-primary mx-2"
                            onClick={() => this.addNewFile()}>
                        Add File
                    </button>
                    <button className="btn btn-danger"
                            onClick={this.removeFile}
                            disabled={this.state.files.length === 1}>
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
                    <FileSubform id={file.id}
                                 filename={file.filename}
                                 content={file.content}
                                 updateFile={this.updateFile} />
                </div>
            )
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true,
        });

        let files = {};

        this.state.files.forEach(file => {
            files[file.filename] = {
                filename: file.filename,
                content: file.content,
            }
        });

        let request = {};

        if (this.props.gistId) {
            request = {
                method: 'patch',
                url: 'gists/' + this.props.gistId,
            };
        } else {
            request = {
                method: 'post',
                url: 'gists',
            };
        }

        this.state.client({
            method: request.method,
            url: request.url,
            data: {
                description: this.state.description,
                public: this.state.public,
                files: files,
            }
        }).then(response => {
            this.setState({
                loading: false,
            });

            Swal.fire({
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
            });
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
                        {this.state.loading ? (
                            <ClipLoader loading={this.state.loading} size={100} />
                        ) : (
                            <input type="submit" className="btn btn-primary"/>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default GistForm;
