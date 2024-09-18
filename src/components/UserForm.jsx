import { useSelector } from 'react-redux';
import { categoryReducerState } from '../app/reducers/category/categorySlice';

const UserForm = () => {
  const { categories } = useSelector(categoryReducerState);
  console.log(categories);

  return (
    <div>
      <form className="gap-5">
        {categories && categories?.length > 0 && (
          <select className="select select-primary w-full max-w-xs">
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <div className="flex flex-col gap-3 mt-8">
          <label>User</label>
          <input
            type="text"
            placeholder="User name..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
