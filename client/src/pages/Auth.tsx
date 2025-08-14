import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSchema,
  type AuthFormData,
} from '../features/auth/validation/authSchemas';
import { CustomInput } from '../components/ui/CustomInput';
import { Button } from '../components/ui/Button';
import { CustomCheckbox } from '../components/ui/CustomCheckbox';
import { FileInput } from '../components/ui/FileInput';
import type {
  SignInFormData,
  SignUpFormData,
} from '../features/auth/types/auth.types';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { useNavigate } from 'react-router-dom';
import { Status } from '../types/api';
import { signInUser, signUpUser } from '../features/auth/slices/asyncActions';

interface AuthProps {
  mode: 'sign-in' | 'sign-up';
}

export const Auth: FC<AuthProps> = ({ mode }) => {
  const isSignUp = mode === 'sign-up';

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(isSignUp && {
        username: '',
        repeatPassword: '',
        terms: false,
        file: undefined,
      }),
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    if (status === Status.LOADING) return;
    if (!isSignUp) {
      const signInData = data as SignInFormData;

      try {
        await dispatch(signInUser(signInData)).unwrap();
        navigate('/articles');
      } catch (err) {
        alert(err);
      }
    } else {
      const signUpData = data as SignUpFormData;
      const formData = new FormData();

      formData.append('username', signUpData.username);
      formData.append('email', signUpData.email);
      formData.append('password', signUpData.password);
      if (signUpData.file?.[0]) {
        formData.append('image', signUpData.file[0]);
      }

      try {
        await dispatch(signUpUser(formData)).unwrap();
        console.log('success');
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {mode.replace('-', ' ')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isSignUp && (
          <CustomInput
            label="Username"
            placeholder="Enter username"
            register={register('username')}
            error={errors.username}
            name="username"
          />
        )}

        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register('email')}
          error={errors.email}
          name="email"
        />

        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter password"
          register={register('password')}
          error={errors.password}
          name="password"
        />

        {isSignUp && (
          <>
            <CustomInput
              label="Repeat Password"
              type="password"
              placeholder="Repeat password"
              register={register('repeatPassword')}
              error={errors.repeatPassword}
              name="repeatPassword"
            />

            <CustomCheckbox
              label="I accept the terms"
              register={register('terms')}
              error={errors.terms}
            />

            <FileInput
              accept="image/*"
              register={register('file')}
              error={errors.file}
            />
          </>
        )}

        <Button type="submit">
          {status === Status.LOADING ? 'loading...' : mode.replace('-', ' ')}
        </Button>
      </form>
    </section>
  );
};
