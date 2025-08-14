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
import { signIn, signUp } from '../features/auth/api/auth.api';
import type { SignUpFormData } from '../features/auth/types/auth.types';

interface AuthProps {
  mode: 'sign-in' | 'sign-up';
}

export const Auth: FC<AuthProps> = ({ mode }) => {
  const isSignUp = mode === 'sign-up';

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
    if (!isSignUp) {
      const result = await signIn(data);
      return console.log(result);
    }

    const signUpData = data as SignUpFormData;
    const formData = new FormData();

    formData.append('username', signUpData.username);
    formData.append('email', signUpData.email);
    formData.append('password', signUpData.password);
    if (signUpData.file?.[0]) {
      formData.append('image', signUpData.file[0]);
    }

    const result = await signUp(formData);
    console.log(result);
  };

  return (
    <section className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isSignUp ? 'Sign Up' : 'Sign In'}
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

        <Button type="submit">{isSignUp ? 'Register' : 'Login'}</Button>
      </form>
    </section>
  );
};
