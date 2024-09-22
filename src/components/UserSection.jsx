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

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.userName.trim() || !inputValue.selectedCategory) {
      return alert('All field are requried');
    }

    const newUser = {
      id: Date.now() + '',
      name: inputValue.userName,
      category_id: inputValue.selectedCategory
    };

    if (editMode) {
      dispatch(updateUser(newUser));
    } else {
      dispatch(createUser(newUser));
      const newObj = {
        ...inputValue
      };
      newObj.userName = '';

      setInputValue(newObj);
    }
  };

  // Edit handler
  const editHandler = (user) => {
    console.log(user);

    setEditMode(true);
    setEditableUser(user);
    setInputValue((prevState) => ({
      ...prevState,
      userName: user.name
    }));
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
              userName={inputValue}
              setInputValue={setInputValue}
              onHandleSubmit={handleSubmit}
              editMode={editMode}
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
