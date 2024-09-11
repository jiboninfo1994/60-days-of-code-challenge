import React, { useContext } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const AllStudentList = () => {
  const { studentStates, dispatch } = useContext(studentCTX);
  return (
    <>
      {studentStates.students && studentStates.students.length > 0 && (
        <div className="all-student-list list">
          <h2 style={{ marginBottom: '20px' }}>All Student List</h2>
          <ul>
            {studentStates.students?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'EDIT_STUDENT', payload: item })
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'DELETE_STUDENT',
                      payload: { id: item.id }
                    })
                  }
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'STUDENT_STATUS',
                      payload: { status: 'present', data: item }
                    })
                  }
                >
                  Add Present List
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'STUDENT_STATUS',
                      payload: { status: 'absent', data: item }
                    })
                  }
                >
                  Add Absent List
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AllStudentList;
