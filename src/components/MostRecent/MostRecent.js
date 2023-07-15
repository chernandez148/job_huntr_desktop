import React, { useState } from 'react';
import './MostRecent.css';

function MostRecent({ jobData }) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    console.log(jobData)

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
        <div className="MostRecent">
            <h5>Most Recent</h5>
            <div className='most-recent-wrapper d-flex'>
                <div className="most-recent-cards w-50">
                    {jobData.data &&
                        jobData.data.map((jobInfo, index) => (
                            <div
                                className="recent-card"
                                key={jobInfo.id}
                                onClick={() => setSelectedCardIndex(index)}
                            >
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
                <div className='most-recent-card-info ms-5 mt-3 px-4 pb-5 w-50'>
                    {jobData.data && jobData.data.length > 0 && (
                        <>
                            {jobData.data[selectedCardIndex].employee_logo ? (
                                <img src={jobData.data[selectedCardIndex].employee_logo} alt="Company Logo" width="50%" />
                            ) : (
                                <img src="https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg" alt="Fallback Logo" width="150px" />
                            )}
                            <h5>{jobData.data[selectedCardIndex].job_title}</h5>
                            <p className='m-0 p-0'>{jobData.data[selectedCardIndex].employer_name}</p>
                            <p className='m-0 p-0'>{jobData.data[selectedCardIndex].job_city}, {jobData.data[selectedCardIndex].job_state}</p>
                            <div className='sub-job-details mb-2'>
                                {jobData.data[selectedCardIndex].job_min_salary && jobData.data[selectedCardIndex].job_max_salary ? (
                                    <p className='job-salary mt-2'>${formatSalary(jobData.data[selectedCardIndex].job_min_salary)} - ${formatSalary(jobData.data[selectedCardIndex].job_max_salary)}</p>
                                ) : (
                                    <p className='job-salary mt-2'>$ N/A</p>
                                )}
                                <p className='employment-type mt-2 mx-2'>{jobData.data[selectedCardIndex].job_employment_type}</p>
                            </div>
                            <a href={jobData.data[selectedCardIndex].job_apply_link}>Apply Now</a>
                            <hr className='my-5' />
                            <div className='responsibilities-qualification-and-requierments'>
                                <h6>Responsibilities</h6>
                                <ul>
                                    {jobData.data[selectedCardIndex].job_highlights.Responsibilities &&
                                        jobData.data[selectedCardIndex].job_highlights.Responsibilities.length > 0 ? (
                                        jobData.data[selectedCardIndex].job_highlights.Responsibilities.map((responsibility) => (
                                            <li key={responsibility}>{responsibility}</li>
                                        ))
                                    ) : (
                                        <li>No responsibilities to display</li>
                                    )}
                                </ul>
                                <h6>Qualifications</h6>
                                <ul>
                                    {jobData.data[selectedCardIndex].job_highlights.Qualifications &&
                                        jobData.data[selectedCardIndex].job_highlights.Qualifications.length > 0 ? (
                                        jobData.data[selectedCardIndex].job_highlights.Qualifications.map((qualifications) => (
                                            <li key={qualifications}>{qualifications}</li>
                                        ))
                                    ) : (
                                        <li>No qualifications to display</li>
                                    )}
                                </ul>
                                <h6>Benefits</h6>
                                <ul>
                                    {jobData.data[selectedCardIndex].job_highlights.Benefits &&
                                        jobData.data[selectedCardIndex].job_highlights.Benefits.length > 0 ? (
                                        jobData.data[selectedCardIndex].job_highlights.Benefits.map((benefits) => (
                                            <li key={benefits}>{benefits}</li>
                                        ))
                                    ) : (
                                        <li>No benefits to display</li>
                                    )}
                                </ul>
                            </div>
                            {/* Add other job details here */}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default MostRecent;
