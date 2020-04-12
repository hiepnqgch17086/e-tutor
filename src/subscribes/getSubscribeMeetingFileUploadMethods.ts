import { gql } from "apollo-boost"
// import { getLocalStorageToken } from "../routes"
import { client, setClient, CREATED_MUTATION_TYPE, UPDATED_MUTATION_TYPE, DELETED_MUTATION_TYPE } from "../ApolloConfig"
import { toast } from "react-toastify"

/**
 * For COMMENT subscribe
 */
// let client: DefaultClient<unknown>
let defaultQuerySubscription: ZenObservable.Subscription | null = null

// const setClient = () => {
//   if (client) return
//   const jwt = getLocalStorageToken()
//   if (!jwt) return
//   client = _getClient(jwt)
// }

// define of subscribe is defined in jwt token and room
const subscribeToMeetingFileUpload = gql`
  subscription($meetingId: ID!) {
    meetingFileUpload(meetingId: $meetingId) {
      mutation
      node {
        id
        uploaderId {id}
        path 
        name
      }
      previousValues {
        id
      }
    }
  }
`
// type Props = {
//   // fromAt: string,
//   // toAt: string,
//   setMeetingCreated: Function,
//   setMeetingUpdated: Function,
//   querySubscription: ZenObservable.Subscription | null,
//   setQuerySubscription: Function,
// }

const getSubscribeMeetingFileUploadMethods = ({
  // fromAt = new Date().toISOString(),
  // toAt = new Date().toISOString(),
  setMeetingFileUploadCreated = (node: object, previousValues: object) => { },
  setMeetingFileUploadUpdated = (node: object, previousValues: object) => { },
  setMeetingFileUploadDelete = (node: object, previousValues: object) => { },
  meetingId = 0,
  querySubscription = defaultQuerySubscription,
  setQuerySubscription = (temp: ZenObservable.Subscription | null) => { },
}) => {

  const setSubscribeMeetingFileUpload = () => {
    // validate
    if (!meetingId) return
    // action
    // const fromAtISO = new Date(fromAt).toISOString()
    // const toAtISO = new Date(toAt).toISOString()
    setClient()
    setQuerySubscription(
      client.subscribe({
        query: subscribeToMeetingFileUpload,
        variables: {
          meetingId
        }
      })
        .subscribe({
          next(response) {
            const { data: { meetingFileUpload: { mutation, node, previousValues } } } = response
            switch (mutation) {
              case UPDATED_MUTATION_TYPE:
                setMeetingFileUploadUpdated(node, previousValues)
                break;
              case CREATED_MUTATION_TYPE:
                setMeetingFileUploadCreated(node, previousValues)
                break;
              case DELETED_MUTATION_TYPE:
                setMeetingFileUploadDelete(node, previousValues)
                break;
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
    )
  }

  const setUnSubscribeMeetingFileUpload = () => {
    if (querySubscription) {
      querySubscription.unsubscribe()
      setQuerySubscription(null)
      // querySubscription = null
    }
  }

  return { setSubscribeMeetingFileUpload, setUnSubscribeMeetingFileUpload }
}

export default getSubscribeMeetingFileUploadMethods
