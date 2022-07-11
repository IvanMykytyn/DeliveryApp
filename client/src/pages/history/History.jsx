import './history.styles.scss'
import React from 'react'

// components
import { HistoryList } from '../../components'

const History = () => {
  return (
    <div className="history">
      <div className="history__container">
        <header className="history__title">
          <h1>Your Order History</h1>
        </header>
        <HistoryList />
      </div>
    </div>
  )
}

export default History
