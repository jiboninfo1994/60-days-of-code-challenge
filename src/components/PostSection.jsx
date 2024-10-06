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
  EDITABLE_POST,
  getPosts,
  postReducerState,
  updatePost
} from '../app/reducers/posts/postsSlice';
import ListTable from './ListTable';
import {
  crateTag,
  getTags,
  tagsReducerState
} from '../app/reducers/tags/tagsSlice';

const PostSection = () => {
  const [postValue, setPostValue] = useState({
    categoryId: '',
    authorId: '',
    postTitle: '',
    postDescription: '',
    inpuTagName: '',
    likes: 0
  });
  //   const [editMode, setEditMode] = useState(false);
  //   const [editablePost, setEditablePost] = useState(null);
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
    posts,
    editablePost
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

  // Handle change
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'likes') {
      if (isNaN(value.trim())) {
        value = '';
      }
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
      authorId: postValue.authorId,
      categoryId: postValue.categoryId,
      likes: postValue.likes,
      tags: selectedTagsId,
      createdAt: timeStamp,
      updatedAt: timeStamp
    };

    if (editablePost) {
      dispatch(updatePost({ editablePost, postValue, selectedTagsId }));
      //   setEditMode(false);
      dispatch(EDITABLE_POST(null));
      resetForm();
      setSelectedTagsId([]);
    } else {
      dispatch(createPost(newPost));
      resetForm();
      setSelectedTagsId([]);
    }
  };

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
    const isTagAlreadySelected = selectedTagsId?.includes(tag.id);

    if (!isTagAlreadySelected) {
      setSelectedTagsId([...selectedTagsId, tag.id]);
    }
    setPostValue({ ...postValue, inpuTagName: '' });
  };

  // Remove tag handler
  const handleRemoveTag = (tagId) => {
    const filterTag = selectedTagsId.filter((item) => item !== tagId);
    // console.log('filter Tag', filterTag);

    setSelectedTagsId(filterTag);
  };

  // Cansel update
  const cancleUpdateHandler = () => {
    resetForm();
    dispatch(EDITABLE_POST(null));
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
  //           createdAt: timeStamp,
  //           updatedAt: timeStamp
  //         };

  //         dispatch(crateTag(newTag));
  //         setPostValue({ ...postValue, inpuTagName: '' });
  //       }
  //     }

  const handleTagInputKeyDown = (e) => {
    const tagName = postValue.inpuTagName?.trim().toLowerCase();

    // Find the existing tag object, not just check for its existence
    const existingTag = tags?.find(
      (item) => item.name.toLowerCase() === tagName
    );

    if (e.key === 'Enter') {
      e.preventDefault();

      if (!existingTag && tagName) {
        const newTagId = createTagInLocal(tagName);
        setSelectedTagsId((prevTags) => [...prevTags, newTagId]);
      } else if (existingTag && !selectedTagsId.includes(existingTag.id)) {
        setSelectedTagsId((prevTags) => [...prevTags, existingTag.id]);
      }

      // Reset the input field after processing
      setPostValue({ ...postValue, inpuTagName: '' });
    }
  };

  const createTagInLocal = (tagName) => {
    const timeStamp = moment.utc().toISOString();
    const newTag = {
      id: Date.now() + '',
      name: tagName,
      createdAt: timeStamp,
      updatedAt: timeStamp
    };

    dispatch(crateTag(newTag));

    return newTag.id;
  };

  useEffect(() => {
    if (editablePost) {
      console.log(editablePost, 'editablePost');
      setSelectedTagsId(editablePost.tags);

      setPostValue({
        ...postValue,
        categoryId: editablePost.categoryId,
        authorId: editablePost.authorId,
        postTitle: editablePost.title,
        postDescription: editablePost.description,
        likes: editablePost.likes
      });
      dispatch(selectedAuthorsByCatId(editablePost.categoryId));
    }
  }, [editablePost]);

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
            tags={tags}
            selectedTagsId={selectedTagsId}
            onHandleSelectedTag={handleSelectedTag}
            onHandleRemoveTag={handleRemoveTag}
            onCancelUpdate={cancleUpdateHandler}
            onHandleTagInputKeyDown={handleTagInputKeyDown}
            editablePost={editablePost}
          />
        </div>
      </div>
    </section>
  );
};

export default PostSection;
