import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Container from "react-bootstrap/Container";
import { Courses } from "./components/Courses";
import { Modal } from "./components/Modal";
import "./App.css";

import Nav from "./components/Nav";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  // course
  const [data, setData] = useState({});

  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/1JMFazW6R6YcO-y6ZiKIcnpk1P1PD86SESUB8Mpge5I8/pub?output=csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
}, []);



  const rows = Array.from(data);
  console.log(rows)

  const handleDeleteRow = (targetIndex) => {
    setData(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setData([...rows, newRow])
      : setData(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <Container fluid>
      <div className="row justify-content-start">
        <div
          className="col-md-12"
        >
          <div className="row ">
            <Nav />
            <div className="col-md-12 p-5">
              <div className="d-flex justify-content-between align-items-center p-3 mb-5 custom-shadow">
                <h3 className="fw-bold">All Courses</h3>
                <button
                  className="btn-success py-2 px-3"
                  onClick={() => setModalOpen(true)}
                >
                  Add Course
                </button>
                {modalOpen && (
                  <Modal
                    closeModal={() => {
                      setModalOpen(false);
                      setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]}
                  />
                )}
              </div>
              <Courses
                rows={rows}
                deleteRow={handleDeleteRow}
                editRow={handleEditRow}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
