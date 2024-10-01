import { useDispatch, useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommnetList from './CommnetList';
import {
  commentsReducerState,
  getComments
} from '../../app/reducers/comments/commentsSlice';
import { useEffect } from 'react';

const CommentSection = ({ blogId }) => {
  const { isLoading, isError, comments } = useSelector(commentsReducerState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(blogId));
  }, [dispatch, blogId]);

  return (
    <>
      <h2 className="text-4xl mb-8">Total Comments ({comments?.length})</h2>
      <div className="border p-10 rounded max-w-2xl">
        <h3 className="text-xl mb-4">Leave a comment</h3>
        <CommentForm blogId={blogId} />
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>Commnet not found!</p>}
        {!isLoading && !isError && comments && comments.length > 0 && (
          <CommnetList comments={comments} />
        )}
      </div>
    </>
  );
};

export default CommentSection;
