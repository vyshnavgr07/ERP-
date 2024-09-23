import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSales = () => {
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [selectedUserState, setSelectedUserState] = useState("");


  const invoiceNumber = invoice.length;


  const fetchUser = async () => {
    try {
      const userResponse = await axios.get(`${baseurl}/customers`);
      setUsers(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseurl}/items`);
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransaction = async () => {
    try {
      const getTransaction = await axios.get(`${baseurl}/transaction`);   
      setInvoice(getTransaction.data.transa);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTransaction();
    fetchUser();
  }, []);

  const gstSlabs = [
    { value: "0", label: "0%" },
    { value: "5", label: "5%" },
    { value: "12", label: "12%" },
    { value: "18", label: "18%" },
    { value: "28", label: "28%" },
  ];

  const formik = useFormik({
    initialValues: {
      selectedUser: "",
      invoiceDate: new Date().toISOString().split("T")[0], 
      stateOfSupply: "Select",
      address: "", 
      mobileNumber: "", 
      rows: [{ qty: "", unitPrice: "", discount: "", gst: "0", itemName: "" }],
    },
    onSubmit: async (values) => {
      const itemsData = items;

      const itemsArray = values.rows.map((row) => ({
        itemId: itemsData.find((item) => item.itemname === row.itemName)?._id,
        qty: parseInt(row.qty),
        unit: "Bag", 
        Discount: parseFloat(row.discount),
        Amount: calculateAmount(row.qty, row.unitPrice, row.discount, row.gst),
      }));

      const totalAmount = itemsArray.reduce(
        (total, item) => total + item.Amount,
        0
      );

      const dataToSend = {
        userId: selectedUserState, 
        items: itemsArray,
        invoiceNumber: invoiceNumber,
        Date: new Date(),
        totalAmount: Math.round(totalAmount),
        address: values.address,
        mobileNumber: values.mobileNumber,
      };

      try {
        const response = await axios.post(`${baseurl}/transaction`, dataToSend);
        if (response.status === 200) {
          formik.resetForm();
          fetchTransaction();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formik.values.rows];

    if (field === "itemName") {
      const selectedItem = items.find((item) => item.itemname === value);
      updatedRows[index][field] = value;
      updatedRows[index]["unitPrice"] = selectedItem
        ? selectedItem.unitPrice
        : "";
    } else {
      updatedRows[index][field] = value;
    }

    formik.setFieldValue("rows", updatedRows);
  };

  const increment = () => {
    formik.setFieldValue("rows", [
      ...formik.values.rows,
      { qty: "", unitPrice: "", discount: "", gst: "0", itemName: "" },
    ]);
  };

  const calculateAmount = (qty, unitPrice, discount, gst) => {
    const subtotal = qty * unitPrice;
    const totalGST = (gst / 100) * subtotal;
    const disc = (discount / 100) * (subtotal + totalGST);
    return subtotal - disc + totalGST;
  };

  const totalAmount = formik.values.rows.reduce((total, row) => {
    return total + calculateAmount(row.qty, row.unitPrice, row.discount, row.gst);
  }, 0);

const selectedUser=users.find((x)=>x?._id==selectedUserState)

  return (
    <div className="w-full h-screen overflow-auto p-5 bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <div className="flex justify-between mb-5">
          <div className="flex-1">
            <Box
              component="div"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            >
              <div className="w-full flex">
                <TextField
                  id="selectedUser"
                  select
                  label="Select User"
                  value={selectedUserState} 
                  onChange={(e) => {
                    setSelectedUserState(e.target.value); 
                    formik.setFieldValue("selectedUser", e.target.value); 
                  }}
                  helperText="Please select a user"
                  fullWidth
                >
                  {users?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
  id="address"
  label="Address"
  multiline
  rows={4} 
  value={selectedUser?.billingAddress}
  onChange={formik.handleChange}
  fullWidth
  variant="outlined" 
  sx={{ overflowY: 'auto' }} 
/>

<TextField
  id="mobileNumber"
  label="Mobile Number"
  multiline
  rows={2} 
  value={selectedUser?.phoneNumber}
  onChange={formik.handleChange}
  fullWidth
  variant="outlined" 
  sx={{ overflowY: 'auto' }} 
/>

              </div>
              
              <TextField
                id="invoiceNumber"
                label="Invoice Number"
                value={invoiceNumber}
                onChange={formik.handleChange}
                disabled
                fullWidth
              />
              <TextField
                id="invoiceDate"
                label="Invoice Date"
                type="date"
                value={formik.values.invoiceDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                {["Item", "Qty", "Price/Unit", "Discount", "Tax", "Amount"].map(
                  (header, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {formik.values.rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Item Name"
                      list="itemNames"
                      onChange={(e) =>
                        handleRowChange(index, "itemName", e.target.value)
                      }
                      value={row.itemName}
                    />
                    <datalist id="itemNames">
                      {items?.map((item) => (
                        <option key={item._id} value={item.itemname}></option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Qty"
                      value={row.qty}
                      onChange={(e) =>
                        handleRowChange(index, "qty", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Unit Price"
                      value={row.unitPrice}
                      onChange={(e) =>
                        handleRowChange(index, "unitPrice", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Discount"
                      value={row.discount}
                      onChange={(e) =>
                        handleRowChange(index, "discount", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      value={row.gst}
                      onChange={(e) =>
                        handleRowChange(index, "gst", e.target.value)
                      }
                    >
                      {gstSlabs.map((gst) => (
                        <option key={gst.value} value={gst.value}>
                          {gst.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Amount"
                      value={calculateAmount(row.qty, row.unitPrice, row.discount, row.gst)}
                      disabled
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="contained" onClick={increment}>
            Add Row
          </Button>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-lg font-semibold">Total Amount: {Math.round(totalAmount)}</div>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSales;
