import React, { Component } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

class GistStar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starred: false,
            loading: false,
            client: axios.create({
                baseURL: 'https://api.github.com/',
                responseType: 'json',
                headers: {
                    'Authorization': 'token ' + process.env.REACT_APP_GIST_TOKEN,
                }
            }),
        };

        this.starGist = this.starGist.bind(this);
    }

    componentDidMount() {
        this.checkStar();
    }

    checkStar() {
        this.state.client.get('gists/' + this.props.id + '/star')
            .then(response => {

                if (response.status) {
                    this.setState({
                        starred: true,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    starGist() {
        this.setState({
            loading: true,
        })

        let method = this.state.starred ? 'delete' : 'put';

        this.state.client({
            method: method,
            url: 'gists/' + this.props.id + '/star',
        }).then(response => {
            this.setState({
                starred: !this.state.starred,
                loading: false,
            })
        })
    }

    render() {
        return (
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={this.starGist}>
                    {this.state.loading ? (
                        <ClipLoader loading={this.state.loading} size={15} color={'#fff'} />
                    ) :
                        this.state.starred ? 'Unstar' : 'Star'
                    }
                </button>
                <button className="btn btn-secondary" disabled>
                    {this.state.starred ? (
                        <i className="fas fa-star text-warning" />
                    ) : (
                        <i className="far fa-star text-warning" />
                    )}
                </button>
            </div>
        )
    }
}

export default GistStar;
