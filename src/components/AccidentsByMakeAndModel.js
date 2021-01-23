import React from "react";
import { Link } from "@reach/router";
import { naturalSort } from "../utils/naturalSort.js";

const url = process.env.REACT_APP_ENDPOINT;

const AccidentsByMakeAndModel = () => {
    const [makes, setMakes] = React.useState([]);
    React.useState(() => {
        fetch(`${url}/make_model`)
            .then((res) => res.json())
            .then((data) => setMakes(naturalSort(data)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="make-groups">
            <Link to="0-9" state={{ list: makes.filter((m) => /^\d/i.test(m)) }}>
                0-9
            </Link>
            <Link to="A" state={{ list: makes.filter((m) => /^A/i.test(m)) }}>
                A
            </Link>
            <Link to="B" state={{ list: makes.filter((m) => /^B/i.test(m)) }}>
                B
            </Link>
            <Link to="C" state={{ list: makes.filter((m) => /^C/i.test(m)) }}>
                C
            </Link>
            <Link to="D" state={{ list: makes.filter((m) => /^D/i.test(m)) }}>
                D
            </Link>
            <Link to="E" state={{ list: makes.filter((m) => /^E/i.test(m)) }}>
                E
            </Link>
            <Link to="F" state={{ list: makes.filter((m) => /^F/i.test(m)) }}>
                F
            </Link>
            <Link to="G" state={{ list: makes.filter((m) => /^A/i.test(m)) }}>
                G
            </Link>
            <Link to="H" state={{ list: makes.filter((m) => /^H/i.test(m)) }}>
                H
            </Link>
            <Link to="I" state={{ list: makes.filter((m) => /^I/i.test(m)) }}>
                I
            </Link>
            <Link to="J" state={{ list: makes.filter((m) => /^J/i.test(m)) }}>
                J
            </Link>
            <Link to="K" state={{ list: makes.filter((m) => /^K/i.test(m)) }}>
                K
            </Link>
            <Link to="L" state={{ list: makes.filter((m) => /^L/i.test(m)) }}>
                L
            </Link>
            <Link to="M" state={{ list: makes.filter((m) => /^M/i.test(m)) }}>
                M
            </Link>
            <Link to="N" state={{ list: makes.filter((m) => /^N/i.test(m)) }}>
                N
            </Link>
            <Link to="O" state={{ list: makes.filter((m) => /^O/i.test(m)) }}>
                O
            </Link>
            <Link to="P" state={{ list: makes.filter((m) => /^P/i.test(m)) }}>
                P
            </Link>
            <Link to="Q" state={{ list: makes.filter((m) => /^Q/i.test(m)) }}>
                Q
            </Link>
            <Link to="R" state={{ list: makes.filter((m) => /^R/i.test(m)) }}>
                R
            </Link>
            <Link to="S" state={{ list: makes.filter((m) => /^S/i.test(m)) }}>
                S
            </Link>
            <Link to="T" state={{ list: makes.filter((m) => /^T/i.test(m)) }}>
                T
            </Link>
            <Link to="U" state={{ list: makes.filter((m) => /^U/i.test(m)) }}>
                U
            </Link>
            <Link to="V" state={{ list: makes.filter((m) => /^V/i.test(m)) }}>
                V
            </Link>
            <Link to="W" state={{ list: makes.filter((m) => /^W/i.test(m)) }}>
                W
            </Link>
            <Link to="X" state={{ list: makes.filter((m) => /^X/i.test(m)) }}>
                X
            </Link>
            <Link to="Y" state={{ list: makes.filter((m) => /^Y/i.test(m)) }}>
                Y
            </Link>
            <Link to="Z" state={{ list: makes.filter((m) => /^Z/i.test(m)) }}>
                Z
            </Link>
        </div>
    );
};

export { AccidentsByMakeAndModel };
