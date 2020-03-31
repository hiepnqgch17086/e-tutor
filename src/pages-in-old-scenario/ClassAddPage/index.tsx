import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainForm from './MainForm'
import Data from './data'
// import { ClassMember } from '../../models-one-entity/ClassMembers'

// const claM = ClassMember.create({})
// console.log(claM)

/**
 * FOR ADMIN ONLY, define route in App.tsx
 */
const ClassAddPage = () => {
  useEffect(() => {
    return () => {
      Data.onWillUnMount()
    }
  }, [])
  return (
    <>
      <MainForm />
    </>
  )
}

export default observer(ClassAddPage)
