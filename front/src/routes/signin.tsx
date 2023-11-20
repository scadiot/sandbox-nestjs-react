import SignIn, { SignInSubmitData } from '../components/signin'
import useFetch from 'use-http'

export default function SignInRoute() {
  const options = {}
  const { loading, error } = useFetch('https://example.com/todos', options, [])

  const handleSubmit = (signInSubmitData: SignInSubmitData) => {
    signInSubmitData.email
  };

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error...</div>
  }

  return  (
    <>
      <SignIn onSubmit={handleSubmit} />
    </>
  );
}
