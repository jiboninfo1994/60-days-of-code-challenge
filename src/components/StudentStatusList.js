import React, { useContext } from 'react';
import { studentCTX } from '../contexts/StudentContext';

const StudentStatusList = (props) => {
  const { students, studentStatusHandler } = useContext(studentCTX);
  return (
    <>
      {students && students.length > 0 && (
        <div className="present-student-list list">
          <h2 style={{ marginBottom: '20px' }}>{props.heading}</h2>
          <ul>
            {props.statusStudentList?.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() => studentStatusHandler(item, 'toggle')}
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
