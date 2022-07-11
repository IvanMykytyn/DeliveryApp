import './history-list.styles.scss'

import React, { useEffect } from 'react'

// components
import HistoryItem from './HistoryItem'
import { Loading } from '../../components/'


// context
import { useAppContext } from '../../context/appContext'

const HistoryList = () => {
  // global state
  const { isLoading, orderHistory, getOrderHistory} = useAppContext()

  // fetch order history
  useEffect(() => {
    if (orderHistory.length === 0) {
      getOrderHistory()
    }
  }, [])

  if(isLoading){
    return <Loading /> 
  }

  return (
    <div className='history-list'>
      {orderHistory && orderHistory.map((order, index)=> {
        return <HistoryItem key={index} order={order}/>
      })}
    </div>
  )
}

export default HistoryList
