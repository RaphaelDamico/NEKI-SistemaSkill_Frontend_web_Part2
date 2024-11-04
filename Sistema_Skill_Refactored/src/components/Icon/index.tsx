import { GrFormViewHide, GrFormView } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { IconProps } from "../../interfaces";

const icons = {
    viewHide: GrFormViewHide,
    viewOpen: GrFormView,
    trash: FaRegTrashAlt,
    edit: FiEdit,
    logout: SlLogout

};

export default function Icon({ name, className, color, size, onClick }: IconProps) {
    if (!icons[name as keyof typeof icons]) return null;

    const IconComponent = icons[name as keyof typeof icons];

    return (
        <>
            <IconComponent
                className={className}
                color={color}
                onClick={onClick}
                size={size}
            />
        </>
    );
};