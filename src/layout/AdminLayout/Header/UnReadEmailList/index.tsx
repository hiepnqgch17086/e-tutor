import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { EMAIL_LIST_PAGE } from '../../../../routes'
import UnReadEmailItem from './UnReadEmailItem'
import ProfilePageData from '../../../../pages/ProfilePage/data'
import { unReadEmailOfAuth } from './data'
import DefaultClient, { gql } from 'apollo-boost'
import { getClient, UPDATED_MUTATION_TYPE, CREATED_MUTATION_TYPE, DELETED_MUTATION_TYPE } from '../../../../ApolloConfig'
import { getLocalStorageToken } from '../../../../routes'

let client: DefaultClient<unknown>
let querySubscription: ZenObservable.Subscription | null

const setClient = () => {
  if (client) return
  const jwt = getLocalStorageToken()
  if (!jwt) return
  client = getClient(jwt)
}

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
    if (!currentUser.id) return

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
        }
      })
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
          {unReadEmailOfAuth.countOfUnReadEmails}
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


              {/* <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-success text-white rounded-circle btn-circle"><i data-feather="calendar" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Event today</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">Just
              a reminder that you have event</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:10 AM</span>
                </div>
              </a>


              <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-info rounded-circle btn-circle"><i data-feather="settings" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Settings</h6>
                  <span className="font-12 text-nowrap d-block text-muted text-truncate">You
                  can customize this template
              as you want</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:08 AM</span>
                </div>
              </a>


              <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <span className="btn btn-primary rounded-circle btn-circle"><i data-feather="box" className="text-white" /></span>
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Pavan kumar</h6> <span className="font-12 text-nowrap d-block text-muted">Just
              see the my admin!</span>
                  <span className="font-12 text-nowrap d-block text-muted">9:02 AM</span>
                </div>
              </a> */}

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
