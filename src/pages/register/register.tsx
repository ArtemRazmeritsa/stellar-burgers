import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import { registerUser } from '../../services/slices/user/user-thunks';
import { useDispatch } from '../../services//store';
import { useSelector } from 'react-redux';
import { selectErrorRequest } from '@slices/user/user-slice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectErrorRequest);

  const userData: TRegisterData = {
    name: userName,
    email,
    password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
