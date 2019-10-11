import { w1, w2, w3, w4, w5, w6 } from "../../assets/images/wedding";
import b1 from "../../assets/images/banner.png";
import b2 from "../../assets/images/banner2.png";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7
} from "../../assets/images/featuredArtist";
import {
  fm1,
  fm2,
  fm3,
  fm4,
  fm5,
  fm6
} from "../../assets/images/featuredMakeups";
import {
  fh1,
  fh2,
  fh3,
  fh4,
  fh5,
  fh6
} from "../../assets/images/featuresHairstyles";

const weddingImages = [
  { name: "Natalia", photo: w1 },
  { name: "Luisa", photo: w2 },
  { name: "Lina", photo: w3 },
  { name: "Cate", photo: w4 },
  { name: "Sara", photo: w5 },
  { name: "Sor", photo: w6 }
];
const featuredArtistImages = [fa1, fa2, fa3, fa4, fa5, fa6, fa7];
const banner1Image = b1;
const banner2Image = b2;
const featuredMakeupsImages = [
  { name: "Natalia", photo: fm1 },
  { name: "Luisa", photo: fm2 },
  { name: "Lina", photo: fm3 },
  { name: "Cate", photo: fm4 },
  { name: "Sara", photo: fm5 },
  { name: "Sor", photo: fm6 }
];
const featuresHairstyles = [
  { name: "Natalia", photo: fh1 },
  { name: "Luisa", photo: fh2 },
  { name: "Lina", photo: fh3 },
  { name: "Cate", photo: fh4 },
  { name: "Sara", photo: fh5 },
  { name: "Sor", photo: fh6 }
];

export const homeSeed = {
  firstGrid: {
    title: "Bridal",
    images: weddingImages
  },
  secondGrid: {
    title: "Featured Makeups",
    images: featuredMakeupsImages
  },
  thirdGrid: {
    title: "Featured Hairstyles",
    images: featuresHairstyles
  },
  carousel: {
    title: "Featured Artist",
    artist: "Natalia Zuluaga",
    images: featuredArtistImages
  },
  firstBanner: {
    image: banner1Image,
    text: "Find the best beauty in your area and change your look!"
  },
  secondBanner: {
    image: banner2Image,
    text: "Get more clients and grow your own brand as an Artist!"
  }
};
