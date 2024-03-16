import {
  BriefcaseIcon,
  ChartBarIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

export const contactData = [
  {
    title: "Room Cleanliness Assessment",
    icon: BriefcaseIcon,
    description:
      "Utilize image analysis to assess room cleanliness, checking for bedsheet wrinkles, floor, etc.",
  },
  {
    title: "Inventory Check",
    icon: ChartBarIcon,
    description:
      "Monitor the inventory of amenities provided in the rooms, such as towels, toiletries, and minibar items.",
  },
  {
    title: "Room Image Generation",
    icon: PlayIcon,
    description:
      "Use Generative AI to generate ideal room images and compare them with uploaded photos to find differences.",
  },
  {
    title: "Progress Reports",
    icon: BriefcaseIcon,
    description:
      "Generate detailed reports that provide a comprehensive view of inspections performed by the staff.",
  },
  {
    title: "Scheduling of Checks",
    icon: ChartBarIcon,
    description:
      "Schedule monthly, weekly, and daily checks, flagging rooms for subsequent inspections that fail to meet standards.",
  },
  {
    title: "Damage Detection and Estimation",
    icon: PlayIcon,
    description:
      "Detect abnormalities such as broken furniture, stains, or damage. Estimate the cost for replacement if any!",
  },
];

export default contactData;
