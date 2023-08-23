import React from "react";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "../assets/css/courses.css";
import "../assets/css/table.css";


export const Courses = ({ rows, deleteRow, editRow }) => {


  return (
    <>

    <div className="container">
      <div className="row">

      {rows.map((row, idx) => {
            return (

              <div className="col-md-6 mb-3" key={idx}>
                <div className="custom-card">
                      <Link to="/course" state={row}>
                        <div className="col-md-12 text-light">
                            <h2 className="fw-bold">{row.name}</h2>
                            <p className="fw-thin">{row.description}</p>
                            <h6 className={row.status === "Active" ? " fw-bold text-success" : "fw-bold text-danger"}>{row.status}</h6>
                            <p>{row.created}</p>
                        </div>
                      </Link>
                      <div className="actions">
                          <button className="btn-danger" onClick={() => deleteRow(idx)}>
                              <BsFillTrashFill />
                          </button>
                          <button className="btn-success" onClick={() => editRow(idx)}>
                            <BsFillPencilFill />
                          </button>
                      </div>
                  </div>
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
};
