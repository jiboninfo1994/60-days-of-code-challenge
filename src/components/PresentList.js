import React from 'react';

const PresentList = (props) => {
  return (
    <>
      {props.students && props.students.length > 0 && (
        <div className="present-student-list list">
          <h2 style={{ marginBottom: '20px' }}>Present Student List</h2>
          <ul>
            {props.presentStudent?.map((item) => (
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

export default PresentList;
