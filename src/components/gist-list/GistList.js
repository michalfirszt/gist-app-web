import React, { Component } from "react";
import axios from "axios";

class GistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: [],
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
        this.getGists();
    }

    getGists() {
        this.state.client.get('gists')
            .then(response => {
                this.setState({
                    gists: response.data,
                })
            })
    }

    selectGists() {
        return this.state.gists.map(gist => {
            return (
                <li key={ gist.id }>
                    { gist.description }
                </li>
            )
        });
    }

    render() {
        return (
            <div>
                <ul>
                    { this.selectGists() }
                </ul>
            </div>
        )
    }
}

export default GistList;
