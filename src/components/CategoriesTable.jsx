import { useDispatch, useSelector } from 'react-redux';
import {
  categoryReducerState,
  deleteCategory,
  editCategory,
  getCategories
} from '../app/reducers/category/categorySlice';
import { useEffect } from 'react';

const CategoriesTable = () => {
  const { categories, isLoading, isError } = useSelector(categoryReducerState);
  const dispatch = useDispatch();

  //   console.log(categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>{isError}</p>}
      {!isLoading && !isError && categories && categories?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#NO</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{category?.name}</td>
                  <td>
                    <div className="action flex gap-4">
                      <button
                        className="btn btn-neutral"
                        onClick={() => dispatch(editCategory(category))}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => dispatch(deleteCategory(category.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
