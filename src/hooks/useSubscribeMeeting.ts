import DefaultClient, { gql } from "apollo-boost"
import { getLocalStorageToken } from "../routes"
import { client, setClient, CREATED_MUTATION_TYPE, UPDATED_MUTATION_TYPE } from "../ApolloConfig"
import { toast } from "react-toastify"

/**
 * For COMMENT subscribe
 */
// let client: DefaultClient<unknown>
// let querySubscription: ZenObservable.Subscription | null

// const setClient = () => {
//   if (client) return
//   const jwt = getLocalStorageToken()
//   if (!jwt) return
//   client = _getClient(jwt)
// }

// define of subscribe is defined in jwt token and room
const subscribeToMeeting = gql`
  subscription {
    meeting {
      mutation
      node {
        id
        title
        studentId {id name email name}
        creatorId {id name email name}
        startAt
        endAt
      }
    }
  }
`
type Props = {
  // fromAt: string,
  // toAt: string,
  setMeetingCreated: Function,
  setMeetingUpdated: Function,
  querySubscription: ZenObservable.Subscription | null,
  setQuerySubscription: Function,
  setQuerySubscriptionNull: Function,
}

const useSubscribeMeetingInRangeOfDate = ({
  // fromAt = new Date().toISOString(),
  // toAt = new Date().toISOString(),
  setMeetingCreated = (node: object) => { },
  setMeetingUpdated = (node: object) => { },
  querySubscription,
  setQuerySubscription = (temp: ZenObservable.Subscription | null) => { },
}: Props) => {

  const setSubscribeMeeting = () => {
    // validate
    // if (!fromAt) return
    // action
    // const fromAtISO = new Date(fromAt).toISOString()
    // const toAtISO = new Date(toAt).toISOString()
    setClient()
    const temp = client.subscribe({
      query: subscribeToMeeting,
      // variables: {
      //   fromAt: fromAtISO,
      //   toAt: toAtISO,
      // }
    })
      .subscribe({
        next(response) {
          const { data: { meeting: { mutation, node } } } = response
          switch (mutation) {
            case UPDATED_MUTATION_TYPE:
              setMeetingUpdated(node)
              break;
            case CREATED_MUTATION_TYPE:
              setMeetingCreated(node)
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

    setQuerySubscription(temp)
  }

  const setUnSubscribeMeeting = () => {
    if (querySubscription) {
      querySubscription.unsubscribe()
      setQuerySubscription(null)
      // querySubscription = null
    }
  }

  return { setSubscribeMeeting, setUnSubscribeMeeting }
}

export default useSubscribeMeetingInRangeOfDate
