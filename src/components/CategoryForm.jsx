import { useDispatch, useSelector } from 'react-redux';
import {
  categoryReducerState,
  changeTitle,
  createCategory,
  updateCategory
} from '../app/reducers/category/categorySlice';

const CategoryForm = () => {
  const { catName, editMode, editableCat } = useSelector(categoryReducerState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (catName.trim() === '') {
      return alert('Category field is required!');
    }

    editMode
      ? dispatch(updateCategory({ editableCat, catName }))
      : dispatch(createCategory(catName));
  };
  //   console.log('editableNote', editableCat);
  return (
    <form className="flex items-end gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label>Category</label>
        <input
          type="text"
          value={catName}
          placeholder="Category name..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => dispatch(changeTitle(e.target.value))}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {editMode ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;
