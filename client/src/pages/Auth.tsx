import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Link, useNavigate } from 'react-router-dom';
import { Status } from '../types/api';
import { signInUser, signUpUser } from '../features/auth/slices/asyncActions';
import { PageTitle } from '../components/ui/PageTitle';
import { FaUser, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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
    control,
    formState: { isLoading, errors },
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
    <section className="h-full py-10">
      <PageTitle hasSubtitle={isSignUp ? 'Join Us' : 'Welcome Back'}>
        {mode.replace('-', ' ')}
      </PageTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border p-4 border-gray-500 rounded shadow max-w-lg mx-auto shadow-gray-500"
      >
        {isSignUp && (
          <CustomInput
            label="Username"
            placeholder="Enter username"
            register={register('username')}
            error={errors.username}
            name="username"
            icon={<FaUser />}
          />
        )}

        <CustomInput
          label="Email"
          type="text"
          placeholder="Enter your email"
          register={register('email')}
          error={errors.email}
          name="email"
          icon={<MdEmail />}
        />

        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter password"
          register={register('password')}
          error={errors.password}
          name="password"
          icon={<FaKey />}
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
              icon={<FaKey />}
            />

            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  label="I accept the terms"
                  error={errors.terms}
                />
              )}
            />

            <FileInput
              accept="image/*"
              register={register('file')}
              error={errors.file}
            />
          </>
        )}

        <Button
          disabled={isLoading}
          ariaLabel={mode.replace('-', ' ')}
          type="submit"
        >
          {status === Status.LOADING ? 'loading...' : mode.replace('-', ' ')}
        </Button>

        <span>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}

          <Link
            to={isSignUp ? '/signin' : '/signup'}
            className="italic text-shadow-xs font-semibold"
          >
            {isSignUp ? ' Sign in.' : ' Sign up.'}
          </Link>
        </span>
      </form>
    </section>
  );
};
