import React, { Component } from "react";

class File extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="float-left">
                        { this.props.file.filename }
                    </div>
                    <div className="float-right">
                        { this.props.file.language }
                    </div>
                </div>
                <div className="card-body">
                    <pre>
                        <code>
                            { this.props.file.content }
                        </code>
                    </pre>
                </div>
            </div>
        )
    }
}

export default File;
