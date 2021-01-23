import React from "react";
import { Form } from "./Form.js";
import { List } from "./List.js";
import plane from "../plane.svg";
import { Link } from "@reach/router";

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
        fetchAccidents(options.filter((a) => !!a).join("&"));
    };

    const fetchAccidents = (options, page = 0) => {
        setLoading(true);
        fetch(`${url}?${options}&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents((acc) => [...acc, ...data.accidents]);
                setTotalPages(data.total_pages);
                setPage(0);
                setNext(1);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    const getPrev = () => {
        let prevPage = prev;
        setLoading(true);
        fetch(`${url}?${query}&page=${prev}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents(data.accidents);
                setLoading(false);
            })
            .catch((err) => console.error(err));

        setNext(page);
        setPage(prev);
        setPrev(prev - 1);
        if (!range.includes(prevPage)) {
            setRange(getRange(prevPage, prevPage + 9));
        }
    };
    const getNext = () => {
        let nextPage = next;
        setLoading(true);
        fetch(`${url}?${query}&page=${next}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents(data.accidents);
                setLoading(false);
            })
            .catch((err) => console.error(err));
        setPrev(page);
        setPage(next);
        setNext(next + 1);
        if (!range.includes(nextPage)) {
            setRange(getRange(nextPage - 9, nextPage));
        }
    };

    const getPage = (pageClicked) => {
        setLoading(true);
        fetch(`${url}?${query}&page=${pageClicked}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents(data.accidents);
                setLoading(false);
            })
            .catch((err) => console.error(err));
        setPrev(pageClicked - 1);
        setPage(pageClicked);
        setNext(pageClicked + 1);
    };

    const nextRange = () => {
        if (page + 10 <= totalPages) {
            let newPage = page + 10;
            setLoading(true);
            fetch(`${url}?${query}&page=${page + 10}`)
                .then((res) => res.json())
                .then((data) => {
                    setAccidents(data.accidents);
                    setLoading(false);
                })
                .catch((err) => console.error(err));

            setPrev(newPage - 1);
            setPage(newPage);
            setNext(newPage + 1);
            let rangeEnd = newPage + 9 <= totalPages ? newPage + 9 : totalPages;
            setRange(getRange(newPage, rangeEnd));
        }
    };

    const prevRange = () => {
        if (page - 20 >= 0) {
            let newPage = page - 10;
            setLoading(true);
            fetch(`${url}?${query}&page=${page - 10}`)
                .then((res) => res.json())
                .then((data) => {
                    setAccidents(data.accidents);
                    setLoading(false);
                })
                .catch((err) => console.error(err));
            setPrev(newPage - 1);
            setPage(newPage);
            setNext(newPage + 1);
            setRange(getRange(newPage - 9, newPage));
        } else {
            let newPage = 9 <= totalPages ? 9 : totalPages;
            setLoading(true);
            fetch(`${url}?${query}&page=${newPage}`)
                .then((res) => res.json())
                .then((data) => {
                    setAccidents(data.accidents);
                    setLoading(false);
                })
                .catch((err) => console.error(err));
            setPrev(newPage - 1);
            setPage(newPage);
            setNext(newPage + 1);
            setRange(getRange(0, newPage));
        }
    };
    const firstRange = () => {
        let newPage = 0;
        setLoading(true);
        fetch(`${url}?${query}&page=${newPage}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents(data.accidents);
                setLoading(false);
            })
            .catch((err) => console.error(err));
        setPrev(-1);
        setPage(0);
        setNext(1);
        let rangeEnd = newPage + 9 <= totalPages ? newPage + 9 : totalPages;
        setRange(getRange(0, rangeEnd));
    };

    const lastRange = () => {
        let rangeStart = totalPages - 9;
        fetch(`${url}?${query}&page=${totalPages}`)
            .then((res) => res.json())
            .then((data) => setAccidents(data.accidents))
            .catch((err) => console.error(err));
        setPrev(totalPages - 1);
        setPage(totalPages);
        setNext(totalPages + 1);
        setRange(getRange(rangeStart, totalPages));
    };

    const getRange = (from, to, step = 1) => {
        const newRange = [];
        while (from <= to) {
            newRange.push(from);
            from += step;
        }
        return newRange;
    };

    if (accidents.length > 0) {
        return (
            <>
                <div className="table-nav">
                    <button onClick={firstRange} disabled={prev < 0}>{`<<`}</button>
                    <button onClick={getPrev} disabled={prev < 0}>
                        {`<`}
                    </button>
                    {range && (
                        <button onClick={prevRange} disabled={page < 10}>
                            ...
                        </button>
                    )}
                    {range &&
                        range.map((val, index) => {
                            return (
                                <button
                                    className={val === page ? "highlight" : undefined}
                                    key={index}
                                    onClick={() => getPage(val)}
                                >
                                    {val + 1}
                                </button>
                            );
                        })}
                    {range && (
                        <button onClick={nextRange} disabled={next > totalPages}>
                            ...
                        </button>
                    )}
                    <button onClick={getNext} disabled={next > totalPages}>
                        {`>`}
                    </button>
                    <button onClick={lastRange} disabled={next > totalPages}>{`>>`}</button>
                </div>
                {loading && <img src={plane} className="rotate-center" alt="Hourglass" />}
                <List accidents={accidents} />
            </>
        );
    } else {
        return (
            <>
                <Link to="/makeAndModel">Search by Make and Model</Link>
                <Form handleSubmission={handleSubmission} />
            </>
        );
    }
};
