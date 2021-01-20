import React from "react";

export const List = ({ accidents }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Accident Number</th>
                    <th>Event Date</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Aircraft Category</th>
                    <th>Location</th>
                    <th>Injury Severity</th>
                </tr>
            </thead>
            <tbody>
                {accidents.map(
                    (
                        {
                            Accident_Number,
                            Aircraft_Category,
                            City,
                            State,
                            Country,
                            Event_Date,
                            Injury_Severity,
                            Make,
                            Model,
                        },
                        index
                    ) => {
                        return (
                            <tr key={index}>
                                <td>{Accident_Number || ""}</td>
                                <td>
                                    {(Event_Date &&
                                        new Date(Event_Date).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })) ||
                                        ""}
                                </td>
                                <td>{Make || ""}</td>
                                <td>{Model || ""}</td>
                                <td>{Aircraft_Category || ""}</td>
                                <td>{City && State ? `${City}, ${State}` : Country ? Country : ""}</td>
                                <td>{Injury_Severity || ""}</td>
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
};
