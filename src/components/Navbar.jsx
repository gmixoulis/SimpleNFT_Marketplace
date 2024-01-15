import React from "react";
import { Navbar, Dropdown } from "flowbite-react";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import refreshPage from "../hooks/refreshPage";
import { watchAccount } from "@wagmi/core";
import Dev from "../dev";
export default function Header() {
  const { address } = useAccount({
    onConnect() {
      //refreshPageNFT();
      if (localStorage.getItem("reloadCount")) window.location.reload(false);
      window.localStorage.removeItem("reloadCount");
    },
    onDisconnect() {
      refreshPage();
    },
  });
  window.localStorage.setItem("connectedAddress", address);

  watchAccount((account) => {
    if (window.localStorage.getItem("connectedAddress") != account.address)
      refreshPage();
  });
  return (
    <header>
      <Navbar
        style={{ zIndex: "100", backgroundColor: "black" }}
        className="fixed top-0 left-0 w-full py-5 bg-black md:px-4 z-100 sm:px-2 opacity-90"
        fluid={true}
      >
        <div
          id="navb"
          className="flex bg:-black sm:m-0 sm:p-0  xl:ml-[14rem] 2xl:pl-[0em] 3xl:pl-[14%] md:justify-between md:mx-auto"
        >
          <Navbar.Brand id="logo" href="/">
            <img
              src={require("../assets/img_1612256140910.png")}
              tw_css={" sm:max-w-40 sm:w-50 sm:h-12"}
              alt="Unic Logo"
            />
          </Navbar.Brand>
        </div>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            className="block py-3 bg-white rounded md:pl-5 md:text-white md:bg-transparent sm:text-black hover:text-textgray md:p-0"
          >
            Home
          </Navbar.Link>

          {address ? (
            <div className="block py-2.5">
              <Dropdown
                size="xs"
                id="modal"
                className="font-thin rounde-sm "
                style={{
                  color: "white",
                  background: "transparent",
                  borderColor: "white",
                  maxWidth: "250px",
                  maxHeight: "100px",
                  margin: "0 auto",
                }}
                label="Profile"
              >
                <Link to="/mycourses">
                  <Dropdown.Item href="/mycourses">My Courses</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link to="/myprofile">
                  <Dropdown.Item href="/myprofile">My Wallet</Dropdown.Item>
                </Link>
              </Dropdown>
            </div>
          ) : (
            <div></div>
          )}

          <div id="web3modal" className="mt-2 md:pr-4 ">
            <Web3Button />
          </div>
          <Dev/>

        </Navbar.Collapse>
      </Navbar>
      <div className="pt-16" />
   
    </header>
  );
}