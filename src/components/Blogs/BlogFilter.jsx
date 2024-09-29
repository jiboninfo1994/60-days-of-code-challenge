import { useDispatch, useSelector } from 'react-redux';
import {
  categoryReducerState,
  getCategories
} from '../../app/reducers/category/categorySlice';
import { useEffect, useState } from 'react';
import { getTags, tagsReducerState } from '../../app/reducers/tags/tagsSlice';
import {
  getUsers,
  userReducerState
} from '../../app/reducers/users/usersSlice';
import { getPosts } from '../../app/reducers/posts/postsSlice';

const BlogFilter = () => {
  const [filterValue, setFiltervalue] = useState({
    category: '',
    tag: '',
    author: '',
    search: ''
  });
  const { categories } = useSelector(categoryReducerState);
  const { tags } = useSelector(tagsReducerState);
  const { users } = useSelector(userReducerState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getTags());
  }, [dispatch]);

  // Handle submit
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPosts(filterValue));
    // setFiltervalue({ ...filterValue, category: '' });
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFiltervalue({
      ...filterValue,
      [name]: value
    });
  };

  return (
    <form onSubmit={HandleSubmit}>
      <div className="px-7 mb-12 flex gap-4">
        {categories && categories.length > 0 && (
          <select
            name="category"
            value={filterValue.category}
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        {tags && tags.length > 0 && (
          <select
            name="tag"
            value={filterValue.tag}
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option value="">Select Tag</option>
            {tags.map((tag) => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        )}
        {users && users.length > 0 && (
          <select
            name="author"
            value={filterValue.author}
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option value="">Select Author</option>
            {users.map((author) => (
              <option value={author.id} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        )}
        <input
          name="search"
          value={filterValue.search}
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Filter</button>
      </div>
    </form>
  );
};

export default BlogFilter;
