import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  categoryReducerState,
  getCategories
} from '../app/reducers/category/categorySlice';
import PostForm from './PostForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  selectedAuthorsByCatId,
  userReducerState
} from '../app/reducers/users/usersSlice';
import {
  createPost,
  deletePost,
  getPosts,
  postReducerState,
  updatePost
} from '../app/reducers/posts/postsSlice';
import ListTable from './ListTable';
import {
  crateTag,
  getTags,
  searchTagByTitle,
  tagsReducerState
} from '../app/reducers/tags/tagsSlice';
import { useLocation } from 'react-router-dom';

const PostSection = () => {
  const [postValue, setPostValue] = useState({
    categoryId: '',
    authorId: '',
    postTitle: '',
    postDescription: '',
    inpuTagName: '',
    likes: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [editablePost, setEditablePost] = useState(null);
  const [selectedTagsId, setSelectedTagsId] = useState([]);
  const { isLoading, isError, categories } = useSelector(categoryReducerState);
  const {
    isLoading: userIsLoading,
    isError: userIsError,
    users,
    authorByCategories
  } = useSelector(userReducerState);
  const {
    isLoading: postIsLoading,
    isError: postIsError,
    posts
  } = useSelector(postReducerState);
  const {
    isLoading: tagIsLoading,
    isError: tagIsError,
    tags
  } = useSelector(tagsReducerState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getTags());
  }, [dispatch]);

  //
  //   useEffect(() => {
  //     if (postValue.inpuTagName) {
  //       dispatch(selectedAuthorsByCatId(postValue.inpuTagName));
  //     }
  //   }, [dispatch, postValue.inpuTagName]);

  // Handle change
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'likes') {
      if (isNaN(value.trim())) {
        value = '';
      }
    }

    if (name === 'inpuTagName') {
      dispatch(searchTagByTitle(value));
    }

    if (name === 'categoryId') {
      dispatch(selectedAuthorsByCatId(value));
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

    const timeStamp = moment.utc().toISOString();

    const newPost = {
      id: Date.now() + '',
      title: postValue.postTitle,
      description: postValue.postDescription,
      author_id: postValue.authorId,
      category_id: postValue.categoryId,
      likes: postValue.likes,
      tags: selectedTagsId,
      created_at: timeStamp,
      updated_at: timeStamp
    };

    if (editMode) {
      dispatch(updatePost({ editablePost, postValue, selectedTagsId }));
      setEditMode(false);
      setEditablePost(null);
      resetForm();
      setSelectedTagsId([]);
    } else {
      dispatch(createPost(newPost));
      resetForm();
      setSelectedTagsId([]);
    }
  };

  // Handle edit
  const { state } = useLocation();
  const handleEdit = () => {
    setEditMode(true);
    setEditablePost(state);
    setSelectedTagsId(state.tags);
    setPostValue({
      ...postValue,
      categoryId: state.category_id,
      authorId: state.author_id,
      postTitle: state.title,
      postDescription: state.description,
      likes: state.likes
    });

    dispatch(selectedAuthorsByCatId(state.category_id));
  };

  useEffect(() => {
    handleEdit();
  }, []);

  // Reset form
  const resetForm = () => {
    setPostValue({
      ...postValue,
      categoryId: '',
      authorId: '',
      postTitle: '',
      postDescription: '',
      likes: 0
    });
  };

  // handle selectd tag
  const handleSelectedTag = (tag) => {
    console.log(tag);

    const isTagAlreadySelected = selectedTagsId?.includes(tag.id);

    if (!isTagAlreadySelected) {
      setSelectedTagsId([...selectedTagsId, tag.id]);
    }
    setPostValue({ ...postValue, inpuTagName: '' });
  };

  console.log(selectedTagsId, 'selectedTagsId');

  // Remove tag handler
  const handleRemoveTag = (tagId) => {
    const filterTag = selectedTagsId.filter((item) => item !== tagId);
    // console.log('filter Tag', filterTag);

    setSelectedTagsId(filterTag);
  };

  // Cansel update
  const cancleUpdateHandler = () => {
    resetForm();
    setEditMode(false);
    setEditablePost(null);
    setSelectedTagsId([]);
  };

  // Handle tag input keydown
  //   const handleTagInputKeyDown = (e) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault();

  //       const tagName = postValue.inpuTagName?.trim().toLowerCase();
  //       const existingTag = tags
  //         ?.map((item) => item.name.toLowerCase())
  //         .includes(tagName);

  //       if (!existingTag) {
  //         const timeStamp = moment.utc().toISOString();
  //         const newTag = {
  //           id: Date.now() + '',
  //           name: tagName,
  //           created_at: timeStamp,
  //           updated_at: timeStamp
  //         };

  //         dispatch(crateTag(newTag));
  //         setPostValue({ ...postValue, inpuTagName: '' });
  //       }
  //     }
  const handleTagInputKeyDown = (e) => {
    const tagName = postValue.inpuTagName?.trim().toLowerCase();
    const existingTag = tags
      ?.map((item) => item.name.toLowerCase())
      .includes(tagName);

    if (e.key === 'Enter') {
      e.preventDefault();

      if (!existingTag && tagName) {
        createTagInLocal(tagName);
      }
      return;
    }

    // if (typingTime) {
    //   clearTimeout(typingTime);
    // }

    // const timeOutId = setTimeout(() => {
    //   if (!existingTag && tagName) {
    //     createTagInLocal(tagName);
    //   }
    // }, 5000);

    // setTypingTime(timeOutId);
  };

  //   useEffect(() => {
  //     return () => {
  //       if (typingTime) {
  //         clearTimeout(typingTime);
  //       }
  //     };
  //   }, [typingTime]);

  const createTagInLocal = (tagName) => {
    const timeStamp = moment.utc().toISOString();
    const newTag = {
      id: Date.now() + '',
      name: tagName,
      created_at: timeStamp,
      updated_at: timeStamp
    };

    dispatch(crateTag(newTag));
    setPostValue({ ...postValue, inpuTagName: '' });
  };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className=" mb-4 flex-wrap">
          <PostForm
            categories={categories}
            isError={isError}
            isLoading={isLoading}
            userIsLoading={userIsLoading}
            userIsError={userIsError}
            users={authorByCategories}
            onHandleSubmit={handleSubmit}
            postValue={postValue}
            onHandleChane={handleChange}
            editMode={editMode}
            tags={tags}
            selectedTagsId={selectedTagsId}
            onHandleSelectedTag={handleSelectedTag}
            onHandleRemoveTag={handleRemoveTag}
            onCancelUpdate={cancleUpdateHandler}
            onHandleTagInputKeyDown={handleTagInputKeyDown}
          />
          {/* <div className="w-2/3">
            <ListTable
              isLoading={postIsLoading}
              isError={postIsError}
              lists={posts}
              postDescription={'postDescription'}
              likes={true}
              created_at={true}
              updatedAt={true}
              onDeleteHandler={deletePost}
              catList={categories}
              onEditHandler={handleEdit}
              userList={users}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PostSection;
