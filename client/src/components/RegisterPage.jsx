import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/auth';
import { Button, Form, Input, Typography } from 'antd';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useSelector((store) => store.auth);
  const message = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('auth in Reg', auth);
  console.log('authisLoggedIn in Reg', auth.isLoggedIn);

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  useEffect(() => {
    setErrorMessage(message.message);
  }, [message]);

  const onFinish = (values) => {
    const { username, password } = values;

    setIsLoading(true);
    console.log('isError', isError);
    if (!isError) {
      dispatch(register(username, password))
        .then(() => {
          navigate('/');
          setIsError(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    console.log('Success:', values);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setIsError(true);
  };

  return (
    <div
      className='formContainer'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <div
        className='formBox'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
          width: '420px',
          backgroundColor: '#f3f3f3',
          borderRadius: '16px',
        }}>
        <Form
          name='basic'
          style={{
            width: '100%',
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'>
            <Form.Item
              name="username"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                }
              ]}
            ><Input /></Form.Item>

          </Form.Item>

          <Form.Item label='Password'>
            <Form.Item
              name='password'
              min={8}
              max={12}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 4,
                  message: 'Password minimum 4 characters'
                },
              ]}
            ><Input.Password /></Form.Item>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Typography>
          Already have an account?{' '}
          <Link to='/login'>Login Here</Link>
        </Typography>
        {errorMessage && (
          <Typography className='errorMessage' role='alert'>
            {errorMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};
