import React, {useEffect} from 'react'
import { SignIn } from "@clerk/clerk-react";

export default function Signin() {

  return (
    <div className='flex h-[90vh] items-center justify-center'>
      <SignIn signUpUrl="/register" afterSignInUrl="/dashboard"/>
    </div>
  )
}
