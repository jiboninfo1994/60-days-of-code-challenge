import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, postReducerState } from '../app/reducers/posts/postsSlice';
import { getTags, tagsReducerState } from '../app/reducers/tags/tagsSlice';
import {
  categoryReducerState,
  getCategories
} from '../app/reducers/category/categorySlice';
import BlogFilter from '../components/Blogs/BlogFilter';
import BlogCard from '../components/Blogs/BlogCard';
import Pagination from '../components/Pagination/Pagination';
import {
  selectedAuthorsByCatId,
  userReducerState,
  getUsers
} from '../app/reducers/users/usersSlice';

const Blog = () => {
  const [postPerpage, setPostPerpage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //   const [selectedCatId, setSelectedCatId] = useState('');
  const [filterValue, setFiltervalue] = useState({
    category: '',
    tag: '',
    author: '',
    search: ''
  });
  const { isLoading, isError, posts } = useSelector(postReducerState);
  const { categories } = useSelector(categoryReducerState);
  const { tags } = useSelector(tagsReducerState);
  const { authorByCategories, users } = useSelector(userReducerState);
  const dispatch = useDispatch();

  const total = 50;

  useEffect(() => {
    setTotalPages(Math.ceil(total / postPerpage));
    dispatch(
      getPosts({
        postPerpage,
        currentPage,
        category: filterValue?.category,
        tag: filterValue?.tag,
        author: filterValue?.author,
        search: filterValue?.search
      })
    );
  }, [dispatch, postPerpage, currentPage]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectedAuthorsByCatId(filterValue?.category));
  }, [dispatch, filterValue.category]);

  // Handle selected value
  const handleSelectedValue = (id, action) => {
    switch (action) {
      // by_category_select(id);
      case 'by_category_select': {
        filterByClick(id, 'category');
        return;
      }
      // by_author_select(id);
      case 'by_author_select': {
        filterByClick(id, 'author');
        return;
      }
      // by_tag_select(id);
      case 'by_tag_select': {
        filterByClick(id, 'tag');
        return;
      }
    }
  };

  // Filter by click
  const filterByClick = (id, key) => {
    setFiltervalue({
      ...filterValue,
      [key]: id
    });

    dispatch(getPosts({ [key]: id, postPerpage, currentPage }));
  };

  // Handle submit
  const HandleSubmit = (e) => {
    e.preventDefault();
    const value = {
      category: filterValue.category,
      tag: filterValue.tag,
      author: filterValue.author,
      search: filterValue.search,
      postPerpage,
      currentPage
    };
    dispatch(getPosts(value));
    setCurrentPage(1);
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFiltervalue((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'category') {
      //   dispatch(selectedAuthorsByCatId(filterValue.category));

      setFiltervalue((prevState) => ({
        ...prevState,
        author: ''
      }));
    }
  };

  //   console.log(authorByCategories);
  const selectedUser = filterValue?.category ? authorByCategories : users;

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>{isError}</p>}
        <BlogFilter
          categories={categories}
          tags={tags}
          //   users={authorByCategories}
          users={selectedUser}
          onSetCurrentPage={setCurrentPage}
          postPerpage={postPerpage}
          currentPage={currentPage}
          onHandleSubmit={HandleSubmit}
          onHandleChange={handleChange}
          filterValue={filterValue}
        />
        <div className="flex mb-4 flex-wrap">
          {!isLoading &&
            !isError &&
            posts &&
            posts.length > 0 &&
            posts?.map((post) => {
              return (
                <div
                  key={post.id}
                  className="xl:w-1/4 md:w-1/2 w-full px-7 mb-6"
                >
                  <BlogCard
                    data={post}
                    categories={categories}
                    tags={tags}
                    onGetPosts={getPosts}
                    onHandleSelectedValue={handleSelectedValue}
                    users={users}
                  />
                </div>
              );
            })}
        </div>
        <div className="pagination flex justify-center">
          <Pagination
            postPerpage={postPerpage}
            totalPages={totalPages}
            onSetCurrentPage={setCurrentPage}
            currentPage={currentPage}
            filterValue={filterValue}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
