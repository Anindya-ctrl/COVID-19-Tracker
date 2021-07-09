import { useReducer, useEffect } from 'react';

const {
    SET_COUNTRY_LIST,
    SET_SELECTED_COUNTRY_STATS,
    SET_CASES_IN_LAST_FOUR_MONTHS
} = {
    SET_COUNTRY_LIST: 'set-country-list',
    SET_SELECTED_COUNTRY_STATS: 'set-selected-country-info',
    SET_CASES_IN_LAST_FOUR_MONTHS: 'set-cases-in-last-four-months'
};

const reducer = (state, { type, payload }) =>  {
    switch(type) {
        case SET_COUNTRY_LIST:
            return {
                ...state,
                countryList: payload.countryList,
            }
        case SET_SELECTED_COUNTRY_STATS:
            return {
                ...state,
                selectedCountryStats: payload.selectedCountryStats,
            }
        case SET_CASES_IN_LAST_FOUR_MONTHS:
            return {
                ...state,
                casesInLastFourMonths: payload.casesInLastFourMonths,
            }
        default:
            return state;
    }
}

function useCountries(selectedCountry = null) {
    const [ state, dispatch ] = useReducer(reducer, {
        countryList: [],
        selectedCountryStats: {},
        casesInLastFourMonths: [],
    });

    useEffect(() => {
        return fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(data => (
                dispatch({
                    type: SET_COUNTRY_LIST,
                    payload: {
                        countryList: data.map(({ country: name, cases, deaths, recovered, countryInfo }) => ({ name, cases, deaths, recovered, countryInfo })),
                    },
                })
            ));
    }, []);

    useEffect(() => {
        const fetchURL = selectedCountry === 'Global' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${ selectedCountry }`;
        
        return selectedCountry && fetch(fetchURL)
            .then(res => res.json())
            .then(data => {
                const { cases, recovered, deaths, todayCases, todayRecovered, todayDeaths, countryInfo } = data;

                return dispatch({
                    type: SET_SELECTED_COUNTRY_STATS,
                    payload: {
                        selectedCountryStats: {
                            cases,
                            recovered,
                            deaths,
                            todayCases,
                            todayRecovered,
                            todayDeaths,
                            countryInfo,
                        },
                    }
                });
            });
    }, [ selectedCountry ]);

    useEffect(() => {
        return fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(res => res.json())
            .then(data => (
                dispatch({
                    type: SET_CASES_IN_LAST_FOUR_MONTHS,
                    payload: {
                        casesInLastFourMonths: data,
                    }
                })
            ));
    }, []);

    // console.dir(state);
    return state;
}

export default useCountries;
