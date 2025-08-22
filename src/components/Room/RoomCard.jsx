import { useState } from "react"
import { useDataStore } from "../../store/dataStore"
import { Button } from "@/components/ui/button"
import RoomDetail from "./RoomDetail"
import RoomForm from "./RoomForm"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"

const RoomCard = ({ room, type, hostel }) => {
  const deleteRoom = useDataStore((state) => state.deleteRoom)
  const updateRoom = useDataStore((state) => state.updateRoom)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editData, setEditData] = useState({
    rooms: room.rooms,
    bedsAvailable: room.bedsAvailable,
    bedsOccupied: room.bedsOccupied,
    roomsAvailable: room.roomsAvailable,
    roomsOccupied: room.roomsOccupied,
  })
  const [error, setError] = useState("")

  // -------- Validation --------
  const validateData = () => {
    if (editData.rooms < editData.roomsOccupied) {
      return "Occupied rooms cannot exceed total rooms."
    }
    if (editData.rooms < editData.roomsAvailable + editData.roomsOccupied) {
      return "Available + Occupied rooms cannot exceed total rooms."
    }
    if (editData.bedsAvailable < 0 || editData.bedsOccupied < 0) {
      return "Beds cannot be negative."
    }
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

  return (
    <div className="border p-4 rounded-lg shadow bg-[#F8B6000D]">
      {/* Room details view */}
      <RoomDetail
        room={room}
        type={type}
        hostel={hostel}
        onEdit={() => setIsEditing(true)}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      {/* ---------- Edit Dialog ---------- */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>

          <RoomForm
            editData={editData}
            setEditData={setEditData}
            hostel={hostel}
          />

          {error && (
            <Alert variant="destructive" className="mt-3">
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------- Delete Confirmation ---------- */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the room record. You can’t
              undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RoomCard
