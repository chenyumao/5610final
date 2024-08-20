import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <input type="text" value="40% of Total" readOnly 
            style={{
                border: '1px solid black', 
                backgroundColor: 'transparent',
                borderRadius: '10px',
                width: '120px',
              }}/>
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}