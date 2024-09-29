import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { crateTag } from '../app/reducers/tags/tagsSlice';
import { useLocation } from 'react-router-dom';

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
  editMode,
  tags,
  selectedTagsId,
  onHandleSelectedTag,
  onHandleRemoveTag,
  onCancelUpdate,
  onHandleTagInputKeyDown
}) => {
  const filterTags = tags?.filter((item) =>
    item.name.toLowerCase().includes(postValue.inpuTagName?.toLowerCase())
  );

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
          <option value="">Select Category</option>
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
        {!userIsLoading && !userIsError && (
          <select
            className="select select-primary w-full max-w-xs"
            value={postValue.authorId}
            onChange={onHandleChane}
            name="authorId"
            disabled={!postValue.categoryId || users.length < 1}
          >
            <option value="">Select Author</option>
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
          <label className="inline-flex">Post Tag</label>
          <div className="relative border rounded">
            <input
              type="text"
              value={postValue.inpuTagName}
              onChange={onHandleChane}
              onKeyDown={onHandleTagInputKeyDown}
              name="inpuTagName"
              placeholder="Type tag..."
              className="input w-full w-full"
              disabled={!postValue.authorId}
            />

            <div className="flex flex-wrap gap-2 left-1 w-full">
              {selectedTagsId?.map((tagId, index) => {
                const findTagName = tags?.find((item) => item.id === tagId);

                return (
                  <span
                    key={index}
                    className="px-2 py-1 rounded flex items-center gap-1"
                  >
                    {findTagName?.name}
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => onHandleRemoveTag(tagId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          {postValue.inpuTagName && filterTags && filterTags.length > 0 && (
            <ul className="border border-cyan-300 p-5 rounded">
              {filterTags?.map((tag) => {
                return (
                  <li
                    key={tag.id}
                    className="cursor-pointer border-b pb-1 border-cyan-950 mb-2"
                    onClick={() => onHandleSelectedTag(tag)}
                  >
                    {tag.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <label className="inline-flex">Post Title</label>
          <input
            type="text"
            value={postValue.postTitle}
            onChange={onHandleChane}
            name="postTitle"
            placeholder="Post title..."
            className="input input-bordered w-full max-w-xs"
            disabled={selectedTagsId?.length < 1}
          />
        </div>
        <div className="flex flex-col gap-3 mt-8 mb-8">
          <label className="mb-2 inline-flex">Post Description</label>
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
        <div className="flex gap-3">
          <button className="btn btn-primary" type="submit">
            {editMode ? 'Update Post' : 'Add Post'}
          </button>
          {editMode && (
            <button
              onClick={onCancelUpdate}
              className="btn btn-primary"
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PostForm;
