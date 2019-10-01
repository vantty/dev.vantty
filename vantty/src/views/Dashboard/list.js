import React from "react";

import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ImageIcon from "@material-ui/icons/Image";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import {
  EditPortfolio,
  EditProfile,
  EditPrice,
  EditMobile,
  EditPersonalInfo,
  EditCategories
} from "../EditForm/components";
import { PersonalInfo } from "../Form/components";

export const pages = [
  {
    title: "Profile Image",
    href: "/personal-info",
    icon: <PeopleIcon />,
    component: <EditPersonalInfo />
  },
  {
    title: "Biografy",
    href: "/edit-profile",
    icon: <ImageIcon />,
    component: <EditProfile />
  },

  {
    title: "Portfolio",
    href: "/add-portfolio",
    icon: <PeopleIcon />,
    component: <EditPortfolio />
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <ImageIcon />,
    component: <EditCategories />
  },
  {
    title: "Service",
    href: "/price",
    icon: <ImageIcon />,
    component: <EditPrice />
  },
  {
    title: "Mobile",
    href: "/mobile",
    icon: <ShoppingBasketIcon />,
    component: <EditMobile />
  },

  {
    title: "**Change Password",
    href: "/password",
    icon: <ImageIcon />,
    component: <EditProfile />
  },
  {
    title: "D == Create profile",
    href: "/create-profile",
    icon: <LockOpenIcon />
  },

  {
    title: "D == Main Page",
    href: "/",
    icon: <SettingsIcon />
  },
  {
    title: "D == Dashboard",
    href: "/Dashboard-admin",
    icon: <SettingsIcon />
  },
  {
    title: "Logout",
    href: "/Dashboard-admin",
    icon: <SettingsIcon />
  }
];

export const pagesUser = [
  {
    title: "Profile Image",
    href: "/personal-info",
    icon: <PeopleIcon />
  },
  {
    title: "Profile",
    href: "/edit-profile",
    icon: <LockOpenIcon />
  }
];
