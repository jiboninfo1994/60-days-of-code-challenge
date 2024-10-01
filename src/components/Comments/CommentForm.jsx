import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../app/reducers/comments/commentsSlice';

const CommentForm = ({ blogId }) => {
  const [title, setTitle] = useState('');
  const timeStamp = moment.utc().toISOString();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert('Title field is required!');
    }
    const newComment = {
      id: Date.now() + '',
      title,
      blogId,
      created_at: timeStamp
    };

    dispatch(createComment(newComment));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Comment..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <button type="submit" className="btn btn-primary">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
