import { useDispatch } from 'react-redux';
import { formatDate } from '../app/common/common';

const ListTable = ({
  isLoading,
  isError,
  lists,
  onEditHandler,
  onDeleteHandler,
  catList,
  postDescription,
  likes,
  createdAt,
  userList,
  updatedAt
}) => {
  const dispatch = useDispatch();
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>{isError}</p>}
      {!isLoading && !isError && lists && lists?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#NO</th>
                <th>Title</th>
                {catList && <th>Category Name</th>}
                {/* {catList && <th>Category Name</th>} */}
                {userList && <th>User Name</th>}
                {postDescription && <th>Description</th>}
                {likes && <th>Total Likes</th>}
                {createdAt && <th>Created AT</th>}
                {updatedAt && <th>Updated AT</th>}

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists?.map((list, index) => {
                // console.log(list);

                const category = catList?.find(
                  (cat) => cat.id === list?.categoryId
                );
                const author = userList?.find(
                  (item) => item.id === list.authorId
                );
                // if (category || findUser) {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    {list?.name && <td>{list?.name}</td>}
                    {list?.title && <td>{list?.title}</td>}
                    {category && (
                      <td>{category ? category.name : 'Unknown'}</td>
                    )}
                    {author && <td>{author ? author.name : 'Unknown'}</td>}

                    {/* <td>{category.name}</td> */}
                    {list?.description && <td>{list?.description}</td>}
                    {list?.likes && <td>{list?.likes}</td>}
                    {list?.createdAt && <td>{formatDate(list?.createdAt)}</td>}
                    {list?.createdAt && <td>{formatDate(list?.updatedAt)}</td>}

                    <td>
                      <div className="action flex gap-4">
                        <button
                          className="btn btn-neutral"
                          onClick={() => onEditHandler(list)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => dispatch(onDeleteHandler(list.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
                // }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListTable;
