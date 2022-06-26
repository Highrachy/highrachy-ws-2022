import { FaHouseUser } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import {
  RiCommunityFill,
  RiDashboard3Fill,
  RiFileUserFill,
  RiLogoutCircleRFill,
  RiMessage2Fill,
} from 'react-icons/ri';
import { MdOutlineWork } from 'react-icons/md';

export const adminMenu = {
  Dashboard: <RiDashboard3Fill />,
  Apartments: <RiCommunityFill />,
  Tenants: <FaHouseUser />,
  Jobs: <MdOutlineWork />,
  Applicants: <RiFileUserFill />,
  Messages: <RiMessage2Fill />,
  Logout: <RiLogoutCircleRFill />,
};
