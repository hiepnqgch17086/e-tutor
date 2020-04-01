import React from 'react'
import { observer } from 'mobx-react-lite'
import IpSearchContact from './IpSearchContact'
import './index.css'
import ListOfContacts from './ListOfContacts'
import CurrentRoom from './CurrentRoom'
import IpText from './IpText'

const ChatPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-lg-3 col-xl-2 border-right">
              <IpSearchContact />
              <ListOfContacts />
            </div>
            <div className="col-lg-9  col-xl-10">
              <CurrentRoom />
              <IpText />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default observer(ChatPage)
