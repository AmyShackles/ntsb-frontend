import React from "react";
import { Link } from "@reach/router";
import { naturalSort } from "../utils/naturalSort.js";

const url = process.env.REACT_APP_ENDPOINT;

const ModelList = ({ location }) => {
    const make = location.state.make;
    const [models, setModels] = React.useState([]);

    React.useEffect(() => {
        fetch(`${url}/makeList/${encodeURIComponent(make)}`)
            .then((res) => res.json())
            .then((data) => setModels(naturalSort(data)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <ul>
            {models.map((model, index) => {
                return (
                    <li key={index}>
                        <Link
                            to={`/makes/${make[0]}/${encodeURIComponent(make)}/${encodeURIComponent(model)}`}
                            state={{ make, model }}
                        >
                            {model}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export { ModelList };
