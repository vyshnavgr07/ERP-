import { useState } from 'react'
import SideBar from './components/SideBar'
import SaleInvoices from './pages/SaleInvoices'
import SalesHeader from './components/SalesHeader'
import AddSales from './pages/AddSales'
import { Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
    <div className='w-full  flex overflow-scroll'>  
      <SideBar/>
<Routes>
  <Route path='/' element={<SaleInvoices />} />
  <Route path='/add' element={<AddSales />} />

</Routes>


</div>
    </>
  )
}

export default App
