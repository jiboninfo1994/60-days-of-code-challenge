import { useEffect, useState } from 'react';
import {
  categoryReducerState,
  getCategories
} from '../app/reducers/category/categorySlice';
import PostForm from './PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, userReducerState } from '../app/reducers/users/usersSlice';
import {
  createPost,
  deletePost,
  getPosts,
  postReducerState,
  updatePost
} from '../app/reducers/posts/postsSlice';
import { formatDate } from '../app/common/common';
import ListTable from './ListTable';

const PostSection = () => {
  const [postValue, setPostValue] = useState({
    categoryId: '',
    authorId: '',
    postTitle: '',
    postDescription: '',
    likes: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editablePost, setEditablePost] = useState(null);
  const { isLoading, isError, categories } = useSelector(categoryReducerState);
  const {
    isLoading: userIsLoading,
    isError: userIsError,
    users
  } = useSelector(userReducerState);
  const {
    isLoading: postIsLoading,
    isError: postIsError,
    posts
  } = useSelector(postReducerState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  // Handle change
  const handleChane = (e) => {
    let { name, value } = e.target;

    if (name === 'likes') {
      if (isNaN(value.trim())) {
        value = '';
      }
    }

    setPostValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !postValue.categoryId ||
      !postValue.authorId ||
      !postValue.postTitle.trim() ||
      !postValue.postDescription ||
      !postValue.likes
    ) {
      return alert('All field are required');
    }

    const newPost = {
      id: Date.now() + '',
      title: postValue.postTitle,
      description: postValue.postDescription,
      author_id: postValue.authorId,
      category_id: postValue.categoryId,
      likes: postValue.likes,
      dateTime: formatDate(Date.now())
    };

    if (editMode) {
      dispatch(updatePost({ editablePost, postValue }));
      setEditMode(false);
      setEditablePost(null);
      resetForm();
    } else {
      dispatch(createPost(newPost));
      resetForm();
    }
  };

  // Handle edit
  const handleEdit = (post) => {
    setEditMode(true);
    setEditablePost(post);

    setPostValue({
      ...postValue,
      categoryId: post.category_id,
      authorId: post.author_id,
      postTitle: post.title,
      postDescription: post.description,
      likes: post.likes
    });
  };

  // Reset form
  const resetForm = () => {
    setPostValue({
      ...postValue,
      categoryId: '',
      authorId: '',
      postTitle: '',
      postDescription: '',
      likes: ''
    });
  };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/3">
            <PostForm
              categories={categories}
              isError={isError}
              isLoading={isLoading}
              userIsLoading={userIsLoading}
              userIsError={userIsError}
              users={users}
              onHandleSubmit={handleSubmit}
              postValue={postValue}
              onHandleChane={handleChane}
              editMode={editMode}
            />
          </div>
          <div className="w-2/3">
            <ListTable
              isLoading={postIsLoading}
              isError={postIsError}
              lists={posts}
              postDescription={'postDescription'}
              likes={'likes'}
              dateTime={'dateTime'}
              onDeleteHandler={deletePost}
              catList={categories}
              onEditHandler={handleEdit}
              userList={users}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostSection;
