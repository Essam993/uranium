import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import Nav from "./Nav";
import { StudentForm } from "./StudentForm";
import certificate from "../assets/imgs/certificate.webp";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "../assets/css/course.css";

const Course = (props) => {
  const location = useLocation();
  const courseData = location.state;

  const [modalOpen, setModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  // students
  const [data, setData] = useState({});

  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/1_EYRbzwGsAxlu1JBEv-Bd_Vi_STIzmcM-ueSA2s6Kx4/pub?output=csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
}, []);

const students = Array.from(data);
console.log(students)

  const handleSubmit = (newStudent) => {
    studentToEdit === null
      ? setData([...students, newStudent])
      : setData(
          students.map((currStudent, idx) => {
            if (idx !== studentToEdit) return currStudent;
            return newStudent;
          })
        );
  };

  return (
    <>
      <Nav />

      <div className="container">
        <div className="row d-flex justify-content-center align-items-center my-5">
          <div className="col-md-6 text-center">
            <img src={certificate} alt="" />
          </div>
          <div className="col-md-6 bg-custom p-5">
            <h1>{courseData.name}</h1>
            <hr />
            <div className="mt-5 mb-3">
              <h3>Description</h3>
              <p>{courseData.description}</p>
            </div>

            <div className="mb-3">
              <h3>Status</h3>
              <p className="text-success fw-bold">{courseData.status}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <button
              className="btn-success py-2 px-3 w-50"
              onClick={() => setModalOpen(true)}
            >
              Enroll Student
            </button>
            {modalOpen && (
              <StudentForm
                closeModal={() => {
                  setModalOpen(false);
                }}
                course={courseData.name}
                onSubmit={handleSubmit}
                defaultValue={studentToEdit !== null && students[studentToEdit]}
              />
            )}
          </div>
          <div className="col-md-12 table-wrapper mb-5">
            <table className="table table-light table-hover">
              <thead>
                <tr className="table-custom p-3">
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => {
                  if(student.course === courseData.name)
                  return (
                    <tr key={idx}>       
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>




    </>
  );
};

export default Course;
