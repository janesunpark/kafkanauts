import React from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faHandHoldingUsd, faTimes, faCalendarAlt, faMapPin, faInbox, faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/kafkanauts_175x175.png'


//creates a Sidebar component that has a React.memo function that skips rendering if its props have not changed 
//React.memo accepts an empty obj as props 
const Sidebar = React.memo((props = {}) => {

  const location = useLocation();
  const { pathname } = location;

  //function NavItem accepts arg in props and returns a rendering component 
  const NavItem = (props) => {

    //props is defined as an object with the following variables and values 
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary", main } = props;
    //sets classNames as the badgeText which is either the string defined belwo or an empty string 
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    //checks navItemClassName if the value of link is strictly equal to the pathname, if it is, set navItemClassName as "active" or set its value as an empty string
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName}>
        <Nav.Link {...linkProps} target={target} className={classNames}>

          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}
            {main ? <span className="sidebar-text" style={{fontSize: 18}}>{title}</span> : <span className="sidebar-text">{title}</span>}
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>

      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none" title={''}>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} classNames="sidebar-transition">
        <SimpleBar className={`collapse sidebar d-sm-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none">
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Kafkanauts" image={logo} link='/dashboard/overview' main/>
              <Dropdown.Divider className="my-3 border-white" />
              <NavItem title="Overview" icon={faChartPie} link='/dashboard/overview'/>
              <NavItem title="Partition" icon={faHeartPulse} link='/dashboard/partition' />
              <NavItem title="Consumer" icon={faInbox} link='/dashboard/consumer' />
              <NavItem title="Producer" icon={faHandHoldingUsd} link='/dashboard/producer' />
              <NavItem title="Topics" icon={faCog} link='/dashboard/topic' />
              <NavItem title="Zookeeper" icon={faCalendarAlt} link='/dashboard/zookeeper' />
              <NavItem title="Create Cluster"icon={faMapPin} link='/dashboard/cluster' />
              <Dropdown.Divider className="my-3 border-white" />
              <NavItem title="Documentation"icon={faMapPin} link='/dashboard/docs' />

            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
});

export default Sidebar;