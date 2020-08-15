import React, {useEffect, useState} from 'react';
import {FormControl, NativeSelect} from "@material-ui/core";
import styles from './CountryPicker.module.css'
import {fetchAllCountries} from "../../api";


const CountryPicker = ({handleCountryChange}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await fetchAllCountries());
        }

        fetchCountries();
    }, [setCountries])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue=""
                          onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {
                    countries.map(country => <option value={country.name}>{country.name}</option>)
                }
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;