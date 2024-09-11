import { createContext, useReducer } from 'react';

export const userContextApi = createContext();

const intialState = {
  userField: { name: '', email: '', phone: '' },
  users: []
};

const reducer = (state, action) => {
  if (action.type === 'CHANGE_INPUT') {
    return {
      ...state,
      userField: {
        ...state.userField,
        [action.payload.name]: action.payload.value
      }
    };
  } else if (action.type === 'CREATE_USER') {
    const newUser = {
      id: Date.now() + '',
      name: state.userField.name,
      email: state.userField.email,
      phone: state.userField.phone
    };

    return {
      ...state,
      users: [...state.users, newUser],
      userField: {
        name: '',
        email: '',
        phone: ''
      }
    };
  }

  return state;
};

const UserContext = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, intialState);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userState.userField.name.trim() === '' ||
      userState.userField.email.trim() === '' ||
      userState.userField.name.trim() === ''
    ) {
      return alert('All field are required!');
    }

    dispatch({ type: 'CREATE_USER' });
  };

  const userCTX = {
    handleSubmit,
    userState,
    dispatch
  };

  return (
    <userContextApi.Provider value={userCTX}>
      {children}
    </userContextApi.Provider>
  );
};

export default UserContext;
