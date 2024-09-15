import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { studentStatusHandle } from '../app/features/Student';

const StudentStatusList = ({ heading, statusList, removeStudentHandler }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{heading}</h2>
      <ListGroup>
        {statusList && statusList.length > 0 ? (
          statusList?.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{item.name}</span>
              <div className="d-flex gap-2">
                <Button
                  variant="warning"
                  onClick={() =>
                    dispatch(
                      studentStatusHandle({ student: item, status: 'toggle' })
                    )
                  }
                >
                  Accedinetly Added
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeStudentHandler(item)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            There is no student!
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default StudentStatusList;
