import {User} from 'firebase/auth'
import {ReactNode} from 'react'

export interface TypesChatMessage {
  text: string | ReactNode
  uid?: 'sent' | 'received'
  photoURL?: string | User
}
