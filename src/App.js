import React, { useEffect, useState } from 'react';

import './app.css'
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import InfoData from './Components/InfoData/InfoData';
import Table from './Components/Table/Table';
import Map from './Map';
function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("Worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data)
      console.log(data)
    }

      )
 
  }, [])
  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso3
            }
          ))
            // sort country
          const sortData = (data) => {
            const sortedData =[...data]
            sortedData.sort((x,y) => x.cases > y.cases ? -1 : 1)
            return sortedData
          }
          setCountries(countries)
          const sortedData = sortData(data)
          setTableData(sortedData)
        })

    }
    getCountries()
  }, [])

  // handle onchange country

  const handleChangeCountry = async(event) => {
    const changeCountryCode = event.target.value;
    setCountry(changeCountryCode)
    const url = changeCountryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${changeCountryCode}`

    await fetch(url)
    .then(res => res.json())
    .then(data => setCountryInfo(data))
    
    
  }

  return (
    <div className="app">
      <div className="app__header__left">
        <div className="app__header">
          <h2>COVID-19 TRACKER</h2>

          <FormControl className="app__dropdown">
            <Select value={country} variant="outlined" onChange={handleChangeCountry}>
            <MenuItem value="Worldwide" >Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="info__box">
          <InfoData
            title={'Corona Virus Cases'}
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />

          <InfoData
            title={'Recovered'}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />

          <InfoData
            title={'Deaths'}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />
        </div>
        <div className="map">
          <Map />
        </div>
       
      </div>

   
            <Card className="app__header__right">
              <CardContent>
                <h5>Live Cases by Country</h5>
                <Table countries={tableData} />
                <h5>Worldwide new cases</h5>
              </CardContent>
            </Card>
      </div>

  );
}

export default App;
