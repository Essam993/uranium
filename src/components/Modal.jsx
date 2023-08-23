import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";

import "../assets/css/Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: Math.random(),
      name: "",
      description: "",
      status: "Active",
      created_at: new Date(),
    }
  );
  const [errors, setErrors] = useState("");

  // validation
  const validateForm = () => {
    if (formState.name && formState.description && formState.status) {
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
      description: "",
      status: "",
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
          <h3 className="text-light mb-0">Add New User</h3>
          <button
            type="button"
            className="btn text-light mx-3 px-0 fw-bold"
            onClick={closeModal}
          >
            <BsXLg />
          </button>
        </div>

        <form id="create-course-form">
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="username">description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
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
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
