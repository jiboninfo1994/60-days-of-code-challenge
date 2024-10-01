import { useEffect, useState } from 'react';
import {
  getPosts,
  postReducerState
} from '../../app/reducers/posts/postsSlice';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import BlogFilter from './BlogFilter';
import Pagination from '../Pagination/Pagination';
import {
  categoryReducerState,
  getCategories
} from '../../app/reducers/category/categorySlice';
import { getTags, tagsReducerState } from '../../app/reducers/tags/tagsSlice';

const Blogs = () => {
  const [postPerpage, setPostPerpage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState('');
  const { isLoading, isError, posts } = useSelector(postReducerState);
  const { categories } = useSelector(categoryReducerState);
  const { tags } = useSelector(tagsReducerState);
  const dispatch = useDispatch();

  const total = 50;

  useEffect(() => {
    setTotalPages(Math.ceil(total / postPerpage));
    dispatch(getPosts({ postPerpage, currentPage }));
  }, [dispatch, postPerpage, currentPage]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch]);

  //   console.log(totalPages);
  // Handle selected value
  const handleSelectedValue = (id) => {
    setSelectedCatId(id);
    dispatch(getPosts({ category: id }));
  };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>{isError}</p>}
        <BlogFilter
          categories={categories}
          tags={tags}
          onGetPost={getPosts}
          onSetCurrentPage={setCurrentPage}
          postPerpage={postPerpage}
          currentPage={currentPage}
          selectedCatId={selectedCatId}
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
          />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
