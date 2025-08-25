import { useState } from "react"
import { useDataStore } from "../../store/dataStore"
import RoomDetail from "./RoomDetail"
import RoomForm from "./RoomForm"
import Alert from "./Alert"
import EditDialog from "./EditDialog"

const RoomCard = ({ room, type, hostel }) => {
  const deleteRoom = useDataStore((state) => state.deleteRoom)
  const updateRoom = useDataStore((state) => state.updateRoom)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editData, setEditData] = useState({
    rooms: room.rooms,
    roomsAvailable: room.roomsAvailable,
    roomsOccupied: room.roomsOccupied,
  })
  const [error, setError] = useState("")

  // -------- Validation --------
  const validateData = () => {
    if (editData.rooms < editData.roomsOccupied)  return "Occupied rooms cannot exceed total rooms."
    if (editData.rooms < editData.roomsAvailable + editData.roomsOccupied)  return "Available + Occupied rooms cannot exceed total rooms."
    if (editData.bedsAvailable < 0 || editData.bedsOccupied < 0)  return "Beds cannot be negative."

    return ""
  }

  const handleSave = () => {
    const validationError = validateData()
    if (validationError) {
      setError(validationError)
      return
    }
    updateRoom(room.id, editData)
    setIsEditing(false)
    setError("")
  }

  const handleDelete = () => {
    deleteRoom(room.id)
    setShowDeleteConfirm(false)
  }
    const handleCancel = () => {
    setIsEditing(false)
    setError("")   // reset error when closing
    setEditData({
      rooms: room.rooms,
      roomsAvailable: room.roomsAvailable,
      roomsOccupied: room.roomsOccupied,
    }) // reset back to original values
  }


     const title = "Edit Room";
     const descrip = "Update the details of Room below. All field are required."
  return (
    <div className="border p-4 rounded-lg shadow bg-[#F8B6000D]">
      {/* Room details view */}
      <RoomDetail room={room} type={type} hostel={hostel}
        onEdit={() => setIsEditing(true)} onDelete={() => setShowDeleteConfirm(true)}
      />
      

      <EditDialog open = {isEditing} onOpenChange={setIsEditing} title={title} description={descrip} 
         error = {error} onCancel={handleCancel} onSave={handleSave} 
      >
          <RoomForm editData={editData} setEditData={setEditData} hostel={hostel} />
      </EditDialog>

      {/* ---------- Delete Confirmation ---------- */}
      <Alert open={showDeleteConfirm}  onOpenChange={setShowDeleteConfirm} onConfirm={handleDelete}  type="room" />
    </div>
  )
}

export default RoomCard
