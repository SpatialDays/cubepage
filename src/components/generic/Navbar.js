import { Link, useLocation } from "react-router-dom";
import { checkToken, deleteToken } from "../../utils/token";
import Logo from "../../assets/images/logo-small.svg";

import "../../assets/styles/navbar.css";

const Navbar = ({ setTasks }) => {
  const location = useLocation();

  const checkActiveTab = (tab) => {
    const splitPath = location.pathname.split("/");
    const path = splitPath[splitPath.length - 1];
    if (path === tab) return true;
  };

  return (
    <>
      <header id="header">
        <div className="wrapper">
          <div className="logo">
            <a href="https://www.commonsensing.org.uk/">
              <img src={Logo} alt="The Site Logo" id="logo-all" />
            </a>
          </div>
          <div id="menu">
            <nav
              role="navigation"
              aria-labelledby="block-mainnavigation-menu"
              id="block-mainnavigation"
            >
              <ul>
                <li className=" level-0 ">
                  <a href="https://www.commonsensing.org.uk/">Home</a>
                </li>
                <li className=" level-0  ">
                  <a href="https://www.commonsensing.org.uk/about-us">
                    About Us
                  </a>
                </li>
                <li className=" level-0 ">
                  <a href="https://www.commonsensing.org.uk/whos-involved">
                    Who's Involved?
                  </a>
                </li>
                <li className=" level-0 ">
                  <a href="https://www.commonsensing.org.uk/event">Events</a>
                </li>
                <li className=" level-0 ">
                  <a href="https://www.commonsensing.org.uk/news">News</a>
                </li>
                <li className=" level-0 active parent ">
                  <a href="/tasks">Resources</a>
                  <ul>
                    {checkToken() ? (
                      <>
                        <li
                          className={`level-1 ${
                            checkActiveTab("logout") ? "active" : ""
                          }`}
                        >
                          <Link
                            onClick={() => {
                              setTasks(null);
                              deleteToken(setTasks);
                            }}
                            to="/logout"
                          >
                            LOGOUT
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className={`level-1 ${
                            checkActiveTab("login") ? "active" : ""
                          }`}
                        >
                          <Link to="/login">LOGIN</Link>
                        </li>
                      </>
                    )}

                    <li
                      className={`level-1 ${
                        checkActiveTab("queue") ? "active" : ""
                      }`}
                    >
                      <Link to="/queue">QUEUE</Link>
                    </li>

                    <li
                      className={`level-1 ${
                        checkActiveTab("tasks") ? "active" : ""
                      }`}
                    >
                      <Link to="/tasks">TASKS</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
