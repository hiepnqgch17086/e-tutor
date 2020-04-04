import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChatRoomStudentPage from '../data'
import ListItemOfMessage from './ListItemOfMessage'
import { getClient, CREATED_MUTATION_TYPE } from '../../../ApolloConfig'
import { getLocalStorageToken } from '../../../routes'
import DefaultClient, { gql } from 'apollo-boost'
import { toast } from 'react-toastify'

/**
 * For COMMENT subscribe
 */
let client: DefaultClient<unknown>
let querySubscription: ZenObservable.Subscription | null

const setClient = () => {
  if (client) return
  const jwt = getLocalStorageToken()
  if (!jwt) return
  client = getClient(jwt)
}

// define of subscribe is defined in jwt token and room
const subscribeToComment = gql`
  subscription($roomId: ID!) {
    message(roomId: $roomId){
      mutation
      node {id userId { id } text createdAt updatedAt}
    }
  }
`
/**
 * END of COMMENT subscribe
 */

const ListOfMessage = () => {
  const { room } = ChatRoomStudentPage

  const scrollToBottom = () => {
    const msgContainer = document.getElementById('messages');
    // @ts-ignore
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // effect of scrolldown if new comment added
  useEffect(() => {
    scrollToBottom()
    return () => {
      // cleanup
    }
  }, [room.messages.length])

  // set-up listener effect
  useEffect(() => {
    // validate 
    if (!room.id) return
    //
    setClient()
    querySubscription = client.subscribe({
      query: subscribeToComment,
      variables: {
        roomId: room.id
      }
    })
      .subscribe({
        next(response) {
          const { data: { message: { mutation, node } } } = response
          // console.log(mutation, node)
          switch (mutation) {
            // case UPDATED_MUTATION_TYPE:
            //   unReadEmailOfAuth.setItemsToRemove(node.id)
            //   break;
            case CREATED_MUTATION_TYPE:
              room.setMessageAdded(node)
              break;
            // case DELETED_MUTATION_TYPE:
            //   break;
            default:
              break;
          }
          // console.log('response.data', response.data)
        },
        error(ss) {
          console.log(ss.message)
          toast.error('Something went wrong!')
        }
      })
    return () => {
      // cleanup
      if (querySubscription) {
        querySubscription.unsubscribe()
        querySubscription = null
      }
    }
  }, [room.id])

  return (
    <div className="chat-box fix-bug-of-list-contact position-relative border-top border-left-0" id="messages" style={{ height: 'calc(60vh)' }} >
      <ul className="chat-list list-style-none px-3 pt-3">
        {/*chat Row */}
        {
          room.messages.length ? (
            <>
              {
                room.messages.flatMap(item => (
                  <ListItemOfMessage key={item.id} item={item} />
                ))
              }
            </>
          ) : null
        }

        {/* <li className="chat-item list-style-none mt-3">
          <div className="chat-img d-inline-block">
            <img src="/assets/images/users/1.jpg" alt="user" className="rounded-circle" width={45} />
          </div>
          <div className="chat-content d-inline-block pl-3">
            <h6 className="font-weight-medium">James Anderson</h6>
            <div className="msg p-2 d-inline-block mb-1">Lorem
            Ipsum is simply
            dummy text of the
                printing &amp; type setting industry.</div>
          </div>
          <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">10:56 am
            </div>
        </li> */}
      </ul>
    </div>
  )
}

export default observer(ListOfMessage)
