"use client"
import React from 'react'
import OrderForm from './OrderForm'
import PendingOrders from './PendingOrders'
import CompletedOrders from './CompletedOrders'

function HomePage() {
  return (
    <>
    <OrderForm />
     <PendingOrders />
     <CompletedOrders />
    </>
  )
}

export default HomePage