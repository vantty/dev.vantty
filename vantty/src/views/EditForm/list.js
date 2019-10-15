import React from "react";

import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ImageIcon from "@material-ui/icons/Image";

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
  },

  {
    title: "Change Password",
    href: "/password",
    icon: <ImageIcon />
  }
];

export const pagesUser = [
  {
    title: "Profile",
    href: "/personal-info",
    icon: <PeopleIcon />
  },
  {
    title: "Change Password",
    href: "/password",
    icon: <ImageIcon />
  }
];
