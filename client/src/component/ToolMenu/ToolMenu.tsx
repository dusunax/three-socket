import React from "react";
import {
  MdOutline360,
  MdZoomIn,
  MdPanTool,
  MdRotateRight,
} from "react-icons/md";

type Tools = {
  enableRotate: boolean;
  enablePan: boolean;
  enableZoom: boolean;
  autoRotate: boolean;
};
export default function ToolMenu({
  value,
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<Tools>>;
  value: Tools;
}) {
  const toolItems = [
    {
      icon: <MdRotateRight size={30} />,
      text: `Rotate`,
      stateName: "enableRotate",
    },
    {
      icon: <MdPanTool size={30} />,
      text: `Pan`,
      stateName: "enablePan",
    },
    {
      icon: <MdZoomIn size={30} />,
      text: `Zoom`,
      stateName: "enableZoom",
    },
    {
      icon: <MdOutline360 size={30} />,
      text: `Auto Rotate`,
      stateName: "autoRotate",
    },
  ];

  const toggleTool = (stateName: string) => {
    setValue((prev) => ({
      ...prev,
      [stateName]: !prev[stateName as keyof typeof prev],
    }));
  };

  return (
    <ul className="flex flex-col gap-4 justify-end p-2 text-xs">
      {toolItems.map((item) => (
        <li
          key={item.stateName}
          className={`flex flex-col items-center bg-gray-300 p-2 rounded-md cursor-pointer whitespace-nowrap break-keep ${
            value[item.stateName as keyof typeof value] ? "bg-blue-300" : ""
          }`}
          onClick={() => toggleTool(item.stateName)}
        >
          {item.icon}
          {item.text}
        </li>
      ))}
    </ul>
  );
}
