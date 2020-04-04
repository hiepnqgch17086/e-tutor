import React from 'react'
import { observer } from 'mobx-react-lite'
import CustomTable from '../../components-in-managing-resources/CustomTable'
import moment from 'moment'
import { Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { get_EMAIL_DETAIL_PAGE } from '../../routes'
import { defaultOfEmails, defaultOfEmail } from '../../models-one-entity/Emails'

const MainList = ({
  emailList = defaultOfEmails
}) => {
  const history = useHistory()
  // const defaultItem = {
  //   id: 1,
  //   title: 'System node title',
  //   body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo repellat, impedit asperiores id natus, autem quam quibusdam, odit consequuntur nam recusandae sunt enim sit voluptatum temporibus cumque! Dolorem, eius cum!',
  //   createdAt: moment().format()
  // }

  // const defaultData = [defaultItem]

  const headerArray = ['Title', 'Body', 'CreatedAt',]

  return (
    <div className={`card mb-2`}>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {
                headerArray.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              emailList.items.map((item, index) => (
                <tr style={{ backgroundColor: item.isRead ? '' : '#0000ff17', cursor: 'pointer' }} key={index}
                  onClick={() => history.push(get_EMAIL_DETAIL_PAGE(item.id))}
                >
                  <th>{item.title}</th>
                  <th>
                    {!item.isRead && (
                      <i className="icon-drawar mr-1" />
                    )}
                    {item.bodyDisplay}
                  </th>
                  <th>{moment(item.createdAt).calendar()}</th>
                  {/* <CustomTableItemObserver key={index} item={item} index={index} renderItemCellsInRow={renderItemCellsInRow} renderRowStyle={renderRowStyle} /> */}
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>


    //     <CustomTable
    //       headerArray={['Title', 'Body', 'CreatedAt',]}
    //       data={emailList.items}
    //       renderRowStyle={({ item = defaultOfEmail, index = 0 }) => {
    //         const style = { cursor: 'pointer' }
    //         // @ts-ignore
    //         if (!item.isRead) style.backgroundColor = 'rgba(124, 135, 152, 0.11)'
    //         return style
    //       }}
    //       renderItemCellsInRow={({ item = defaultOfEmail, index = 0 }) => {
    //         const WrapLink = ({children}: any) => (
    //           <Link to={get_EMAIL_DETAIL_PAGE(item.id)}>
    //             {children}
    //           </Link>
    //         )
    //         return [
    //           <WrapLink>
    // {item.title}
    //           </WrapLink>,
    //           <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    // {!item.isRead && (
    //   <i className="icon-drawar mr-1" />
    // )}
    // {item.bodyDisplay}
    //           </div>,
    //           moment(item.createdAt).calendar(),
    //         ]
    //       }}
    //     />
  )
}

export default observer(MainList)
