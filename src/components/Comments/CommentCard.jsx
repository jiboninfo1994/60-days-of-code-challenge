const CommentCard = ({ comment }) => {
  return (
    <div className="border rounded max-w-2xl p-5 mb-4">
      <h2>User</h2>
      <p>{comment?.title}</p>
    </div>
  );
};

export default CommentCard;
