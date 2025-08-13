import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchema, type AuthFormData } from '../utils/authSchemas';
import { CustomInput } from '../components/form/CustomInput';
import { Button } from '../components/common/Button';

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

  const onSubmit = (data: AuthFormData) => {
    if (!isSignUp) {
      // Для sign-in используем только email и password
      const { email, password } = data;
      console.log('SignIn data:', { email, password });
      return;
    }
    // Для sign-up используем все данные
    console.log('SignUp data:', data);
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
          />
        )}

        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register('email')}
          error={errors.email}
        />

        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter password"
          register={register('password')}
          error={errors.password}
        />

        {isSignUp && (
          <>
            <CustomInput
              label="Repeat Password"
              type="password"
              placeholder="Repeat password"
              register={register('repeatPassword')}
              error={errors.repeatPassword}
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" {...register('terms')} />
              <label htmlFor="terms">I accept the terms</label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            <input
              type="file"
              accept="image/*"
              {...register('file')}
              className="block border p-2"
            />
            {errors.file && (
              <p className="text-red-500 text-sm">
                {errors.file.message?.toString()}
              </p>
            )}
          </>
        )}

        <Button type="submit">{isSignUp ? 'Register' : 'Login'}</Button>
      </form>
    </section>
  );
};
