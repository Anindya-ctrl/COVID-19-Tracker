import React from 'react';
import { Line } from 'react-chartjs-2';
import useCountries from '../hooks/useCountries';
import { getGraphData } from '../utilities/utilities.js';
import { circleConfigForCaseTypes } from '../utilities/utilities.json';
import '../styles/Graph.css';

function Graph({ dataType, className }) {
    const { casesInLastFourMonths } = useCountries();
    const graphData = getGraphData(casesInLastFourMonths, dataType);

    return (
        <div className={ className }>
            <h3 className="graph-title">Graph of global { dataType } in last 4 months</h3>
            
            <Line
                data={{
                    datasets: [{
                        data: graphData,
                        label: '',
                        borderColor: circleConfigForCaseTypes[dataType].color,
                        backgroundColor: circleConfigForCaseTypes[dataType].color,
                        pointHoverBackgroundColor: 'red',
                    }]
                }}
                options={{
                    plugins: {
                        legend: { display: false },
                    },
                    tooltips: {
                        enabled: false,
                        intersect: false,
                        mode: 'index',
                    },
                }}
            />
        </div>
    );
}

export default Graph;
