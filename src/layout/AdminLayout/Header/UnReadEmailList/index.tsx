import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { EMAIL_LIST_PAGE } from '../../../../routes'
import UnReadEmailItem from './UnReadEmailItem'
import ProfilePageData from '../../../../pages/ProfilePage/data'
import { unReadEmailOfAuth } from './data'
import { gql } from 'apollo-boost'
import { client, setClient, UPDATED_MUTATION_TYPE, CREATED_MUTATION_TYPE, DELETED_MUTATION_TYPE } from '../../../../ApolloConfig'
// import { getLocalStorageToken } from '../../../../routes'
import { toast } from 'react-toastify'

// let client: DefaultClient<unknown>
let querySubscription: ZenObservable.Subscription | null

// const setClient = () => {
//   if (client) return
//   const jwt = getLocalStorageToken()
//   if (!jwt) return
//   client = _getClient(jwt)
// }

// const getHello = gql`
//   query {
//     hello
//   }
// `

const subscribeToEmails = gql`
  subscription{
    email{
      mutation
      node {id title body isRead createdAt updatedAt}
    }
  }
`

const UnReadEmailList = () => {

  const { currentUser } = ProfilePageData

  useEffect(() => {
    // effect
    if (currentUser.id) {
      unReadEmailOfAuth.getDatabaseUnReadEmailsOfAuth()

      setClient()
      querySubscription = client.subscribe({ query: subscribeToEmails })
        .subscribe({
          next(response) {
            const { data: { email: { mutation, node } } } = response
            // console.log(node)
            switch (mutation) {
              case UPDATED_MUTATION_TYPE:
                unReadEmailOfAuth.setItemsToRemove(node.id)
                break;
              case CREATED_MUTATION_TYPE:
                unReadEmailOfAuth.setItemsToAdd(node)
                break;
              case DELETED_MUTATION_TYPE:
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
    }
    return () => {
      // cleanup
      if (querySubscription) {
        querySubscription.unsubscribe()
        querySubscription = null
      }
    }
  }, [currentUser.id])

  return (
    <li className="nav-item dropdown">
      <a href="#!" className="nav-link dropdown-toggle pl-md-3 position-relative" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span><i data-feather="mail" className="svg-icon" /></span>
        <span className="badge badge-primary notify-no rounded-circle">
          {unReadEmailOfAuth.countOfUnReadEmails ? unReadEmailOfAuth.countOfUnReadEmails : ''}
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
        <ul className="list-style-none">
          <li>
            <div className="message-center notifications position-relative">
              {/* Message */}
              {
                unReadEmailOfAuth.items.slice().sort((a, b) => {
                  const createdAtA = a.createdAt
                  const createdAtB = b.createdAt
                  if (createdAtB > createdAtA) return 1
                  if (createdAtA > createdAtB) return -1
                  return 0
                }).map((item) => (
                  <UnReadEmailItem key={item.id} item={item} />
                ))
              }
            </div>
          </li>
          <li>
            <Link to={EMAIL_LIST_PAGE} className="nav-link pt-3 text-center text-dark">
              <strong>Check all notifications</strong>
              <i className="fa fa-angle-right" />
            </Link>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default observer(UnReadEmailList)
