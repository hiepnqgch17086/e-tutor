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

// define of subscribe is defined in jwt token and room
const subscribeToComment = gql`
  subscription($meetingId: ID!) {
    comment(meetingId: $meetingId){
      mutation
      node {
        id userId { id email name avatar } createdAt updatedAt text
        fileUploads { id cloudId createdAt updatedAt }
      }
    }
  }
`
type Props = {
  meetingId: number,
  setCommentCreated: Function
}

const useSubscribeCommentOfOneMeeting = ({
  meetingId,
  setCommentCreated = (node: object) => { },
}: Props) => {

  const setSubscribeMessage = () => {
    // validate
    if (!meetingId) return
    // action!!!!!!!!!
    setClient()
    querySubscription = client.subscribe({
      query: subscribeToComment,
      variables: {
        meetingId
      }
    })
      .subscribe({
        next(response) {
          const { data: { comment: { mutation, node } } } = response
          // console.log(mutation, node)
          switch (mutation) {
            // case UPDATED_MUTATION_TYPE:
            //   unReadEmailOfAuth.setItemsToRemove(node.id)
            //   break;
            case CREATED_MUTATION_TYPE:
              setCommentCreated(node)
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

export default useSubscribeCommentOfOneMeeting
