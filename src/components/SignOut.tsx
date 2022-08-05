import React from 'react'
import { Button } from '@mui/material'
import { auth } from '../firebase'

function SignOut() {
  return (
    auth.currentUser && (
      <Button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    )
  )
}
export default SignOut
