import React from "react";

export const List = ({ accidents }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Accident Number</th>
                    <th>Final Report Date</th>
                    <th>Event Date</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Location</th>
                    <th>Injury Severity</th>
                </tr>
            </thead>
            <tbody>
                {accidents.map(
                    (
                        {
                            Accident_Number,
                            Final_Report_Date,
                            Final_Report_PDF,
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
                                <td data-title="Accident Number">
                                    <a href={Final_Report_PDF} title={`View final report PDF for ${Accident_Number}`}>{Accident_Number || ""}</a>
                                </td>
                                <td data-title="Final Report Date">{(Final_Report_Date &&
                                    new Date(Final_Report_Date).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    })) || 
                                    ""}
                                </td>
                                <td data-title="Event Date">
                                    {(Event_Date &&
                                        new Date(Event_Date).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })) ||
                                        ""}
                                </td>
                                <td data-title="Make">{Make || ""}</td>
                                <td data-title="Model">{Model || ""}</td>
                                <td data-title="Location">{City && State ? `${City}, ${State}` : Country ? Country : ""}</td>
                                <td data-title="Injury Severity">{Injury_Severity || ""}</td>
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
};
