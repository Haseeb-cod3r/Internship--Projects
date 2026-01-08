import wireless from "../assets/images/wireless.jpeg"
import bluetooth from "../assets/images/bluetooth.jpeg"
import camera from "../assets/images/4k-action.jpeg"
import chargingPad from "../assets/images/chargingpad.jpeg"
import keyboard from "../assets/images/keyboard.jpeg"
import mouse from "../assets/images/mouse.jpeg"

import { UserRole } from "../types";

export const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "High-quality noise-canceling headphones with 30-hour battery life.",
    price: 199.99,
    category: "Electronics",
    image: wireless,
    vendorId: "vendor_1",
  },
  {
    id: "2",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with deep bass and 12-hour battery life.",
    price: 59.99,
    category: "Electronics",
    image:bluetooth,
    vendorId: "vendor_1",
  },
  {
    id: "3",
    name: "4K Action Camera",
    description:
      "Waterproof action camera with ultra-wide lens and 4K recording.",
    price: 149.99,
    category: "Electronics",
    image: camera,
    vendorId: "vendor_2",
  },
  {
    id: "4",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29.99,
    category: "Electronics",
    image:chargingPad,
    vendorId: "vendor_1",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    description:
      "Tactile switches with RGB lighting for the ultimate typing experience.",
    price: 89.99,
    category: "Computing",
    image: keyboard,
    vendorId: "vendor_2",
  },
  {
    id: "6",
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with adjustable DPI and RGB lighting.",
    price: 39.99,
    category: "Computing",
    image: mouse,
    vendorId: "vendor_2",
  },
];
export const MOCK_VENDORS = [
  {
    id: "vendor_1",
    name: "Global Tech",
    role: UserRole.VENDOR,
    email: "tech@example.com",
  },
  {
    id: "vendor_2",
    name: "Urban Style",
    role: UserRole.VENDOR,
    email: "style@example.com",
  },
];
