import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../../../components/ui/Button';
import { FaGoogle } from 'react-icons/fa';
import { googleAuth } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

export const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const handleAuth = async (token: string) => {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userInfo = await userInfoResponse.json();

      const payload = {
        email: userInfo.email,
        username: userInfo.name,
        avatarUrl: userInfo.picture,
      };

      const res = await googleAuth(payload);

      console.log('Backend response:', res);
    } catch (error) {
      console.error('Google Auth Error:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAuth(tokenResponse.access_token);
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
