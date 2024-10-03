import { Link, useNavigate } from 'react-router-dom';
import { IoTime } from 'react-icons/io5';
import { formatDate } from '../../app/common/common';
import { SlLike } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { EDITABLE_POST } from '../../app/reducers/posts/postsSlice';
const BlogCard = ({
  data,
  categories,
  tags: tagList,
  onHandleSelectedValue,
  users
}) => {
  //   console.log(data);
  const {
    id,
    title,
    description,
    likes,
    created_at,
    tags,
    category_id,
    author_id
  } = data;
  //   const slug = title?.split(' ').join('-').toLowerCase();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (post) => {
    // console.log(post);
    dispatch(EDITABLE_POST(post));
    navigate('/about');
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl border border-white">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex gap-2 items-center justify-between my-3">
          <div className="flex gap-1 items-center text-sm">
            <IoTime />
            <span>{formatDate(created_at)}</span>
          </div>
          <div className="flex gap-1 items-center text-sm">
            <SlLike />
            <span>{likes}</span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            <span>Tag: </span>
            {tags?.map((tag, index) => {
              //   console.log(tag);

              //   console.log(tagList);

              const tagItem = tagList?.find((item) => item.id === tag);

              return (
                <li
                  onClick={() => onHandleSelectedValue(tag, 'by_tag_select')}
                  className="badge badge-accent cursor-pointer"
                  key={index}
                >
                  {tagItem?.name}
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex justify-between">
          {category_id &&
            (() => {
              const categoryItem = categories.find(
                (item) => item.id === category_id
              );
              return (
                <div className="text-xs">
                  <span>Category: </span>
                  <span
                    onClick={() =>
                      //   dispatch(onGetPosts({ category: category_id }))
                      onHandleSelectedValue(category_id, 'by_category_select')
                    }
                    className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 cursor-pointer"
                  >
                    {categoryItem?.name}
                  </span>
                </div>
              );
            })()}

          {author_id &&
            (() => {
              let author;
              // Ensure users is an array before using find
              if (Array.isArray(users)) {
                author = users.find((item) => item.id === author_id);
              }
              return (
                <div className="text-xs">
                  <span>Post By: </span>
                  <span
                    onClick={() =>
                      onHandleSelectedValue(author_id, 'by_author_select')
                    }
                    className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 cursor-pointer"
                  >
                    {author?.name}
                  </span>
                </div>
              );
            })()}
        </div>

        <div className="card-actions justify-between mt-6">
          <button
            className="btn btn-sm btn-active btn-ghost"
            onClick={() => handleEdit(data)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-info">
            <Link to={id}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
