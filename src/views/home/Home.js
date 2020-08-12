import React from "react";
import GistList from "../../components/gist-list/GistList";

function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <GistList />
            </div>
        </div>
    )
}

export default Home;
