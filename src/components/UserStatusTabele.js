import React from 'react';
import { Button, Table } from 'react-bootstrap';

const UserStatusTabele = () => {
  return (
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td className="d-flex gap-2">
            <Button variant="primary" type="button">
              Accidentally Added
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserStatusTabele;
