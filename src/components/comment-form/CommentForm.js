import React, { Component } from "react";
import axios from "axios";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.state.client.post('gists/' + this.props.id + '/comments', {
            body: this.state.body,
        }).then(response => {
            this.props.addNewComment(response.data);
        });

        this.setState({
            body: '',
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <textarea
                                        id="body-input"
                                        name="body"
                                        value={this.state.body}
                                        onChange={this.handleChange}
                                        placeholder="Type comment"
                                        className="form-control"
                                        required>
                                    </textarea>
                                </div>
                                <div className="float-right">
                                    <button className="btn btn-success">
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentForm;
