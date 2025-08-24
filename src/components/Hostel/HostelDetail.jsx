import { useParams } from "react-router-dom";
import { useDataStore } from "../../store/dataStore"; 
import HostelCard from "./HostelCard";
import RoomBedTabs from "../Tab/RoomBedTabs";
const HostelDetail = () => {
  const { hostelId } = useParams();

  const hostels = useDataStore((state) => state.hostels);
  const rooms = useDataStore((state) => state.rooms);
  const roomTypes = useDataStore((state) => state.roomTypes);
  const beds = useDataStore((state) => state.beds);
  const hostel = hostels.find((h) => h.id === hostelId);

  if (!hostel) {
    return <h2 className="text-center text-red-500">Hostel not found</h2>;
  }

  const hostelRooms = rooms.filter((room) => room.hostelId === hostel.id);
  const hostelBeds = beds.filter((bed) => bed.hostelId === hostel.id);
  return (
    <div className="p-6 flex flex-col gap-3">
      <div className="border rounded-md p-4 shadow hover:shadow-lg transition cursor-pointer">
        <HostelCard
          key={hostel.id}
          hostel={hostel}
          imgClass="xl:w-[60%]"
          className="flex flex-col xl:flex-row flex-1 gap-5 items-center text-5xl"
        />
      </div>

      <RoomBedTabs
        hostel={hostel}
        hostelRooms={hostelRooms}
        hostelBeds={hostelBeds}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default HostelDetail;
