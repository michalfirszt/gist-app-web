import React, { Component } from "react";
import GistCard from "../gist-card/GistCard";
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
                <div key={gist.id} className="col-12 mb-4">
                    <GistCard gist={gist} />
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    { this.selectGists() }
                </div>
            </div>
        )
    }
}

export default GistList;
