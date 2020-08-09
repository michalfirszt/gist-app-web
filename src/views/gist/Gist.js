import React from "react";
import { useParams } from "react-router-dom";

export const Gist = () => {
    let { id } = useParams();

    return (
        <div>Id: { id }</div>
    )
}
