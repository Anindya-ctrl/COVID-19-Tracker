import React from 'react';
import { sortCountryList, formatLongNumber } from '../utilities/utilities.js';
import '../styles/Table.css';

function Table({ countryList, dataType }) {
    return (
        <>
            <h3 className="table-title">Countries with the most { dataType }</h3>
            <div className="table">

                <table>
                    <tbody>
                        {
                            countryList && sortCountryList(countryList, dataType).map((country, index) => (
                                <tr key={ index }>
                                    <td>{ index + 1 }. { country.name }</td>
                                    <td><b>{ formatLongNumber(country[dataType]) }</b></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
