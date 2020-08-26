import React, { Component } from "react";
import GistCard from "../gist-card/GistCard";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

class GistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: [],
            allGists: [],
            loading: false,
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        }

        this.searchGist = this.searchGist.bind(this);
    }

    componentDidMount() {
        this.getGists();
    }

    getGists() {
        this.setState({
            loading: true,
        });

        this.state.client.get('gists')
            .then(response => {
                this.setState({
                    gists: response.data,
                    allGists: response.data,
                    loading: false,
                });
            })
    }

    searchGist(event) {
        let newGistList = this.state.allGists.filter(gist => {
            return gist.description.toLowerCase().match(event.target.value.toLowerCase());
        });

        this.setState({
            gists: newGistList,
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
                    <div className="col-12 mb-4">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 offset-lg-8 offset-md-6">
                                <input type="text"
                                       className="form-control"
                                       onChange={this.searchGist}
                                       placeholder="Search"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row justify-content-center">
                            <ClipLoader loading={this.state.loading} size={150} />
                        </div>
                    </div>

                    { this.selectGists() }
                </div>
            </div>
        )
    }
}

export default GistList;
