import React, { useContext } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const StudentStatusList = (props) => {
  const { studentStates, dispatch } = useContext(studentCTX);
  return (
    <>
      {studentStates.students && studentStates.students.length > 0 && (
        <div className="present-student-list list">
          <h2 style={{ marginBottom: '20px' }}>{props.heading}</h2>
          <ul>
            {props.statusStudentList?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'STUDENT_STATUS',
                      payload: { status: 'toggle', data: item }
                    })
                  }
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

export default StudentStatusList;
