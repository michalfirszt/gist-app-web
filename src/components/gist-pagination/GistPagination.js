import React, { Component } from "react";

class GistPagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    paginationItems() {
        let pages = [];

        if (this.props.elementsNumber >= this.props.perPage) {
            for (let i = 0; i < (this.props.elementsNumber / this.props.perPage); i++) {
                pages.push({
                    number: i + 1,
                    active: this.props.currentPage !== i + 1,
                });
            }
        }

        return pages.map(page => {
            return (
                <li className="page-item" key={page.number}>
                    <button className={"page-link " + (!page.active ? "btn-disabled" : "")}
                            onClick={() => this.props.changePage(page.number)}
                            disabled={!page.active}>
                        { page.number }
                    </button>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="row justify-content-center">
                <nav>
                    <ul className="pagination">
                        { this.paginationItems() }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default GistPagination;
