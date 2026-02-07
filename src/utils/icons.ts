import { MdOutlineWorkOutline } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

export const ICON_MAP: Record<string, React.ComponentType> = {
    'work': MdOutlineWorkOutline,
    'home': GoHome,
    'personal': FaRegUser,
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export const getIconComponent = (iconName: string): React.ComponentType => {
    return ICON_MAP[iconName] || MdOutlineWorkOutline;
}