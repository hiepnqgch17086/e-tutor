import DefaultClient, { gql } from "apollo-boost"
import { getLocalStorageToken } from "../routes"
import { getClient, CREATED_MUTATION_TYPE, UPDATED_MUTATION_TYPE } from "../ApolloConfig"
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
const subscribeToMeetingStatus = gql`
  subscription($meetingId: ID!) {
    meetingStatus(meetingId: $meetingId){
      mutation
      node {
        isCreatorOn
        isStudentOn
        isStudentTyping
        isCreatorTyping
      }
    }
  }
`
type Props = {
  meetingId: Number
  setMeetingUpdated: Function
}

const useSubscribeMeetingStatus = ({
  meetingId = 0,
  setMeetingUpdated = (node: object) => { },
}: Props) => {

  const setSubscribeMeetingStatus = () => {
    // validate
    if (!meetingId) return
    // action
    setClient()
    querySubscription = client.subscribe({
      query: subscribeToMeetingStatus,
      variables: {
        meetingId
      }
    })
      .subscribe({
        next(response) {
          const { data: { meetingStatus: { mutation, node } } } = response
          // console.log(data)
          switch (mutation) {
            case UPDATED_MUTATION_TYPE:
              setMeetingUpdated(node)
              break;
            // case CREATED_MUTATION_TYPE:
            //   setMeetingCreated(node)
            //   break;
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

  const setUnSubscribeMeetingStatus = () => {
    if (querySubscription) {
      querySubscription.unsubscribe()
      querySubscription = null
    }
  }

  return { setSubscribeMeetingStatus, setUnSubscribeMeetingStatus }
}

export default useSubscribeMeetingStatus
