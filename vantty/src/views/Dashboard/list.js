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

export const pagesProfile = [
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
    title: "Change Password",
    href: "/password",
    icon: <ImageIcon />,
    component: <EditProfile />
  },

  {
    title: "Logout",
    href: "/home",
    icon: <ImageIcon />
  }
];

export const pagesUser = [
  {
    title: "Profile",
    href: "/personal-info",
    icon: <PeopleIcon />,
    component: <EditPersonalInfo />
  }
];
