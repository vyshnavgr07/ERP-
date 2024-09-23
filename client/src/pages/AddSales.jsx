import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSales = () => {
  const navigate=useNavigate()
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [invoice, setInvoice] = useState([]);
  
  
  const invoiceNumber = invoice.length;
  console.log(invoiceNumber,"invoiddddd")
  // Fetch customers
  const fetchUser = async () => {
    try {
      const userResponse = await axios.get(`${baseurl}/customers`);
      setUsers(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch items
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseurl}/items`);
      setItems(response.data.items);
    } catch (error) {
      console.log(error, "err");
    }
  };

  // Fetch transactions to set invoice number
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

  // Formik setup
  const formik = useFormik({
    initialValues: {
      selectedUser: "",
      invoiceDate: new Date().toISOString().split("T")[0], // Default to current date
      stateOfSupply: "Select",
      rows: [{ qty: "", unitPrice: "", discount: "", gst: "0", itemName: "" }],
    },
    onSubmit: async (values) => {
      const itemsData = items;

      const itemsArray = values.rows.map((row) => ({
        itemId: itemsData.find((item) => item.itemname === row.itemName)?._id,
        qty: parseInt(row.qty),
        unit: "Bag", // You can adjust the unit type
        Discount: parseFloat(row.discount),
        Amount: calculateAmount(row.qty, row.unitPrice, row.discount, row.gst),
      }));

      const totalAmount = itemsArray.reduce(
        (total, item) => total + item.Amount,
        0
      );

      const dataToSend = {
        userId: values.selectedUser, 
        items: itemsArray,
        invoiceNumber:invoiceNumber,
        Date: new Date(),
        totalAmount,
      };

      try {
        const response = await axios.post(`${baseurl}/transaction`, dataToSend);
        if(response.status==200){
          formik.resetForm();
          fetchTransaction();
           navigate('/')
        }
        formik.resetForm();
        fetchTransaction();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Handle change in each row
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

  // Add a new row for items
  const increment = () => {
    formik.setFieldValue("rows", [
      ...formik.values.rows,
      { qty: "", unitPrice: "", discount: "", gst: "0", itemName: "" },
    ]);
  };

  // Calculate total amount per row
  const calculateAmount = (qty, unitPrice, discount, gst) => {
    const subtotal = qty * unitPrice;
    const totalGST = (gst / 100) * subtotal;
    const disc = (discount / 100) * (subtotal + totalGST);
    return subtotal - disc + totalGST;
  };

  console.log(invoice.length,"invoicee")
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
              <div className="flex">
                <TextField
                  id="selectedUser"
                  select
                  label="Select User"
                  value={formik.values.selectedUser}
                  onChange={(e) => {
                    formik.setFieldValue("selectedUser", e.target.value); // Store only the user ID
                  }}
                  helperText="Please select a user"
                  fullWidth
                >
                  {users?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name} {/* Display the name, but store the ID */}
                    </MenuItem>
                  ))}
                </TextField>
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
              <select
                id="stateOfSupply"
                className="border border-gray-300 p-2 w-full rounded"
                value={formik.values.stateOfSupply}
                onChange={formik.handleChange}
              >
                <option value="Select">State of Supply</option>
                <option value="Kerala">Kerala</option>
                <option value="Tamilnadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Goa">Goa</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </Box>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
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
                      placeholder="Price/Unit"
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
                      className="border border-gray-300 p-2 w-full rounded"
                      value={row.gst}
                      onChange={(e) =>
                        handleRowChange(index, "gst", e.target.value)
                      }
                    >
                      {gstSlabs.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {calculateAmount(
                      row.qty,
                      row.unitPrice,
                      row.discount,
                      row.gst
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            variant="contained"
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add New Row
          </Button>

          <div className="mt-4">
            <Button
              type="submit"
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSales;
