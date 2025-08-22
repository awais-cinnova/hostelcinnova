import HostelList from "../Hostel/HostelList";
import { useAuthStore } from "../../store/authStore";
import { useDataStore } from "../../store/dataStore";
import Navbar from "../Navbar/Navbar";

const OwnerDashboard = () => {
  const user = useAuthStore((state) => state.user);

  const hostels = useDataStore((state) => state.hostels);

  const ownerHostels = hostels.filter(
    (hostel) => hostel.ownerId === user?.id
  );

  return (
    <div className="p-6 flex flex-col gap-4">
      <Navbar />
      <HostelList hostels={ownerHostels} />
    </div>
  );
};

export default OwnerDashboard;
