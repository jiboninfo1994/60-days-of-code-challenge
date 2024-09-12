import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [noteTitle, setNotetitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  // Fetch Data
  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/notes');
    const data = await response.json();

    setNotes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (noteTitle.trim() === '') {
      return alert('Note title field is required!');
    }

    editMode ? updateHandler() : createHandler();
  };

  // Create handler
  const createHandler = async () => {
    const newNote = {
      id: Date.now() + '',
      title: noteTitle
    };

    const response = await fetch('http://localhost:4000/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    });
    const data = response.json();

    // setNotes([...notes, newNote]);
    setNotes(data);
    setNotetitle('');

    await fetchData();
  };

  // Edit handler
  const editHandler = (note) => {
    setEditMode(true);
    setNotetitle(note.title);
    setEditableNote(note);
  };

  // Update handler
  const updateHandler = async () => {
    const { id, ...rest } = editableNote;
    const updateNote = { ...rest, title: noteTitle };
    const response = await fetch(
      `http://localhost:4000/notes/${editableNote.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateNote)
      }
    );
    const data = response.json();

    setNotes(data);
    setEditMode(false);
    setNotetitle('');
    setEditableNote(null);

    await fetchData();
  };

  // Delete handler
  const deleteHandler = async (id) => {
    const response = await fetch(`http://localhost:4000/notes/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();

    setNotes(data);

    await fetchData();
  };

  return (
    <div className="App pt-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form className="mb-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter note title..."
                  value={noteTitle}
                  onChange={(e) => setNotetitle(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? 'Update Note' : 'Add Note'}
              </Button>
            </Form>

            {notes &&
              notes.length > 0 &&
              notes.map((item) => (
                <ListGroup key={item.id}>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>{item.title}</span>
                    <div className="button-wrapper d-flex gap-3">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => editHandler(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
