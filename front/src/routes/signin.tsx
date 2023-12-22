import SignIn, { SignInSubmitData } from '../components/signin'
import useHttp from 'use-http'
import { useAuth } from '../auth-context';
import Message from '../components/message';
import Button from '@mui/material/Button';

export default function SignInRoute() {
  const { post, response, loading, error } = useHttp()
  const { token, login, logout } = useAuth();

  const handleSubmit = async (signInSubmitData: SignInSubmitData) => {
    
    const loginData = await post('/api/signin', signInSubmitData)
    
    if (response.ok) {
      console.log(loginData.token)
      login(loginData.token, loginData.user)
    } else {
      console.log('error')
    }
  };

  if (token) {
    return (
      <Message title='You are already logged in'>
        <Button onClick={logout} >
          Logout
        </Button>
      </Message>
    )
  }
  
  return  (
    <>
      <SignIn onSubmit={handleSubmit} loading={loading} error={error} />
    </>
  );
}
