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

const w1 =
  "https://res.cloudinary.com/vantty/image/upload/v1571933793/seed/g0r4t2yoyjqnodgvx3n4.jpg";
const w2 =
  "https://res.cloudinary.com/vantty/image/upload/v1571933871/seed/gxko6olncffhryd3g9mz.jpg";
const w3 =
  "https://res.cloudinary.com/vantty/image/upload/v1571933945/seed/orhasfknai6phhcikimw.jpg";

const b1 =
  "https://res.cloudinary.com/vantty/image/upload/v1568384164/seed/reykbqajlzw7scokaqaq.png";
const b2 =
  "https://res.cloudinary.com/vantty/image/upload/v1568383815/seed/o8knnnqbihm4ixh4udgo.jpg";

const weddingImages = [
  { name: "Natalia", photo: w1, id: "5db1bf648d6cac663ea89959" },
  { name: "Luisa", photo: w2, id: "5db1c8cbd4c96341be9741d6" },
  { name: "Lina", photo: w3, id: "5db1c970c13233720873bb2c" }
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
