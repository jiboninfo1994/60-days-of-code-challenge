import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, studentStatusHandle } from '../app/features/Student';

const AllStudent = ({ setEditMode, setStudentName, setEditableStudent }) => {
  const { students } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Edit handler
  const editHandler = (student) => {
    setEditMode(true);
    setStudentName(student.name);
    setEditableStudent(student);
  };

  return (
    <div>
      <h2>All Student</h2>
      <ListGroup>
        {students && students.length > 0 ? (
          students?.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{item.name}</span>
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => editHandler(item)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => dispatch(deleteStudent(item.id))}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() =>
                    dispatch(
                      studentStatusHandle({ student: item, status: 'present' })
                    )
                  }
                >
                  Present
                </Button>
                <Button
                  variant="warning"
                  onClick={() =>
                    dispatch(
                      studentStatusHandle({ student: item, status: 'absent' })
                    )
                  }
                >
                  Absent
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>There is no student</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default AllStudent;
