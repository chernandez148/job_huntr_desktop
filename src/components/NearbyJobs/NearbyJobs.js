import { useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import './NearbyJobs.css';

function NearbyJobs({ jobData }) {
    const [position, setPosition] = useState(0)
    console.log(jobData);
    console.log(position)


    const handlePrev = () => {
        if (position !== 0) {
            setPosition((position) => position - 1080); // Adjust the value as needed
        }
    };

    const handleForward = () => {
        if (position < 1080) {
            setPosition((position) => position + 1080); // Adjust the value as needed
        } else {
            setPosition(0)
        }
    };

    return (
        <div className='NearbyJobs py-5'>
            <h5 className='py-3'>Nearby Jobs</h5>
            <div className='nearby-jobs-wrapper'>
                <button onClick={handlePrev}><GrFormPrevious /></button>
                <div className='job-card-wrapper'>
                    {jobData.data && jobData.data.map((jobInfo) => (
                        <div
                            className='job-card'
                            style={{ left: `-${position}px` }}
                            key={jobInfo.id}
                        >
                            <div className='job-details'>
                                <p className="job-title">{jobInfo.job_title}</p>
                                <p className="employer-name">{jobInfo.employer_name}</p>
                                <p className='job-city'>{jobInfo.job_city}, {jobInfo.job_country}</p>
                            </div>
                            <a href={jobInfo.job_apply_link}>Apply Now</a>
                        </div>
                    ))}
                </div>
                <button onClick={handleForward}><GrFormNext /></button>
            </div>
        </div>
    );
}

export default NearbyJobs;
