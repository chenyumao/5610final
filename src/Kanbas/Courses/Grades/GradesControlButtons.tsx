import { LiaFileImportSolid } from "react-icons/lia";
import { LiaFileExportSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
export default function GradesControlButtons() {
    return (
        <div className="float-end">
            <button id="wd-import" className="btn btn-secondary me-2">
                <LiaFileImportSolid className="me-1" />
                Import
            </button>
            <button id="wd-export" className="btn btn-secondary me-2">
                <LiaFileExportSolid className="me-1" />
                Export
            </button>
            <button id="wd-setting" className="btn btn-secondary">
                <CiSettings className="me-1"/>
            </button>
        </div>
    )
}