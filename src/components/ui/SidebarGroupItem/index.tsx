import { ReactElement } from "react";
import CustomizableButton from "../CustomizableButton";
import useSidebarStore from "@src/stores/sidebar.store";

interface SidebarGroupItemProps {
  title: string;
  description: string;
  icon?: ReactElement;
  onClick?: () => void;
}

export default function SidebarGroupItem({
  title,
  description,
  icon,
  onClick,
}: SidebarGroupItemProps) {
  const { isCompact } = useSidebarStore();
  return (
    <CustomizableButton
      title={!isCompact ? title : undefined}
      description={!isCompact ? description : undefined}
      icon={icon}
      onClick={onClick}
      variant="primary"
    />
  );
}
