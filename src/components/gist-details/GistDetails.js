import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

class GistDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gist: {},
            loading: false,
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
        this.setState({
            loading: true,
        });

        this.state.client.get('gists/' + this.props.id)
            .then(response => {
                this.setState({
                    gist: response.data,
                    loading: false,
                });
            })
    }

    render() {
        return (
            <div>
                <div className="col-12">
                    <div className="row justify-content-center">
                        <ClipLoader loading={this.state.loading} size={150} />
                    </div>
                </div>

                { this.state.gist.description }
            </div>
        )
    }
}

export default GistDetails;
