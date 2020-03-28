import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import BtnAddClass from './BtnAddClass'
import MainList from './MainList'
import Data from './data'

const ForAdmin = () => {

  const { classes } = Data

  const { limit, page } = classes

  useEffect(() => {
    Data.onDidMount()
    return () => {
      Data.onWillUnMount()
    }
  }, [])

  return (
    <div>
      <BtnAddClass />
      <MainList
        classes={classes}
        limit={limit}
        page={page}
      />
    </div>
  )
}

export default observer(ForAdmin)
