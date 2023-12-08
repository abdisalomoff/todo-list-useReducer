import React from 'react';

const ContactList = ({ todo, editTodo, deleteTodo }) => {
  const { id, name, lastname, category, telephone } = todo;

  return (
    <div className="contact-card">
      <div className="contact-list d-flex justify-content-between align-items-center w-75 mx-auto alert alert-primary">
        <div className="contact-list-content">
          <span>{name} </span>
          <span>{lastname} </span>
          <span className="text-success">{category} </span> <br />
          <span>{telephone} </span>
        </div>
        <div className="buttons d-flex">
          <button className="btn btn-primary d-block me-2" onClick={editTodo}>
            Edit
          </button>
          <button className="btn btn-danger d-block" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
