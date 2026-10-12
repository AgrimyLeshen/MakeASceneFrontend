"use client";

import Image from "next/image";

import Bell from "../assets/Bell.png";
import MapPin from "../assets/Map pin.png";
import Hash from "../assets/Hash.png";
import Calendar from "../assets/Calendar.png";
import Heart from "../assets/heartOutline.png";
import Ban from "../assets/Slash.png";
import HelpCircle from "../assets/Help circle.png";
import Tool from "../assets/Tool.png";
import Users from "../assets/Users.png";
import BookOpen from "../assets/Book open.png";
import Plus from "../assets/Plus.png";
import Check from "../assets/Check.png";
import X from "../assets/X.png";

const icons = {
  Bell,
  MapPin,
  Hash,
  Calendar,
  Heart,
  Ban,
  HelpCircle,
  Tool,
  Users,
  BookOpen,
  Plus,
  Check,
  X,
};

export default function Icon({ name, size = 20, className = "" }) {
  const src = icons[name];

  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}