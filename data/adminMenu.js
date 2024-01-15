import { FaHouseUser } from 'react-icons/fa';
import { IoDocuments } from 'react-icons/io5';
import {
  RiCommunityFill,
  RiDashboard3Fill,
  RiFileUserFill,
  RiLogoutCircleRFill,
  RiMessage2Fill,
} from 'react-icons/ri';
import { MdOutlineWork } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';

export const adminMenu = {
  Dashboard: <RiDashboard3Fill />,
  Apartments: <RiCommunityFill />,
  Tenants: <FaHouseUser />,
  // Jobs: <MdOutlineWork />,
  // Applicants: <RiFileUserFill />,
  Messages: <RiMessage2Fill />,
  Team: <HiUsers />,
  Internal: <IoDocuments />,
  Logout: <RiLogoutCircleRFill />,
};
