import React from "react";
import { List } from "./List.js";
import plane from "../plane.svg";
import { useParams } from "@reach/router";

const url = process.env.REACT_APP_ENDPOINT;

const AccidentList = () => {
    const params = useParams();
    const make = decodeURIComponent(params["make-model"]);
    const [accidents, setAccidents] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [prev, setPrev] = React.useState(-1);
    const [next, setNext] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [range, setRange] = React.useState([]);
    const query = `Make_Model=${encodeURIComponent(make)}`;

    React.useEffect(() => {
        fetch(`${url}?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setAccidents(data.accidents);
                setTotalPages(data.total_pages);
                setRange(getRange(0, data.total_pages < 9 ? data.total_pages : 9));
                setPage(0);
                setNext(1);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

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
        if (page - 10 >= 0) {
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
            setRange(getRange(newPage < 9 ? newPage - newPage : newPage - 9, newPage));
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
    return (
        <div className="accident-list">
            {accidents.length > 0 ? (
                <>
                <div className="title-with-nav">
                    <h1 className="title">Accidents involving {make}</h1>
                    <div id="top-nav" className="table-nav">
                        {range.length > 1 && (
                            <button title="Go to first page" onClick={firstRange} disabled={prev < 0}>{`<<`}</button>
                        )}
                        {range.length > 1 && (
                            <button title="Go back 1 page" onClick={getPrev} disabled={prev < 0}>
                                {`<`}
                            </button>
                        )}
                        {range.length > 1 && (
                            <button title="Go back 10 pages" onClick={prevRange} disabled={page < 10}>
                                ...
                            </button>
                        )}
                        {range.length > 1 &&
                            range.map((val, index) => {
                                return (
                                    <button
                                        title={`Go to page ${val + 1}`}
                                        className={val === page ? "highlight" : undefined}
                                        key={index}
                                        onClick={() => getPage(val)}
                                    >
                                        {val + 1}
                                    </button>
                                );
                            })}
                        {range.length > 1 && (
                            <button title="Advance 10 pages" onClick={nextRange} disabled={page + 10 >= totalPages}>
                                ...
                            </button>
                        )}
                        {range.length > 1 && (
                            <button title="Advance 1 page" onClick={getNext} disabled={next >= totalPages}>
                                {`>`}
                            </button>
                        )}
                        {range.length > 1 && (
                            <button
                                title="Go to last page"
                                onClick={lastRange}
                                disabled={next > totalPages}
                            >{`>>`}</button>
                        )}
                    </div>
                    </div>
                    {loading && <img src={plane} className="rotate-center" alt="Hourglass" />}
                    <List accidents={accidents} />
                    <div className="table-nav">
                        {range.length > 1 && (
                            <button title="Go to first page" onClick={firstRange} disabled={prev < 0}>{`<<`}</button>
                        )}
                        {range.length > 1 && (
                            <button title="Go back 1 page" onClick={getPrev} disabled={prev < 0}>
                                {`<`}
                            </button>
                        )}
                        {range.length > 1 && (
                            <button title="Go back 10 pages" onClick={prevRange} disabled={page < 10}>
                                ...
                            </button>
                        )}
                        {range.length > 1 &&
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
                        {range.length > 1 && (
                            <button title="Advance 10 pages" onClick={nextRange} disabled={page + 10 >= totalPages}>
                                ...
                            </button>
                        )}
                        {range.length > 1 && (
                            <button title="Advance 1 page" onClick={getNext} disabled={next >= totalPages}>
                                {`>`}
                            </button>
                        )}
                        {range.length > 1 && (
                            <button
                                title="Go to last page"
                                onClick={lastRange}
                                disabled={next > totalPages}
                            >{`>>`}</button>
                        )}
                    </div>
                </>
            ) : loading ? (
                <>
                            <h1 className="title">Accidents involving {make}</h1>

                <img src={plane} className="rotate-center" alt="Hourglass" />
                </>
            ) : (
                <h1>No results</h1>
            )}
        </div>
    );
};

export { AccidentList };
