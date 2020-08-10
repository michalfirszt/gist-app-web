import React from "react";
import { useParams } from "react-router-dom";
import GistDetails from "../../components/gist-details/GistDetails";

export const Gist = () => {
    let { id } = useParams();

    return (
        <div>
            <GistDetails id={id} />
        </div>
    )
}
