import React from "react";
import { useParams } from "react-router-dom";
import GistDetails from "../../components/gist-details/GistDetails";

function Gist() {
    let { id } = useParams();

    return (
        <div>
            <GistDetails id={id} />
        </div>
    )
}

export default Gist;
