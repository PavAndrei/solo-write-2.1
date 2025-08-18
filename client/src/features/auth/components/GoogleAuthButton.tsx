import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../../../components/ui/Button';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hooks';
import { authWithGoogle } from '../slices/asyncActions';

export const GoogleAuthButton = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;

      try {
        await dispatch(authWithGoogle(token));
        console.log('success');
      } catch (err) {
        console.error('Google Auth Error:', err);
      }
      navigate('/profile');
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <Button ariaLabel="auth with google" type="button" onClick={() => login()}>
      Continue with Google <FaGoogle />
    </Button>
  );
};
