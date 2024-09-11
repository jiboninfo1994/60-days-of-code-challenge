import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { userContextApi } from '../context/UserContext';

const AllUserTable = () => {
  const { userState } = useContext(userContextApi);
  console.log(userState);

  return (
    <>
      {userState?.users && userState?.users?.length > 0 && (
        <>
          <h2>All User</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userState?.users?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td className="d-flex gap-2">
                    <Button variant="primary" type="button">
                      Edit
                    </Button>
                    <Button variant="primary" type="button">
                      Delete
                    </Button>
                    <Button variant="primary" type="button">
                      Present
                    </Button>
                    <Button variant="primary" type="button">
                      Absent
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AllUserTable;
