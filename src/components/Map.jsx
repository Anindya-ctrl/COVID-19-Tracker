import React from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { formatLongNumber } from '../utilities/utilities';
import { circleConfigForCaseTypes } from '../utilities/utilities.json';
import '../styles/Map.css'

function Map({ dataType, countryList, mapCenter, mapZoom }) {
    function ChangeMapView({ newCenter, newZoom }) {
        const map = useMap();
        map.setView(newCenter, map.getZoom());
        map.setView(newCenter, newZoom);
      
        return null;
    }

    return (
        <div className="map">
            <MapContainer
                center={ mapCenter }
                zoom={ mapZoom }
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    countryList.length && countryList.map((country, index) => (
                        <Circle
                            key={ index }
                            pathOptions={{
                                color: circleConfigForCaseTypes[dataType].color,
                                fillColor: circleConfigForCaseTypes[dataType].color,
                            }}
                            center={[ country.countryInfo.lat, country.countryInfo.long ]}
                            fillOpacity={ 0.4 }
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
                <ChangeMapView newCenter={ mapCenter } newZoom={ mapZoom } />
            </MapContainer>
        </div>
    );
}

export default Map;
