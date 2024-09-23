import React from "react";
import { PlusCircle } from "lucide-react";
import TextWithIcons from "../shared/TextWithIcons";
import SalesHeader from "../components/SalesHeader";
import FinanceComp from "../components/FinanceComp";
import Transaction from "../components/Transaction";
import Sidebar from "../components/SideBar";
const SaleInvoices = () => {
  return (
    <div className="w-full ">
      
      {/* headerpage....... */}
     <SalesHeader/>
     <FinanceComp/>
     <Transaction/>
    </div>
  );
};

export default SaleInvoices;
