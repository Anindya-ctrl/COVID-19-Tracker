import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Map from './Map';
import Table from './Table';
import InfoBox from './InfoBox';
import useCountries from '../hooks/useCountries';
import { formatLongNumber } from '../utilities/utilities';
import { circleConfigForCaseTypes } from '../utilities/utilities.json';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import '../styles/App.css';
import '../styles/Header.css';
import '../styles/Stats.css';
import 'leaflet/dist/leaflet.css';

function App() {
    const [ selectedCountry, setSelectedCountry ] = useState('Global');
    const [ dataType, setDataType ] = useState('cases');
    const [ mapCenter, setMapCenter ] = useState([10, 10]);
    const [ mapZoom, setMapZoom ] = useState(2);
    const { countryList, selectedCountryStats } = useCountries(selectedCountry);

    useEffect(() => {
        selectedCountryStats.countryInfo && setMapCenter(() => [selectedCountryStats.countryInfo.lat, selectedCountryStats.countryInfo.long]);
    }, [ selectedCountryStats ]);

    const handleCountryChange = event => {
        setSelectedCountry(event.target.value);
        setMapZoom(4);
    }

    return (
        <div className="app">
            <div className="left-segment">

                {/* HEADER */}
                <div className="header">
                    <h1>COVID-19 TRACKER</h1>

                    <FormControl className="drop-down">
                        <Select
                            value={ selectedCountry }
                            variant="outlined"
                            onChange={ handleCountryChange }
                        >
                            <MenuItem value="Global">Global</MenuItem>
                            {
                                countryList.map((country, index) => (
                                    <MenuItem key={ index } value={ country.name }>{ country.name }</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>

                {/* STATISTICS */}
                <div className="stats">
                    {
                        selectedCountryStats && (
                            <>
                                <InfoBox
                                    title="Cases"
                                    active={ dataType === 'cases' }
                                    cases={ formatLongNumber(selectedCountryStats?.todayCases) } 
                                    overallCases={ formatLongNumber(selectedCountryStats?.cases) }
                                    onClick={ () => setDataType('cases') }
                                    color={ circleConfigForCaseTypes.cases.color }
                                />
                                <InfoBox 
                                    title="Recovered"
                                    active={ dataType === 'recovered' }
                                    cases={ formatLongNumber(selectedCountryStats?.todayRecovered) } 
                                    overallCases={ formatLongNumber(selectedCountryStats?.recovered) }
                                    onClick={ () => setDataType('recovered') }
                                    color={ circleConfigForCaseTypes.recovered.color }
                                />
                                <InfoBox 
                                    title="Deaths"
                                    active={ dataType === 'deaths' }
                                    cases={ formatLongNumber(selectedCountryStats?.todayDeaths) } 
                                    overallCases={ formatLongNumber(selectedCountryStats?.deaths) }
                                    onClick={ () => setDataType('deaths') }
                                    color={ circleConfigForCaseTypes.deaths.color }
                                />
                            </>
                        )
                    }
                </div>

                {/* MAP */}
                <Map
                    mapCenter={ mapCenter }
                    mapZoom={ mapZoom }
                    dataType={ dataType }
                    countryList={ countryList }
                />
            </div>

            <Card className="right-segment">
                <CardContent>
                    <Table countryList={ countryList } dataType={ dataType } />
                    <Graph dataType={ dataType } className="graph" />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
