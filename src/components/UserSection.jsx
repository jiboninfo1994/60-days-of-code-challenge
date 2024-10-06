import { useEffect, useRef, useState } from 'react';
import UserForm from './userForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  userReducerState
} from '../app/reducers/users/usersSlice';
import ListTable from './ListTable';
import { categoryReducerState } from '../app/reducers/category/categorySlice';

const UserSection = () => {
  const [inputValue, setInputValue] = useState({
    userName: '',
    selectedCategory: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  //   const inputValueRef = useRef(inputValue);

  const { isLoading, isError, users } = useSelector(userReducerState);
  const { categories } = useSelector(categoryReducerState);
  const dispatch = useDispatch();

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.userName.trim() || !inputValue.selectedCategory) {
      return alert('All field are requried');
    }

    const newUser = {
      id: Date.now() + '',
      name: inputValue.userName,
      categoryId: inputValue.selectedCategory
    };

    if (editMode) {
      dispatch(updateUser({ editableUser, inputValue }));
      setEditMode(false);
      setEditableUser(null);
      setInputValue({ ...inputValue, userName: '', selectedCategory: '' });
    } else {
      dispatch(createUser(newUser));
      setInputValue({ ...inputValue, userName: '', selectedCategory: '' });
    }
  };

  // Edit handler
  const editHandler = (user) => {
    console.log(user);

    setEditMode(true);
    setEditableUser(user);
    setInputValue({
      ...inputValue,
      userName: user.name,
      selectedCategory: user.categoryId
    });
  };

  // Get Data

  //   useEffect(() => {
  //     inputValueRef.current = inputValue;
  //     console.log(inputValueRef.current);
  //   }, [inputValue.userName]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/2">
            <UserForm
              inputValue={inputValue}
              onHandleSubmit={handleSubmit}
              editMode={editMode}
              onHandleChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <ListTable
              lists={users}
              isLoading={isLoading}
              isError={isError}
              onDeleteHandler={deleteUser}
              catList={categories}
              onEditHandler={editHandler}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
