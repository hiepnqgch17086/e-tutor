import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

const CustomTable = ({
  headerArray = ['#'],
  data = [],
  renderItemCellsInRow = ({ item, index }: any) => []
}: any) => {

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {
                //@ts-ignore
                headerArray.map((item, index) => (
                  <th key={index}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>

            {
              //@ts-ignore
              data.map((item, index) => <CustomTableItemObserver key={index} item={item} index={index} renderItemCellsInRow={renderItemCellsInRow} />)
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

const CustomTableItem = (({
  item = {}, index = 0,
  renderItemCellsInRow = ({ item, index }: any) => []
}) => {

  // rendering JoinedStudent will be re-render all
  return <tr>
    {/* {console.log('rendering')} */}
    {renderItemCellsInRow({ item, index }).map((cell, index2) => (
      <th key={index2}>
        {cell}
      </th>
    ))}
  </tr>
})

const CustomTableItemObserver = observer(CustomTableItem)

export default observer(CustomTable)
