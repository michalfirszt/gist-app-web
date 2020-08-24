import React from "react";
import { Link, useParams } from "react-router-dom";
import GistDetails from "../../components/gist-details/GistDetails";

function Gist() {
    let { id } = useParams();

    return (
        <div>
            <div className="text-right">
                <Link className="btn btn-primary" to={'/gist/edit/' + id}>
                    Edit
                </Link>
            </div>
            <GistDetails id={id} />
        </div>
    )
}

export default Gist;
