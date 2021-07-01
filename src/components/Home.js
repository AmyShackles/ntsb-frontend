import React from "react";
import { Form } from "./Form.js";
import { navigate } from "@reach/router";

const url = process.env.REACT_APP_ENDPOINT;

export const Home = () => {
    const [query, setQuery] = React.useState();
    const [accidents, setAccidents] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [prev, setPrev] = React.useState(-1);
    const [next, setNext] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();
    const [loading, setLoading] = React.useState();
    const [range, setRange] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const handleSubmission = (options) => {
        setQuery(`${options.filter((a) => !!a).join("&")}`);
        console.log({ options });
        fetchAccidents(options.filter((a) => !!a).join("&"));
    };

    const fetchAccidents = (options, page = 0) => {
        setLoading(true);
        fetch(`${url}?${options}&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                navigate("/results", {
                    state: {
                        accidents: data.accidents,
                        query: options,
                        totalPages: data.total_pages,
                        range: getRange(0, data.total_pages < 9 ? data.total_pages : 9),
                        page: 0,
                        next: 1,
                        loading: false,
                    },
                });
            })
            .catch((err) => console.error(err));
    };

    const getRange = (from, to, step = 1) => {
        const newRange = [];
        while (from <= to) {
            newRange.push(from);
            from += step;
        }
        return newRange;
    };
        return (
            <>
                <Form handleSubmission={handleSubmission} />
            </>
        );
    }

