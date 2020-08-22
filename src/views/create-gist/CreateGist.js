import React from "react";
import GistForm from "../../components/gist-form/GistForm";

function CreateGist() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <GistForm />
                </div>
            </div>
        </div>
    )
}

export default CreateGist;
