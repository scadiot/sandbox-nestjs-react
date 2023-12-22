import SignUp, { SignUpSubmitData } from '../components/signup'
import useHttp from 'use-http'
import { useAuth } from '../auth-context';
import Button from '@mui/material/Button';
import Message from '../components/message';
import { useNavigate } from "react-router-dom";

export default function SignUpRoute() {
  const { token, logout } = useAuth();
  const { post, response, loading, error } = useHttp()
  const navigate = useNavigate();

  const handleSubmit = async (signInSubmitData: SignUpSubmitData) => {
    await post('/api/signup', signInSubmitData)
    
    if (response.ok) {
      navigate("/signin");
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

  return  <>
    <SignUp onSubmit={handleSubmit} loading={loading} error={error} />
  </>
}
