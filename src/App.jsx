import { useEffect, useState } from "react";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
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

    // company: "TOMMY";
    // dates: "December 2015 - Present";
    // duties: (3)[
    //   ("Tote bag sartorial mlkshk air plant vinyl banjo lu…ch neutra. Hammock photo booth live-edge disrupt.",
    //   "Post-ironic selvage chambray sartorial freegan med… toast street art cloud bread live-edge heirloom.",
    //   "Butcher drinking vinegar franzen authentic messeng…ffee franzen cloud bread tilde vegan flexitarian.")
    // ];
    // id: "recAGJfiU4CeaV0HL";
    // order: 3;
    // title: "Full Stack Web Developer";
  }, []);

  const activeJob = (id) => {
    const newIndex = jobs.filter((job) => {
      if (job.id === id) {
        return setIndex(jobs.indexOf(job));
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="btn-container">
        {jobs.map((job) => {
          return (
            <button
              key={job.id}
              className="job-btn"
              onClick={() => activeJob(job.id)}
            >
              {job.company}
            </button>
          );
        })}
      </section>
      <h1>{jobs[index].title}</h1>
      <section className="jobs-center">
        <div className="job-company">{jobs[index].company}</div>
        <div className="job-date">{jobs[index].dates}</div>
        <div className="job-desc">
          <article>
            {jobs[index].duties.map((duty, i) => {
              return (
                <div key={i}>
                  <span className="job-icon">""</span>
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
    </main>
  );
};
export default App;
