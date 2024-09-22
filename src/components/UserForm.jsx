/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { categoryReducerState } from '../app/reducers/category/categorySlice';
import { useState } from 'react';

const UserForm = ({ inputValue, setInputValue, onHandleSubmit, editMode }) => {
  const { categories } = useSelector(categoryReducerState);
  //   const [selectedCat, setSelectedCat] = useState(
  //     categories.length > 0 ? categories[0].id : ''
  //   );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //   console.log('category', selectedCat);

  return (
    <div>
      <form className="gap-5" onSubmit={onHandleSubmit}>
        {categories && categories?.length > 0 && (
          <select
            className="select select-primary w-full max-w-xs"
            value={inputValue?.selectedCategory}
            onChange={onChangeHandler}
            name="selectedCategory"
          >
            {categories?.map((category, index) => (
              <option
                key={category.id}
                value={category.id}
                // selected={index === 0}
              >
                {category.name}
              </option>
            ))}
          </select>
        )}
        <div className="flex items-end gap-5">
          <div className="flex flex-col gap-3 mt-8">
            <label>User</label>
            <input
              type="text"
              value={inputValue?.userName}
              name="userName"
              placeholder="User name..."
              className="input input-bordered w-full max-w-xs"
              onChange={onChangeHandler}
            />
          </div>
          <button
            className="btn btn-primary mt-4"
            type="submit"
            onClick={onHandleSubmit}
          >
            {editMode ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
