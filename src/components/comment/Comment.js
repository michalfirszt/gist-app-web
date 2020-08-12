import React, { Component } from "react";

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createdAt: new Date(props.comment.created_at),
        };
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="float-left">
                        <img className="img-fluid rounded avatar-small mr-2"
                             src={this.props.comment.user.avatar_url}
                             alt={this.props.comment.user.login} />
                        { this.props.comment.user.login }
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
                    { this.props.comment.body }
                </div>
            </div>
        )
    }
}

export default Comment;
