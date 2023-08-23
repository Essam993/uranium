import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";

import "../assets/css/Modal.css";

export const StudentForm = ({ closeModal, onSubmit, defaultValue, course }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: Math.random(),
      name: "",
      age: "",
      course: course,
      created_at: new Date(),
    }
  );
  const [errors, setErrors] = useState("");

  // validation
  const validateForm = () => {
    if (formState.name && formState.age && formState.course) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // submit data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  // Reset
  const handleReset = () => {
    setFormState({
      id: Math.random(),
      name: "",
      age: "",
      course: "",
      created_at: new Date(),
    });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <div className="m-0 custom-modal-header d-flex justify-content-between align-items-center">
          <h3 className="text-light mb-0">Student Registeration</h3>
          <button
            type="button"
            className="btn text-light mx-3 px-0 fw-bold"
            onClick={closeModal}
          >
            <BsXLg />
          </button>
        </div>

        <form>
          <div className="form-group ">
            <label htmlFor="name">name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="username">age</label>
            <input
              name="age"
              onChange={handleChange}
              value={formState.age}
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">course</label>
            <select
              name="course"
              onChange={handleChange}
              value={formState.course}
            >
              <option value={formState.course}>{course}</option>
            </select>
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="row d-flex flex-row justify-content-between">
            <div className="col-md-3">
              <button type="button" className="btn reset" onClick={handleReset}>
                Reset
              </button>
            </div>
            <div className="col-md-8 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-light action-button cancel mx-3"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success action-button add"
                onClick={handleSubmit}
              >
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
