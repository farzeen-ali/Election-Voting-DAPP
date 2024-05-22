import { IoMdHome } from "react-icons/io";
import { MdAdminPanelSettings, MdPeopleAlt  } from "react-icons/md";
import { FaPoll } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";

export const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: <IoMdHome />
    },
    {
      name: 'Admin',
      path: '/admin',
      icon: <MdAdminPanelSettings />
    },
    {
      name: 'Elections',
      path: '/elections',
      icon: <FaPoll />
    },
    {
      name: 'Candidate',
      path: '/candidate',
      icon: <MdPeopleAlt />
    },
    {
      name: 'Voting',
      path: '/voting',
      icon: <MdHowToVote />
    },
    {
      name: 'Registration',
      path: '/registration',
      icon: <IoLogIn />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <FaUser />
    },
  ]