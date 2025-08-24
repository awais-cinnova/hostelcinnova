import { useState } from "react"
import { useDataStore } from "../../store/dataStore"
import { Button } from "@/components/ui/button"
import BedDetail from "./BedDetail"
import BedForm from "./BedForm"

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

const BedCard = ({ bed, type, hostel }) => {
  const deleteBed = useDataStore((state) => state.deleteBed)
  const updateBed = useDataStore((state) => state.updateBed)

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editData, setEditData] = useState({
    beds: bed.beds,
    bedsAvailable: bed.bedsAvailable,
    bedsOccupied: bed.bedsOccupied,
  })
  const [error, setError] = useState("")

  // -------- Validation --------
  const validateData = () => {
    if (editData.beds < editData.bedsOccupied) 
      return "Occupied beds cannot exceed total beds."
    if (editData.beds < editData.bedsAvailable + editData.bedsOccupied) 
      return "Available + Occupied beds cannot exceed total beds."
    
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
    updateBed(bed.id, editData)
    setIsEditing(false)
    setError("")
  }

  const handleDelete = () => {
    deleteBed(bed.id)
    setShowDeleteConfirm(false)
  }

  return (
    <div className="border p-4 rounded-lg shadow bg-[#E8F0FE]">
      {/* Bed details view */}
      <BedDetail
        bed={bed}
        type={type}
        hostel={hostel}
        onEdit={() => setIsEditing(true)}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      {/* ---------- Edit Dialog ---------- */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Bed</DialogTitle>
          </DialogHeader>

          <BedForm
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
              This action will permanently delete the bed record. You can’t
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

export default BedCard