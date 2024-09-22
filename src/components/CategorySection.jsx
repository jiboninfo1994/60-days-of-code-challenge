import { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryReducerState,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../app/reducers/category/categorySlice';
import ListTable from './ListTable';

const CategorySection = () => {
  const [catName, setCatName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editableCat, setEditableCat] = useState(null);

  const { categories, isLoading, isError } = useSelector(categoryReducerState);

  const dispatch = useDispatch();

  // Get lists
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (catName.trim() === '') {
      return alert('Category field is required!');
    }

    if (editMode) {
      dispatch(updateCategory({ editableCat, catName }));
    } else {
      dispatch(createCategory(catName));
      setCatName('');
    }
  };

  // Edit handler
  const editCategory = (category) => {
    setEditMode(true);
    setEditableCat(category);
    setCatName(category.name);
  };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/2">
            <CategoryForm
              catName={catName}
              setCatName={setCatName}
              editMode={editMode}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="w-1/2">
            <ListTable
              lists={categories}
              isLoading={isLoading}
              isError={isError}
              onEditHandler={editCategory}
              onDeleteHandler={deleteCategory}
            />
            {/* <CategoriesTable editCategory={editCategory} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
