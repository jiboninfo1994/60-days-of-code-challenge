import React, { useContext } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const AllStudentList = () => {
  const { students, editHandler, deleteHandler, studentStatusHandler } =
    useContext(studentCTX);
  return (
    <>
      {students && students.length > 0 && (
        <div className="all-student-list list">
          <h2 style={{ marginBottom: '20px' }}>All Student List</h2>
          <ul>
            {students?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button type="button" onClick={() => editHandler(item)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteHandler(item.id)}>
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => studentStatusHandler(item, 'present')}
                >
                  Add Present List
                </button>
                <button
                  type="button"
                  onClick={() => studentStatusHandler(item, 'absent')}
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
