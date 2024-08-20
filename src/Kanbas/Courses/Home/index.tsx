import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="row">

      <div className="col-lg-9">
        <Modules />
      </div>
      <div className="col-lg-3 d-none d-lg-block" >
        <CourseStatus />
      </div>
    </div>
  );
}