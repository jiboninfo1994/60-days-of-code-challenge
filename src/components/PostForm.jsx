const PostForm = ({
  isLoading,
  isError,
  categories,
  userIsLoading,
  userIsError,
  users,
  onHandleSubmit,
  postValue,
  onHandleChane,
  editMode
}) => {
  //   console.log(postValue);

  return (
    <form className="gap-5" onSubmit={onHandleSubmit}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>{isError}</p>}
      {!isLoading && !isError && categories && categories.length > 0 && (
        <select
          className="select select-primary w-full max-w-xs"
          value={postValue.categoryId}
          onChange={onHandleChane}
          name="categoryId"
        >
          <option selected>Select Category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      <div className="category mt-8">
        {userIsLoading && <p>Loading...</p>}
        {!userIsLoading && userIsError && <p>{isError}</p>}
        {!userIsLoading && !userIsError && users && users.length > 0 && (
          <select
            className="select select-primary w-full max-w-xs"
            value={postValue.authorId}
            onChange={onHandleChane}
            name="authorId"
          >
            <option selected>Select Author</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="items-end gap-5">
        <div className="flex flex-col gap-3 mt-8">
          <label className="inline-flex">Post Title</label>
          <input
            type="text"
            value={postValue.postTitle}
            onChange={onHandleChane}
            name="postTitle"
            placeholder="Post title..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col gap-3 mt-8 mb-8">
          <label className="mb-2 inline-flex">Post Title</label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Post description..."
            value={postValue.postDescription}
            onChange={onHandleChane}
            name="postDescription"
          ></textarea>
        </div>
        <div className="flex flex-col gap-3 mb-8">
          <label className="inline-flex">Total Like</label>
          <input
            type="text"
            value={postValue.likes}
            onChange={onHandleChane}
            name="likes"
            placeholder="Total like..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {editMode ? 'Update Post' : 'Add Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
