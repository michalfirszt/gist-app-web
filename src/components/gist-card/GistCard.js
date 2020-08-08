import React, { Component } from "react";

class GistCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createdAt: new Date(props.gist.created_at),
        };
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="float-left">
                        <img className="img-fluid rounded avatar-small mr-2"
                             src={this.props.gist.owner.avatar_url}
                             alt={this.props.gist.owner.login} />
                        { this.props.gist.owner.login }
                    </div>
                    <div className="float-right">
                        {
                            this.state.createdAt.getDay() +
                            " " +
                            this.state.createdAt.toLocaleString('default', { month: 'long' }) +
                            " " +
                            this.state.createdAt.getFullYear()
                        }
                    </div>
                </div>
                <div className="card-body">
                    { this.props.gist.description }

                    <ul className="mt-4">
                        <li>
                            Files: { Object.keys(this.props.gist.files).length }
                        </li>
                        <li>
                            Comments: { this.props.gist.comments }
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default GistCard;
