import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuData } from "./menuData";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import Logo from "../assets/images/logo/logo-squire.png";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#000",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#000",
      hover: {
        backgroundColor: "#ca5d5d",
        color: "#fff",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MySidebar = (props) => {
  const { collapsed, setBroken, setToggled, toggled } = props;
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const [theme, setTheme] = useState("light");
  const [hasImage, setHasImage] = useState(false);
  const menuClasses = {
    root: "ps-menu-root",
    menuItemRoot: "ps-menuitem-root",
    subMenuRoot: "ps-submenu-root",
    button: "ps-menu-button",
    prefix: "ps-menu-prefix",
    suffix: "ps-menu-suffix",
    label: "ps-menu-label",
    icon: "ps-menu-icon",
    subMenuContent: "ps-submenu-content",
    SubMenuExpandIcon: "ps-submenu-expand-icon",
    disabled: "ps-disabled",
    active: "ps-active",
    open: "ps-open",
  };
  const menuItemStyles = {
    root: {
      fontSize: "16px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#000",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0
        ? hexToRgba(
          themes[theme].menu.menuContent,
          hasImage && !collapsed ? 0.4 : 1,
        )
        : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1,
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div className="main-sedebar" style={{ display: "flex", height: "100%" }}>
      <Sidebar
        collapsed={collapsed}
        className="h-[100vh]"
        breakPoint="sm"
        toggled={toggled}
        onBackdropClick={() =>
          setToggled(false)}
        onBreakPoint={setBroken}
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1,
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div
          className={collapsed
            ? "w-full p-2 mx-auto text-center space-y-4 border-b-2"
            : "w-full p-5 mx-auto text-center space-y-4 border-b-2"}
        >
          <div className={collapsed ? "w-13" : "w-28 mx-auto rounded-full"}>
            <img src={Logo} />
          </div>
        </div>
        <Menu
          menuItemStyles={menuItemStyles}
          className="sticky top-0 h-[80%] overflow-scroll"
        >
          {menuData.map((item, index) => {
            if (item.subMenu) {
              return (
                <SubMenu
                  key={index}
                  label={item.label}
                  icon={<i className={`pi ` + item.icon} />}
                  defaultOpen={index === openSubMenu}
                  onToggle={() => handleSubMenuClick(index)}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      component={<NavLink to={subItem.path} />}
                      icon={<i className="pi pi-circle"></i>}
                      className="overflow-hidden"
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <MenuItem
                  key={index}
                  component={<NavLink to={item.path} />}
                  icon={<i className={`pi ` + item.icon} />}
                >
                  {item.label}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MySidebar;
