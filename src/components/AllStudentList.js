import React from 'react';

const AllStudentList = (props) => {
  return (
    <>
      {props.students && props.students.length > 0 && (
        <div className="all-student-list list">
          <h2 style={{ marginBottom: '20px' }}>All Student List</h2>
          <ul>
            {props.students?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button type="button" onClick={() => props.editHandler(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => props.deleteHandler(item.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => props.studentStatusHandler(item, 'present')}
                >
                  Add Present List
                </button>
                <button
                  type="button"
                  onClick={() => props.studentStatusHandler(item, 'absent')}
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
