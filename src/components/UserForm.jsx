/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { categoryReducerState } from '../app/reducers/category/categorySlice';
import { useState } from 'react';

const UserForm = ({ inputValue, onHandleChange, onHandleSubmit, editMode }) => {
  const { categories } = useSelector(categoryReducerState);
  //   console.log('Input value', inputValue);

  return (
    <div>
      <form className="gap-5" onSubmit={onHandleSubmit}>
        {categories && categories?.length > 0 && (
          //   <select
          //     className="select select-primary w-full max-w-xs"
          //     onChange={onHandleChange}
          //     name="selectedCategory"
          //     value={inputValue.selectedCategory}
          //   >
          //     <option selected>Select Category</option>
          //     {categories?.map((category, index) => (
          //       <option
          //         key={category.id}
          //         value={category.id}
          //         // selected={index === 0}
          //       >
          //         {category.name}
          //       </option>
          //     ))}
          //   </select>

          <select
            className="select select-primary w-full max-w-xs"
            value={inputValue.selectedCategory}
            onChange={onHandleChange}
            name="selectedCategory"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
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
              name="userName"
              value={inputValue.userName}
              placeholder="User name..."
              className="input input-bordered w-full max-w-xs"
              onChange={onHandleChange}
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
