import React from "react";
import { useParams } from "react-router-dom";

function EditGist() {
    let { id } = useParams();

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                </div>
            </div>
        </div>
    )
}

export default EditGist;
