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
  created_at,
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
                {created_at && <th>Create AT</th>}
                {updatedAt && <th>Updated AT</th>}

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists?.map((list, index) => {
                // console.log(list);

                const category = catList?.find(
                  (cat) => cat.id === list?.category_id
                );
                const findUser = userList?.find(
                  (item) => item.id === list.author_id
                );

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    {list?.name && <td>{list?.name}</td>}
                    {list?.title && <td>{list?.title}</td>}
                    {category && (
                      <td>{category ? category.name : 'Unknown'}</td>
                    )}
                    {findUser && (
                      <td>{findUser ? findUser.name : 'Unknown'}</td>
                    )}

                    {/* <td>{category.name}</td> */}
                    {list?.description && <td>{list?.description}</td>}
                    {list?.likes && <td>{list?.likes}</td>}
                    {list?.created_at && (
                      <td>{formatDate(list?.created_at)}</td>
                    )}
                    {list?.created_at && (
                      <td>{formatDate(list?.updated_at)}</td>
                    )}

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
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListTable;
