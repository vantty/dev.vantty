import React from "react";

import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ImageIcon from "@material-ui/icons/Image";

import LockOpenIcon from "@material-ui/icons/LockOpen";

export const pagesProfile = [
  {
    title: "Profile",
    href: "/personal-info",
    icon: <PeopleIcon />
  },
  {
    title: "Biografy",
    href: "/edit-profile",
    icon: <ImageIcon />
  },

  {
    title: "Portfolio",
    href: "/add-portfolio",
    icon: <PeopleIcon />
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <ImageIcon />
  },
  {
    title: "Service",
    href: "/price",
    icon: <ImageIcon />
  },
  {
    title: "Mobile",
    href: "/mobile",
    icon: <ShoppingBasketIcon />
  }
];

export const pagesUser = [
  {
    title: "Profile",
    href: "/personal-info"
  }
];

export const pagesGeneral = [
  {
    title: "Change Password",
    href: "/password"
  },
  {
    title: "Terms",
    href: "/terms-of-service"
  },

  {
    title: "Data Policy",
    href: "/data-policy"
  }
];
