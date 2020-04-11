import DefaultClient, { gql } from "apollo-boost"
import { getLocalStorageToken } from "../routes"
import { getClient, CREATED_MUTATION_TYPE, UPDATED_MUTATION_TYPE } from "../ApolloConfig"
import { toast } from "react-toastify"

/**
 * For COMMENT subscribe
 */
// let client: DefaultClient<unknown>
let querySubscription: ZenObservable.Subscription | null

const setClient = () => {
  // if (client) return
  const jwt = getLocalStorageToken()
  return getClient(jwt)
}

// define of subscribe is defined in jwt token and room
const subscribeToMessage = gql`
  subscription($roomId: ID!) {
    message(roomId: $roomId){
      mutation
      node {id userId { id } text createdAt updatedAt isSeenByPartner}
    }
  }
`
type Props = {
  roomId: number,
  setMessageCreated: Function,
  setMessageUpdated_isSeenByPartner_true?: Function,
}

const useSubscribeMessageOfOneRoom = ({
  roomId,
  setMessageCreated = (node: object) => { },
  setMessageUpdated_isSeenByPartner_true = (message: object) => {
    // console.log('message is updated', message)
  }
}: Props) => {

  const setSubscribeMessage = () => {
    // validate
    if (!roomId) return
    // action
    const client = setClient()
    querySubscription = client.subscribe({
      query: subscribeToMessage,
      variables: {
        roomId
      }
    })
      .subscribe({
        next(response) {
          const { data: { message: { mutation, node } } } = response
          // console.log(mutation, node)
          switch (mutation) {
            case UPDATED_MUTATION_TYPE:
              setMessageUpdated_isSeenByPartner_true(node)
              break;
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
      console.log('unsubscribe')
      querySubscription.unsubscribe()
      querySubscription = null
    }
  }

  return { setSubscribeMessage, setUnSubscribeMessage }
}

export default useSubscribeMessageOfOneRoom
