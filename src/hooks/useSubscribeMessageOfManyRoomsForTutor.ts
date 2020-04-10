

import DefaultClient, { gql } from "apollo-boost"
import { getLocalStorageToken } from "../routes"
import { getClient, CREATED_MUTATION_TYPE } from "../ApolloConfig"
import { toast } from "react-toastify"

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

// define of subscribe is defined in jwt token, 
const subscribeToMessage = gql`
  subscription {
    messageToTutor {
      mutation
      node {id userId { id } text createdAt updatedAt roomId {id}}
    }
  }
`
type Props = {
  setMessageCreated: Function
}

/**
 * This subscrube is used for who relate to many rooms, like tutor
 */
const useSubscribeMessageOfManyRoomsForTutor = ({
  setMessageCreated = (node: object) => { },
}: Props) => {

  const setSubscribeMessage = () => {
    // validate
    setClient()
    querySubscription = client.subscribe({
      query: subscribeToMessage
    })
      .subscribe({
        next(response) {
          const { data: { messageToTutor: { mutation, node } } } = response
          switch (mutation) {
            // case UPDATED_MUTATION_TYPE:
            //   unReadEmailOfAuth.setItemsToRemove(node.id)
            //   break;
            case CREATED_MUTATION_TYPE:
              setMessageCreated(node)
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
  }

  const setUnSubscribeMessage = () => {
    if (querySubscription) {
      querySubscription.unsubscribe()
      querySubscription = null
    }
  }

  return { setSubscribeMessage, setUnSubscribeMessage }
}

export default useSubscribeMessageOfManyRoomsForTutor
