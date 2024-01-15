import React from "react";
import { Transition, Disclosure } from "@headlessui/react";
import classnames from "classnames";
import { FaChevronRight } from "react-icons/fa";
const CourseInstructors = ({ Data }) => {
  return (
    <>
      <div className="w-full py-10 bg-unic">
        <div className="my-5 responsive">
          <h1 className="font-bold text-textgray lg:text-medium text-[2rem] pb-2">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          {Data.faq.map(({ id, question, answer }) => (
            <Disclosure as="div" key={id} className="pb-6 text-left align-left">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex items-center w-full rounded-none bg-gray-50 border-1 border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 hover:duration-200 focus:outline-0 focus:ring-0",
                      { "border-b-0": open }
                    )}
                  >
                    <FaChevronRight
                      className={`${
                        open ? "rotate-90 transform duration-300" : ""
                      } text-textgray`}
                    />

                    <span className="px-2 font-light !text-left text-textgray">
                      {question}
                    </span>
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-100 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 py-2 font-light border border-t-0 border-gray-300 bg-gray-50 text-textgray">
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: answer }}
                      ></div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseInstructors;
