import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this line
import { useFormik } from 'formik';
import * as yup from 'yup';
import './NavBar.css'

function NavBar({ setSearchedJobData }) {
    const [user, setUser] = useState(null)
    const [jobType, setJobType] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const navigate = useNavigate();

    const jobSearchApiOptions = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: { radius: "25" },
        headers: {
            'X-RapidAPI-Key': '87a13bb857msh6d480686553cc77p1415cajsn5fd5ebf1bbd6',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const schema = yup.object().shape({
        jobType: yup.string(),
        jobLocation: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            jobType: "",
            jobLocation: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setJobType(values.jobType); // Save jobType in state
            setJobLocation(values.jobLocation); // Save jobLocation in state
            if (jobType && jobLocation) {
                axios
                    .request({
                        ...jobSearchApiOptions,
                        params: {
                            ...jobSearchApiOptions.params,
                            query: `${jobType} in ${jobLocation}, USA`
                        }
                    })
                    .then((response) => {
                        setSearchedJobData(response.data); // Update searchedJobData with the response data
                        navigate('/search-results');
                    })
                    .catch((error) => {
                        console.error(error); // Handle error if the promise is rejected
                    });
            }
        },
    });

    return (
        <div className='NavBar'>
            <nav>
                <div className='logo'>
                    <span>Sign In</span>
                    <a href='/job_huntr_desktop'><h3>Job Huntr</h3></a>
                    <span>Sign Up</span>
                </div>
                <div className='search-form'>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            className="job-type"
                            type="text"
                            name="jobType"
                            placeholder="Job title, keyword, or company"
                            onChange={formik.handleChange}
                            value={formik.values.jobType}
                        />

                        <input
                            className="job-location"
                            type="text"
                            name="jobLocation"
                            placeholder="City, state, zip code, or 'remote'"
                            onChange={formik.handleChange}
                            value={formik.values.jobLocation}
                        />

                        <button>Search</button>
                    </form>
                </div>
                <div className='user-profile'>
                    {user ? <span>User Image</span> :
                        <div className='user-links'>
                            <span>Sign In</span>
                            <span>Sign Up</span>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}

export default NavBar