import React from "react"
import Footer from "./Footer"
import Header from "./Navbar"
import classnames from "classnames"
import { FaChevronDown } from "react-icons/fa"

import { Disclosure, Transition } from "@headlessui/react"

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow min-w-full mx-auto my-10">
        <div className="w-full px-4 pt-16">
          <div className="text-center font-normal text-medium mb-5">
            TERMS AND CONDITIONS
          </div>
          <div className="mx-auto w-full max-w-4xl rounded-2xl bg-unic p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none",
                      { "bg-gray-700": open }
                    )}
                  >
                    <span className="text-unic">Your Privacy</span>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-unic`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-small font-light text-black">
                      When you visit any website, it may store or retrieve
                      information on your browser, mostly in the form of
                      cookies. This information might be about you, your
                      preferences or your device and is mostly used to make the
                      site work as you expect it to. The information does not
                      usually directly identify you, but it can give you a more
                      personalized web experience. Because we respect your right
                      to privacy, you can choose not to allow some types of
                      cookies. Click on the different category headings to find
                      out more and change our default settings. However,
                      blocking some types of cookies may impact your experience
                      of the site and the services we are able to offer.
                      <div className="text-center">
                        <a
                          href="https://www.unic.ac.cy/coronavirus/"
                          className="hover:text-gray-500"
                        >
                          View Cookie Policy
                        </a>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none",
                      { "bg-gray-700": open }
                    )}
                  >
                    <span className="text-unic">
                      Strictly Necessary Cookies
                    </span>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-unic`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-small font-light text-black">
                      These cookies are necessary for the website to function
                      and cannot be switched off in our systems. They are
                      usually only set in response to actions made by you which
                      amount to a request for services, such as setting your
                      privacy preferences, logging in or filling in forms. You
                      can set your browser to block or alert you about these
                      cookies, but some parts of the site will not then work.
                      These cookies do not store any personally identifiable
                      information.
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none",
                      { "bg-gray-700": open }
                    )}
                  >
                    <span className="text-unic">Performance Cookies</span>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-unic`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-small font-light text-black">
                      These cookies allow us to count visits and traffic sources
                      so we can measure and improve the performance of our site.
                      They help us to know which pages are the most and least
                      popular and see how visitors move around the site. All
                      information these cookies collect is aggregated and
                      therefore anonymous. If you do not allow these cookies we
                      will not know when you have visited our site, and will not
                      be able to monitor its performance.
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none",
                      { "bg-gray-700": open }
                    )}
                  >
                    {/* <Disclosure.Button
                    className={`${
                      open ? "bg-gray-700" : ""
                    } flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none`}
                  > */}{" "}
                    <span className="text-unic">Marketing Cookies</span>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-unic`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-small font-light text-black">
                      These cookies may be set through our site by our
                      advertising partners. They may be used by those companies
                      to build a profile of your interests and show you relevant
                      adverts on other sites. They do not store directly
                      personal information, but are based on uniquely
                      identifying your browser and internet device. If you do
                      not allow these cookies, you will experience less targeted
                      advertising.
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classnames(
                      "flex w-full justify-between rounded-lg bg-gray-500 border-0 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-700 hover:duration-200 focus:outline-none",
                      { "bg-gray-700": open }
                    )}
                  >
                    {" "}
                    <span className="text-unic">Functional Cookies</span>
                    <FaChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-unic`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-small font-light text-black">
                      These cookies enable the website to provide enhanced
                      functionality and personalisation. They may be set by us
                      or by third party providers whose services we have added
                      to our pages. If you do not allow these cookies then some
                      or all of these services may not function properly.
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
