const BedForm = ({ editData, setEditData }) => {
    const handleChange = (e) => {
      const { name, value } = e.target
      setEditData((prev) => ({ ...prev, [name]: Number(value) }))
    }
  
    return (
      <div className="flex flex-col gap-2 mt-2">
        <label>
          Total Beds:
          <input
            type="number"
            name="beds"
            value={editData.beds}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        </label>
  
        <label>
          Beds Available:
          <input
            type="number"
            name="bedsAvailable"
            value={editData.bedsAvailable}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        </label>
  
        <label>
          Beds Occupied:
          <input
            type="number"
            name="bedsOccupied"
            value={editData.bedsOccupied}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        </label>
      </div>
    )
  }
  
  export default BedForm