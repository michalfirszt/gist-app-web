import React from "react";
import { useParams } from "react-router-dom";
import GistForm from "../../components/gist-form/GistForm";

function EditGist() {
    let { id } = useParams();

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h3>
                        Edit Gist
                    </h3>
                </div>
                <div className="col-md-10">
                    <GistForm gistId={id} />
                </div>
            </div>
        </div>
    )
}

export default EditGist;
