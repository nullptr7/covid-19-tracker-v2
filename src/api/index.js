import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';


export const fetchData = async () => {

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(url);
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        };
    } catch (e) {
        console.error("Error fetching daily data", e);
    }
}

export const fetchDailyData = async () => {

    try {
        const {data} = await axios.get(`${url}/daily`);
        return data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
    } catch (e) {
        console.error("Error fetching daily data", e);
    }
}

export const fetchAllCountries = async () => {

    try {
        // const response = await axios.get(`${url}/countries`);

        const {data} = await axios.get(`${url}/countries`);

        return data.countries.map((d) => (
            {
                name: d.name
            }
        ));
    } catch (e) {
        console.error("Error fetching countries", e);
    }
}

export const fetchDataByCountry = async (selection) => {
    let finalSelection = selection === 'global' ? '' : '/countries/' + selection;

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(`${url}${finalSelection}`);
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        //console.log(selection.target.value);
    } catch (e) {
        console.error("error fetching data by country", e);
    }
}