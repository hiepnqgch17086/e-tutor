import React from 'react'
import { observer } from 'mobx-react-lite'

const BtnUploadFile = () => {
  return (
    <a className="btn-circle btn-lg btn-cyan float-right text-white mr-2" href="#!"><i className="fas fa-paperclip" /></a>
  )
}

export default observer(BtnUploadFile)
