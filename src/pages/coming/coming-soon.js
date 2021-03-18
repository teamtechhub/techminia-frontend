import FooterContainer from "containers/Footer/Footer";
import React from "react";
import backimg from "../../images/studentlearn.jpg";
import { useHistory } from "react-router-dom";

const ComingSoon = () => {
  const history = useHistory();
  return (
    <>
      <div className="relative  ml-1  flex flex-col justify-center items-center bg-no-repeat bg-cover  min-h-screen bg-blue-100    w-full ">
        <div>
          <img
            src={backimg}
            className="h-screen  bg-cover w-full text-black "
          />
        </div>
        <div className="bg-black absolute top-0 left-0 opacity-50 h-full w-full"></div>
        <div className=" mt-0 absolute top-0 left-0  h-full w-full flex flex-col justify-center items-center font-bold text-purple-800 text-center">
          <h1 className="italic font-bold "> ***** Darasa *****</h1>
          <h1>Coming Soon!</h1>
          <h4 className="text-yellow-500">
            We are currently working on this feature
          </h4>

          <h3 className="text-yellow-500">and will launch it soon</h3>
          <button
            className="px-5 py-2 mt-2 rounded-2xl outline-none focus:outline-none font-bold text-white bg-purple-600"
            onClick={() => history.push("/")}
          >
            Go Back
          </button>
          <h4 className="mt-10">=========================</h4>
        </div>
      </div>

      <FooterContainer />
    </>
  );
};

export default ComingSoon;
