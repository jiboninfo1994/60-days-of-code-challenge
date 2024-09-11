import React, { useContext, useEffect } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const StudentForm = () => {
  const { handleSubmit, dispatch, studentStates } = useContext(studentCTX);
  //   console.log('studentStates', studentStates);

  //   useEffect(() => {
  //     console.log(studentStates, studentStates?.studentName);
  //   }, [studentStates.studentName]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student name ..."
        value={studentStates.studentName}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_STUDENT_NAME', payload: e.target.value })
        }
      />
      <button type="submit">
        {studentStates.editMode ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
