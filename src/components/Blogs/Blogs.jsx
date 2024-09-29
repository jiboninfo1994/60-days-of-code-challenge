import { useEffect } from 'react';
import {
  getPosts,
  postReducerState
} from '../../app/reducers/posts/postsSlice';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import BlogFilter from './BlogFilter';
import Pagination from '../Pagination/Pagination';

const Blogs = () => {
  const { isLoading, isError, posts } = useSelector(postReducerState);
  const dispatch = useDispatch();

  //   console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //   const handleEdit = (data) => {
  //     console.log(data);
  //   };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        {isLoading && <p>Loading...</p>}
        {!isLoading && isError && <p>{isError}</p>}
        <BlogFilter />
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
                  <BlogCard data={post} />
                </div>
              );
            })}
        </div>
        <div className="pagination flex justify-center">
          <Pagination dispatchURL={getPosts} totalItems={50} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
