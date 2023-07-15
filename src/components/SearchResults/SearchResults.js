import React from 'react';
import './SearchResults.css'

function SearchResults({ searchedJobData }) {
    console.log(searchedJobData);

    const getTimePosted = (postedAt) => {
        const postedDate = new Date(postedAt);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - postedDate);
        const hoursDiff = Math.round(timeDiff / (1000 * 60 * 60));

        if (hoursDiff < 24) {
            return `${hoursDiff} hours ago`;
        } else if (hoursDiff >= 24 && hoursDiff < 24 * 7) {
            const daysDiff = Math.floor(hoursDiff / 24);
            return `${daysDiff} days ago`;
        } else {
            const weeksDiff = Math.floor(hoursDiff / (24 * 7));
            return `${weeksDiff} weeks ago`;
        }
    };

    const formatSalary = (salary) => {
        if (salary) {
            return salary.toLocaleString();
        } else {
            return 'N/A';
        }
    };

    return (
        <div className='SearchResults'>
            <h5 className='pt-5'>Search Results</h5>
            <div className='search-results-wrapper'>
                {searchedJobData.data.map((jobInfo) => (
                    <div className="recent-card search-result-card" key={jobInfo.id}>
                        <span className="recent-job-posted-at">
                            Posted {getTimePosted(jobInfo.job_posted_at_datetime_utc)}
                        </span>
                        <div className="recent-job-details">
                            <p className="recent-job-title">{jobInfo.job_title}</p>
                            <p className="recent-employer-name">{jobInfo.employer_name}</p>
                            <p className="recent-job-city">
                                {jobInfo.job_city}, {jobInfo.job_country}
                            </p>
                            <div className='sub-job-details' >
                                {jobInfo.job_min_salary && jobInfo.job_max_salary ? <p className='job-salary mt-2 mx-2'>${formatSalary(jobInfo.job_min_salary)} - ${formatSalary(jobInfo.job_max_salary)}</p> : <p className='job-salary mt-2'>$ N/A</p>}
                                <p className='employment-type mt-2 mx-2'>{jobInfo.job_employment_type}</p>
                            </div>
                        </div>
                        <a href={jobInfo.job_apply_link}>Apply Now</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
