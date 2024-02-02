import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { v4 as uuid } from "uuid";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  //allJobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const response = await fetch(url);
      const allJobs = await response.json();
      setJobs(allJobs);
      console.log(allJobs);
      setIsLoading(false);
    };
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="jobs-center">
        <div className="loading"></div>;
      </section>
    );
  }

  return (
    <main>
      <div className="jobs-center">
        <section className="btn-container">
          {jobs.map((job, i) => {
            return (
              <button
                key={job.id}
                className={`job-btn ${i === index ? "active-btn" : null}`}
                onClick={() => setIndex(i)}
              >
                {job.company}
              </button>
            );
          })}
        </section>

        <article className="jobs-info">
          <h3>{jobs[index].title}</h3>
          <div className="job-company">{jobs[index].company}</div>
          <div className="job-date">{jobs[index].dates}</div>
          <div>
            {jobs[index].duties.map((duty) => {
              return (
                <div key={uuid()} className="job-desc">
                  <FaAngleDoubleRight className="job-icon" />
                  <p>{duty}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
};
export default App;
