import { useState } from 'react'
import SideBar from './components/SideBar'
import SaleInvoices from './pages/SaleInvoices'
import SalesHeader from './components/SalesHeader'
import AddSales from './pages/AddSales'


function App() {


  return (
    <>
    <div className='w-full  flex overflow-scroll'>  
{/* <SideBar/>
<SaleInvoices/> */}
<AddSales/>

</div>
    </>
  )
}

export default App
