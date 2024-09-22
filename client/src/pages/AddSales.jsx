import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";

const AddSales = () => {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rows, setRows] = useState([{ qty: '', unitPrice: '', discount: '', gst: '', itemName: '' }]);

  const currencies = [
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
    { value: "BTC", label: "฿" },
    { value: "JPY", label: "¥" },
  ];

  const gstSlabs = [
    { value: "0", label: "0%" },
    { value: "5", label: "5%" },
    { value: "12", label: "12%" },
    { value: "18", label: "18%" },
    { value: "28", label: "28%" },
  ];

  const increment = () => {
    setRows([...rows, { qty: '', unitPrice: '', discount: '', gst: '', itemName: '' }]);
  };

  const fetchData = async () => {
    const response = await axios.get(`${baseurl}/items`);
    setItems(response.data.items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event, index) => {
    const data = items?.filter((x) => x.itemname === event.target.value);
    const selected = data[0] || null;
    setSelectedItem(selected);

    if (selected) {
      handleRowChange(index, 'unitPrice', selected.unitPrice);
      handleRowChange(index, 'itemName', selected.itemname); // Set the item name in the row
    } else {
      handleRowChange(index, 'unitPrice', '');
      handleRowChange(index, 'itemName', '');
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value; 
    setRows(updatedRows);
  };

  const calculateAmount = (qty, unitPrice, discount, gst) => {
    const subtotal = qty * unitPrice;
    const totalDiscount = discount;
    const totalGST = (gst / 100) * subtotal;
    const disc = (discount / 100) * (subtotal + totalGST);
    return (subtotal - disc + totalGST);
  };

  return (
    <div className="w-full h-screen overflow-auto p-5 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-5">
          <div className="flex-1">
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <div className="flex">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Currency"
                  defaultValue="EUR"
                  helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error
                  id="outlined-error"
                  label="Error"
                  defaultValue="Hello World"
                />
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
              />
            </Box>
          </div>

          <div className="flex-1 space-y-4 ml-5">
            <TextField
              id="outlined-basic"
              label="Invoice Number"
              defaultValue="6"
              fullWidth
            />
            <TextField
              id="date"
              label="Invoice Date"
              type="date"
              defaultValue="2024-09-21"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <select
              id="state-of-supply"
              className="border border-gray-300 p-2 w-full rounded"
              defaultValue="Select"
            >
              <option value="Select">State of Supply</option>
              <option value="Kerala">Kerala</option>
              <option value="Tamilnadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Goa">Goa</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              {["Item", "Qty", "Unit", "Price/Unit", "Discount", "Tax", "Amount"].map((header, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Item Name"
                    list="itemNames"
                    onChange={(e) => handleInputChange(e, index)}
                    value={row.itemName || ""} // Controlled value for item name
                  />
                  <datalist id="itemNames">
                    {items?.map((item) => (
                      <option key={item._id}>{item?.itemname}</option>
                    ))}
                  </datalist>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Qty"
                    value={row.qty || ''} // Ensure controlled value
                    onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    className="border border-gray-300 p-2 w-full rounded"
                    onChange={(e) => handleRowChange(index, 'unitType', e.target.value)}
                  >
                    <option>Bag</option>
                    <option>Pack</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Price/Unit"
                    value={row.unitPrice || ''} // Use the value from rows
                    onChange={(e) => handleRowChange(index, 'unitPrice', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Discount"
                    value={row.discount || ''} // Ensure controlled value
                    onChange={(e) => handleRowChange(index, 'discount', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    name="gst_slab"
                    className="border rounded p-2 w-full"
                    onChange={(e) => handleRowChange(index, 'gst', e.target.value)}
                  >
                    <option value="">Select GST Slab</option>
                    {gstSlabs.map((slab) => (
                      <option key={slab.value} value={slab.value}>
                        {slab.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span>
                    {calculateAmount(row.qty, row.unitPrice, row.discount, row.gst) || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          variant="contained"
          onClick={increment}
          className="text-blue-700 hover:bg-blue-700"
        >
          Add Row
        </Button>
      </div>
    </div>
  );
};

export default AddSales;
