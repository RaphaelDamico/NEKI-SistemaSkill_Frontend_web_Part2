import { GrFormViewHide, GrFormView } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { IconProps } from "../../interfaces";
import { FaArrowLeft, FaArrowRight  } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const icons = {
    viewHide: GrFormViewHide,
    viewOpen: GrFormView,
    trash: FaRegTrashAlt,
    edit: FiEdit,
    logout: SlLogout,
    arrowLeft: FaArrowLeft,
    arrowRight: FaArrowRight,
    loading: AiOutlineLoading3Quarters,
    arrowDown: IoIosArrowDown,
    arrowUp: IoIosArrowUp

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