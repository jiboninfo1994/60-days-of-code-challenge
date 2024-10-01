import CommentCard from './CommentCard';

const CommnetList = ({ comments }) => {
  return (
    <div className="mt-5">
      {comments &&
        comments?.length > 0 &&
        comments?.map((commnet) => (
          <CommentCard comment={commnet} key={commnet.id} />
        ))}
    </div>
  );
};

export default CommnetList;
