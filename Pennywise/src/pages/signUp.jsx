import React from 'react'
import { SignUp } from "@clerk/clerk-react";
import { useAccount } from "../utils/account";
import { addUserToFirestore } from "../utils/firebaseUser";

export default function Signup() {
  return (
    <div className='flex h-[90vh] items-center justify-center'>
      <SignUp signInUrl='/login' afterSignUpUrl='/login'/>
    </div>
  )
}
