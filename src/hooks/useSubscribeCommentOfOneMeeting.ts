import { gql } from "apollo-boost"
// import { getLocalStorageToken } from "../routes"
import { client, setClient, CREATED_MUTATION_TYPE } from "../ApolloConfig"
import { toast } from "react-toastify"

/**
 * For COMMENT subscribe
 */
// let client: DefaultClient<unknown>
let querySubscription: ZenObservable.Subscription | null

// const setClient = () => {
//   if (client) return
//   const jwt = getLocalStorageToken()
//   if (!jwt) return
//   client = _getClient(jwt)
// }

// define of subscribe is defined in jwt token and room
const subscribeToComment = gql`
  subscription($meetingId: ID!) {
    comment(meetingId: $meetingId){
      mutation
      node {
        id userId { id email name avatar } createdAt updatedAt text
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

  const setSubscribeComment = () => {
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

  const setUnSubscribeComment = () => {
    if (querySubscription) {
      querySubscription.unsubscribe()
      querySubscription = null
    }
  }

  return { setSubscribeComment, setUnSubscribeComment }
}

export default useSubscribeCommentOfOneMeeting
