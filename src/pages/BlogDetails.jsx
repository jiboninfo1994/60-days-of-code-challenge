import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSinglePost,
  postReducerState
} from '../app/reducers/posts/postsSlice';
import { singleUser, userReducerState } from '../app/reducers/users/usersSlice';
import {
  categoryReducerState,
  getCategories
} from '../app/reducers/category/categorySlice';
import { getTags, tagsReducerState } from '../app/reducers/tags/tagsSlice';
import { IoIosTime } from 'react-icons/io';
import { formatDate } from '../app/common/common';
import { BiSolidLike } from 'react-icons/bi';
import CommentSection from '../components/Comments/CommentSection';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isError, isLoading, posts } = useSelector(postReducerState);
  const { users } = useSelector(userReducerState);
  const { categories } = useSelector(categoryReducerState);
  const { tags: postTags } = useSelector(tagsReducerState);
  const {
    title,
    description,
    tags,
    likes,
    created_at,
    category_id,
    author_id
  } = posts;

  useEffect(() => {
    dispatch(getSinglePost(id));
    if (author_id) {
      dispatch(singleUser(author_id));
    }
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch, id, author_id]);

  //   const author = users?.find((user) => user?.id === author_id);
  const category = categories?.find((cat) => cat?.id === category_id);
  const filterTags = postTags?.filter((tag) => tags?.includes(tag.id));

  //   console.log(users);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="col px-5">
          {isLoading && <p>Loading...</p>}
          {!isLoading && isError && <p>Oops! Post not found!</p>}
          {!isLoading && !isError && posts && (
            <div className="post-content">
              {title && <h2 className="mb-5 text-5xl">{title}</h2>}
              {description && <p className="mb-3">{description}</p>}
              {category && (
                <div className="mb-2">
                  <span> Category: </span>
                  <span className="badge badge-primary">{category?.name}</span>
                </div>
              )}
              {filterTags && filterTags.length > 0 && (
                <div className="tags mb-2">
                  Tags:{' '}
                  {filterTags?.map((tag) => (
                    <span className="badge badge-accent" key={tag.id}>
                      {tag?.name}
                    </span>
                  ))}
                </div>
              )}
              {likes && (
                <div className="likes flex items-center gap-2">
                  <BiSolidLike />
                  <span className="badge badge-secondary">{likes}</span>
                </div>
              )}
              <div className="author pt-10 flex items-center gap-5">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src="https://janefriedman.com/wp-content/uploads/2014/09/Example-of-a-Polished-Author-Portrait.png"
                  alt={users && users.name}
                />
                <div className="author-info">
                  {users && <h3 className="text-2xl mb-3">{users.name}</h3>}
                  {created_at && (
                    <span className="flex items-center gap-2">
                      <IoIosTime />
                      {formatDate(created_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col pt-16">
          <CommentSection blogId={id} />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
