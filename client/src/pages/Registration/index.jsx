import React from 'react';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
      return alert('Failed authorization');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if(isAuth) {
    return <Navigate to='/'/> 
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField  
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter your full name' })}
          className={styles.field} 
          label="Full name" 
          fullWidth 
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Enter email' })}
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message }
          type="password"
          {...register('password', { required: 'Enter password' })}
          className={styles.field} 
          label="password" 
          fullWidth 
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
