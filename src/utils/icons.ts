import { MdOutlineWorkOutline, MdOutlineSchool, MdOutlineLocalLibrary, MdOutlineCode, MdOutlineFavoriteBorder } from "react-icons/md";
import { GoHome, GoRocket } from "react-icons/go";
import { FaRegUser, FaRegLightbulb, FaRegFolderOpen } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

export const ICON_MAP: Record<string, React.ComponentType> = {
    'work': MdOutlineWorkOutline,
    'home': GoHome,
    'personal': FaRegUser,
    'study': MdOutlineSchool,
    'reading': MdOutlineLocalLibrary,
    'code': MdOutlineCode,
    'ideas': FaRegLightbulb,
    'project': GoRocket,
    'docs': HiOutlineDocumentText,
    'folder': FaRegFolderOpen,
    'favorite': MdOutlineFavoriteBorder,
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export const getIconComponent = (iconName: string): React.ComponentType => {
    return ICON_MAP[iconName] || MdOutlineWorkOutline;
}