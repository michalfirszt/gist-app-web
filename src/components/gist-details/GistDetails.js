import React, { Component } from "react";
import axios from "axios";

class GistDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gist: {},
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        }
    }

    componentDidMount() {
        this.getGist();
    }

    getGist() {
        this.state.client.get('gists/' + this.props.id)
            .then(response => {
                this.setState({
                    gist: response.data,
                })
            })
    }

    render() {
        return (
            <div>
                { this.state.gist.description }
            </div>
        )
    }
}

export default GistDetails;
