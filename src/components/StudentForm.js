import React, { useContext } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const StudentForm = () => {
  const { handleSubmit, studentName, setStudentName, editMode } =
    useContext(studentCTX);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student name ..."
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="submit">
        {editMode ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
