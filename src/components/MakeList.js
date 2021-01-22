import React from "react";
import { Link } from "@reach/router";

const MakeList = ({ location }) => {
    if (location.state.list) {
        return (
            <ul className="makes">
                {location.state.list.map((make, index) => {
                    return (
                        <li key={index}>
                            <Link to={`${encodeURIComponent(make)}`} state={{ make }}>
                                {make}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return <h1>What</h1>;
    }
};

export { MakeList };
