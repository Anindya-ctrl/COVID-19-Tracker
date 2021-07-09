export function formatLongNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function sortCountryList(countryList, dataType='cases') {
    return [...countryList].sort((a, b) => b[dataType] - a[dataType]);
}

export function getGraphData(data, dataType='cases') {
    const graphData = [];
    let lastPointOnGraph ;

    data[dataType] && Object.keys(data[dataType]).forEach(date => {
        lastPointOnGraph = data[dataType][date];

        if(lastPointOnGraph) {
            const newPointOnGraph = {
                x: date,
                y: data[dataType][date],
            }

            graphData.push(newPointOnGraph);
        }
    });

    return graphData;
}
