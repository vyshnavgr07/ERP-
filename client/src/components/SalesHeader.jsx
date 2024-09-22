import React from 'react'
import { PlusCircle,PhoneCall,Bell,Settings} from "lucide-react";
import TextWithIcons from '../shared/TextWithIcons';
const SalesHeader = () => {
  return (
    <div className='w-full  flex p-2 justify-between space-x-1'>
       
        <div className='w-2/5  border-gray-400 border-r-2 '>
          <input className='w-3/4 h-14  focus:border-black   placeholder:text-center'  placeholder='Enter Business Name'/>
        </div>



        <div className="flex space-x-4 w-2/5">
          <TextWithIcons label="Add Sale" icon={PlusCircle} color="red-500" />
          <TextWithIcons
            label="Add Purchase"
            icon={PlusCircle}
            color="blue-700"
          />
          <TextWithIcons label="Add More" icon={PlusCircle} color="blue-700" />
        </div>

        <div className='w-1/5 flex justify-evenly items-center'>
      <PhoneCall/>
      <Bell/>
      <Settings/>
        </div>
      </div>

  )
}

export default SalesHeader
