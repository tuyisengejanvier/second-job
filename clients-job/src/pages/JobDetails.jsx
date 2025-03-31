import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader";
import { PiBagFill } from "react-icons/pi";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch(`http://localhost:3000/all-jobs/${id}`)
=======
    fetch(`https://backend-neon-mu-52.vercel.app/v1/jobs/${id}`)
>>>>>>> 92a1333 (frist commit)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL",
    });
   
  if (url) {
    Swal.fire({
      text: "Your application has been submitted successfully!",
      icon: "success",
    });
  }
};

  return (
    <>
      <PageHeader title={"Single Job Page "} path={"Job Details"} />
      <div className="max-w-screen-2xl  container mx-auto xl:px-24 px-4">
        <div className="w-1/3 my-10 gap-8">
          <h2 className="font-semibold text-sm">Job Id: {id}</h2>

          <div>
            <h1 className="text-blue font-semibold">{job.jobTitle}</h1>
            <p className="text-primary/70 text-sm ">{job.description}</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <p className="font-semibold flex items-center gap-2">
              {" "}
              <PiBagFill />
              Job Type
            </p>
            <div className="flex gap-3">
              <button className="bg-blue px-8  text-white">
                {job.employmentType}
              </button>
              <button
                className="bg-purple-950/80 px-8 text-white"
                onClick={handleApply}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <div className="container">

          {/* second part */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefits Section */}
            <div className=" bg-white">
              <h2 className="text-xl font-semibold mb-4">Benefits</h2>
              <ul className=" text-primary/70">
                <li>$80-120k</li>
                <li>Disability insurance</li>
                <li>Employee discount</li>
                <li>Flexible spending account</li>
                <li>Health insurance</li>
                <li>Paid time off</li>
                <li>Vision insurance</li>
                <li>Volunteer time off</li>
                <li>Dental insurance</li>
              </ul>
            </div>

            {/* Outline Section */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4">Outline</h2>
              <p className=" text-primary/70">
                Grand Canyon Education (GCE) is a rapidly growing educational
                service company that has long been an industry leader in
                providing educational, operational, and technological support
                services to the post-secondary education sector. We put people
                first, drive innovation, and do good in the community that we
                live and work in.
              </p>
              <p className="mt-4  text-primary/70">
                This position entails joining a web design and development team
                called Academic Web Services within Grand Canyon Education to
                build custom web apps. Academic Web Services is a close-knit
                team that constructs and maintains a wide variety of
                applications using the latest web technologies.
              </p>
            </div>

            {/* Future Growth Section */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4">Future Growth</h2>
              <p className=" text-primary/70">
                An industry leader in providing educational, operational, and
                technological support services to the post-secondary education
                sector. We put people first, drive innovation, and do good in
                the community that we live and work in.
              </p>
              <p className="mt-4  text-primary/70">
                We're passionate about web design and development and are
                focused on delivering quality products to our customers in a
                team setting driven by strong culture and a good working
                atmosphere. We are hiring web developers at all levels of
                experience. Requirements below reflect the minimum experience
                level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
