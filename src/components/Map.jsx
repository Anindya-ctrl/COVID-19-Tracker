import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { formatLongNumber } from '../utilities/utilities';
import { circleConfigForCaseTypes } from '../utilities/utilities.json';
import '../styles/Map.css'

function Map({ center, zoom, dataType, countryList }) {
    return (
        <div className="map">
            <MapContainer
                center={ center }
                zoom={ zoom }
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {
                    countryList.length && countryList.map((country, index) => (
                        <Circle
                            key={ index }
                            center={[ country.countryInfo.lat, country.countryInfo.long ]}
                            fillOpacity={ 0.4 }
                            color={ circleConfigForCaseTypes[dataType].color }
                            fillColor={ circleConfigForCaseTypes[dataType].color }
                            radius={ Math.sqrt(country[dataType]) * circleConfigForCaseTypes[dataType].multiplier }
                        >
                            <Popup>
                                <div className="info-popup">
                                    <div
                                        className="info-popup-flag"
                                        style={{ backgroundImage: `url(${ country.countryInfo.flag })` }}
                                    />
                                    <div className="info-popup-name"><b>{ country.name }</b></div>
                                    <div className="info-popup-cases">Cases: { formatLongNumber(country.cases) }</div>
                                    <div className="info-popup-recovered">Recovered: { formatLongNumber(country.recovered) }</div>
                                    <div className="info-popup-deaths">Deaths: { formatLongNumber(country.deaths) }</div>
                                </div>
                            </Popup>
                        </Circle>
                    ))
                }
            </MapContainer>
        </div>
    );
}

export default Map;
