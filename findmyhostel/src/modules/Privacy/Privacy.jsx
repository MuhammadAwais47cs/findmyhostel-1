import React from "react";
import { contentData } from "./data";
function Privacy() {
  return (
    <>
      <section className="bg-light ">
        <div className="pt-5 mt-5"></div>
        <div className="flex flex-col justify-center py-2  container mx-5 ">
          {contentData.map(({ id, heading, para }) => (
            <>
              <div className=" md:pr-3" key={id}>
                <h2 className="text-2xl font-medium py-3">{heading}</h2>
                <p className="text-gray-600 md:pr-5 mr-5">{para} </p>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default Privacy;
