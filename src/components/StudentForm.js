import React from 'react';

const StudentForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Student name ..."
        value={props.studentName}
        onChange={(e) => props.setStudentName(e.target.value)}
      />
      <button type="submit">
        {props.editMode ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
