import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import File from "../file/File";
import CommentList from "../comment-list/CommentList";
import GistStar from "../gist-star/GistStar";

class GistDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gist: {},
            files: [],
            loading: false,
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        }

        this.deleteGist = this.deleteGist.bind(this);
    }

    componentDidMount() {
        this.getGist();
    }

    getGist() {
        this.setState({
            loading: true,
        });

        this.state.client.get('gists/' + this.props.id)
            .then(response => {
                let fileList = [];

                Object.keys(response.data.files).forEach(key => {
                    fileList.push(response.data.files[key]);
                });

                this.setState({
                    gist: response.data,
                    files: fileList,
                    loading: false,
                });
            })
    }

    deleteGist() {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then(result => {
            if (result.value) {
                this.state.client.delete('gists/' + this.props.id)
                    .then(response => {
                        Swal.fire({
                            title: 'Deleted',
                            icon: 'success',
                        })
                    })
            }
        })
    }

    gistActions() {
        return (
            <div className="text-right">
                <Link className="btn btn-primary mx-2" to={'/gist/edit/' + this.props.id}>
                    Edit
                </Link>
                <button className="btn btn-danger mx-2" onClick={this.deleteGist}>
                    Delete
                </button>
            </div>
        )
    }

    gistFiles() {
        return this.state.files.map((file, index) => {
            return (
                <div key={index} className="col-12 mb-4">
                    <File file={file} />
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <ClipLoader loading={this.state.loading} size={150} />
                        </div>
                    </div>
                    <div className="col-12">
                        { this.gistActions() }
                    </div>
                    <div className="col-12 text-right mt-2">
                        <GistStar id={this.props.id} />
                    </div>
                    <div className="col-12 mb-5">
                        <h4>
                            { this.state.gist.description }
                        </h4>
                    </div>

                    { this.gistFiles() }

                    <div className="col-12">
                        <CommentList id={this.props.id} />
                    </div>
                </div>
            </div>
        )
    }
}

export default GistDetails;
