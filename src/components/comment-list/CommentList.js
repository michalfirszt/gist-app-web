import React, { Component } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Comment from "../comment/Comment";

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: false,
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        };
    }

    componentDidMount() {
        this.getComments();
    }

    getComments() {
        this.setState({
            loading: true,
        });

        this.state.client.get('gists/' + this.props.id + '/comments')
            .then(response => {
                this.setState({
                    comments: response.data,
                    loading: false,
                })
            })
    }

    selectComments() {
        return this.state.comments.map(comment => {
            return (
                <div key={comment.id} className="col-12 mb-4">
                    <Comment comment={comment} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mt-4">
                    <h4>Comments</h4>
                    <hr/>
                </div>

                <div className="col-12">
                    <div className="row justify-content-center">
                        <ClipLoader loading={this.state.loading} size={150} />
                    </div>

                    <div className="row">
                        { this.selectComments() }
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentList;
