import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/react';

function AuthPage() {
  const [ isLoading, setIsLoading ] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getSession();
        if (session) {
          router.replace('/');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setIsLoading(false);
      }
    }
  
    fetchData();
  
  }, [router]);

if(isLoading) {
  return <p>Loading...</p>
}



  return <AuthForm />;
}

export default AuthPage;