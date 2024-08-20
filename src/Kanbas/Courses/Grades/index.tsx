import { CiSearch } from "react-icons/ci";
import GradesControlButtons from "./GradesControlButtons";
import { CiFilter } from "react-icons/ci";
import GradesTable from "./GradesTables";

export default function Grades() {
  return (
    <div id="wd-grades">
      <div className="d-flex justify-content-end align-items-center mb-3">
        <GradesControlButtons />
      </div>

      <div className="row g-0 align-items-center">

        <div className="col-6">
          <h5>Student Name</h5>
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text">
              <CiSearch />
            </span>
            <input
              type="text"
              id="wd-search-student"
              className="form-select"
              placeholder="Search Students"
            />
          </div>
        </div>

        <div className="col-6">
          <h5>Assignment Name</h5>
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text">
              <CiSearch />
            </span>
            <input
              type="text"
              id="wd-search-assignment"
              className="form-select"
              placeholder="Search Assignments"
            />
          </div>
        </div>
      </div>

      <button className="btn btn-secondary me-2 mt-2 mb-2">
        <CiFilter />
        Apply Filters
      </button>

      <GradesTable />
    </div>


  );
}