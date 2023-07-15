import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import NearbyJobs from '../NearbyJobs/NearbyJobs';
import MostRecent from '../MostRecent/MostRecent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';

function App() {
    const [location, setLocation] = useState({});
    const [jobData, setJobData] = useState({});
    const [searchedJobData, setSearchedJobData] = useState({});

    console.log(searchedJobData);

    const locationApiOptions = {
        method: 'GET',
        url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
        params: { format: 'json' },
        headers: {
            'X-RapidAPI-Key': '87a13bb857msh6d480686553cc77p1415cajsn5fd5ebf1bbd6',
            'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
    };

    const jobSearchApiOptions = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: { radius: "25" },
        headers: {
            'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await axios.request(locationApiOptions);
            setLocation(response.data.city.name);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.request({
                ...jobSearchApiOptions,
                params: {
                    ...jobSearchApiOptions.params,
                    query: `cashier in ${location}, USA`
                }
            });
            setJobData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    useEffect(() => {
        if (location) {
            fetchJobs();
        }
    }, [location]);

    return (
        <Router>
            <div className='App'>
                <NavBar setSearchedJobData={setSearchedJobData} />
                <div className='app-wrapper'>
                    <Routes>
                        <Route exact path='/job_huntr_desktop' element={<>
                            <NearbyJobs jobData={jobData} />
                            <MostRecent jobData={jobData} />
                        </>} />
                        <Route exact path='/search-results' element={<SearchResults searchedJobData={searchedJobData} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
