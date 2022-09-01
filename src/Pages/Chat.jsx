import React, {useRef, useState} from 'react'

import {Avatar, Box, Button, Container, TextField, Typography} from '@mui/material'

import firebase from 'firebase/compat/app'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {auth, firestore} from '../firebase'

function Chat() {
  const [user] = useAuthState(auth)

  return (
    <Container xs={{display: 'flex', justifyContent: 'center'}}>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </Container>
  )
}
export default Chat

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <Button variant="contained" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </>
  )
}

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState('')

  const sendMessage = async e => {
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          height: '80vh',
          margin: '0 auto',
          overflowY: 'auto',
          gap: '5px',
        }}
      >
        {messages &&
          messages.map((msg, index) => <ChatMessage key={`${msg.id}__${index}`} message={msg} />)}

        <span ref={dummy}></span>
      </Box>

      <form onSubmit={sendMessage}>
        <Box sx={{display: 'flex', gap: '5px', maxWidth: '500px', margin: '0 auto'}}>
          <TextField
            variant="standard"
            placeholder="Write"
            value={formValue}
            onChange={e => setFormValue(e.target.value)}
            sx={{outline: 'none'}}
            fullWidth
            autoComplete="off"
          />
          <Button variant="outlined" type="submit" disabled={!formValue}>
            <Typography sx={{textTransform: 'capitalize'}}>Send</Typography>
          </Button>
        </Box>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message

  const sent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    flexDirection: 'row-reverse',
    gap: '3px',
  }
  const received = {display: 'flex', alignItems: 'center', gap: '3px'}

  const messageClass = uid === auth.currentUser.uid ? sent : received

  return (
    <>
      <Box sx={messageClass}>
        <Avatar src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <Typography>{text}</Typography>
      </Box>
    </>
  )
}
