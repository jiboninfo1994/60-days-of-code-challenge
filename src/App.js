import { useState } from 'react';
import './App.css';

function App() {
  const [noteTitle, setNoteTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!noteTitle) {
      return alert('Note title field is required!');
    }
    editMode ? updateHandler() : createHandler();
  };

  // Create handler
  const createHandler = () => {
    const newNote = {
      id: Date.now().toString(),
      title: noteTitle
    };

    setNotes([...notes, newNote]);
    setNoteTitle('');
  };

  // Delete handler
  const deleteHandler = (id) => {
    setNotes(notes?.filter((item) => item.id !== id));
  };

  // Edit handler
  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
  };

  // Update Handler
  const updateHandler = () => {
    console.log('I am update');
    setNotes(
      notes.map((item) => {
        if (item.id === editableNote.id) {
          return { ...item, title: noteTitle };
        }

        return item;
      })
    );
    setEditMode(false);
    setEditableNote(null);
    setNoteTitle('');
  };

  return (
    <div className="App" style={{ marginTop: '40px' }}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Note title..."
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <button type="submit">{editMode ? 'Update Note' : 'Add Note'}</button>
      </form>
      <div className="note-list">
        <h2>Note List</h2>
        {notes && notes.length < 1 && <p>You don't have any Note!</p>}
        {notes && notes.length > 0 && (
          <ul>
            {notes?.map((note) => (
              <li key={note.id}>
                <span>{note.title}</span>
                <button type="button" onClick={() => editHandler(note)}>
                  Edit Note
                </button>
                <button type="button" onClick={() => deleteHandler(note.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
