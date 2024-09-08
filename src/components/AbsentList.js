import React from 'react';

const AbsentList = (props) => {
  return (
    <>
      {props.students && props.students.length > 0 && (
        <div className="absent-student-list list">
          <h2 style={{ marginBottom: '20px' }}>Absent Student List</h2>
          <ul>
            {props.absentStudent?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() => props.studentStatusHandler(item, 'toggle')}
                >
                  Accediently Added
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AbsentList;
