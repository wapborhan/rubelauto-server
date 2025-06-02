import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/feature/user/userSlice";

const Header = (props) => {
  const menuRight = useRef(null);
  const { name, photo, showRoom } = useSelector((state) => state.userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  const itemRenderer = (item) => (
    <div className="p-menuitem-content">
      <a
        className="flex align-items-center p-menuitem-link"
        onClick={item.command}
      >
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
        {item.shortcut && (
          <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
            {item.shortcut}
          </span>
        )}
      </a>
    </div>
  );
  let items = [
    {
      template: () => {
        return (
          <Link
            to="/profile/view"
            className="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
          >
            <Avatar
              image={
                photo
                  ? photo
                  : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              }
              className="mr-2"
              shape="circle"
            />
            <div className="flex flex-col align">
              <span className="font-bold">{name}</span>
              <span className="text-sm">{showRoom}</span>
            </div>
          </Link>
        );
      },
    },
    {
      separator: true,
    },

    {
      label: "Menus",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          // shortcut: "⌘+O",
          command: () => {
            navigate("/profile/edit");
          },
        },
        // {
        //   label: "Messages",
        //   icon: "pi pi-inbox",
        //   badge: 2,
        //   template: itemRenderer,
        // },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          // shortcut: "⌘+Q",
          command: () => {
            handleSignOut();
          },
          template: itemRenderer,
        },
      ],
    },
  ];
  const { setCollapsed, collapsed, broken, setToggled, toggled } = props;

  return (
    <>
      <nav
        id="topbar"
        className="topbar navbar-expand navbar-light bg-white  mb-4 static-top shadow flex justify-between px-4 py-2 items-center"
      >
        {broken ? (
          <>
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              <i className="pi pi-align-left"></i>
            </button>
          </>
        ) : (
          <div
            className="sidebars-button text-dark cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <i className="pi pi-align-left"></i>
            ) : (
              <i className="pi pi-bars"></i>
            )}
          </div>
        )}

        <h2 id="nameTitle" className="text-center text-dark font-bold">
          Rubel Auto
        </h2>
        <div className="account btn-circle w-12 flex justify-center items-center h-12 ">
          <Button
            // icon="pi pi-user"
            className="ml-1 !p-0"
            onClick={(event) => menuRight.current.toggle(event)}
            aria-controls="popup_menu_right"
            aria-haspopup
          >
            <img src={photo} alt="P" />
          </Button>

          <Menu
            model={items}
            popup
            ref={menuRight}
            id="popup_menu_right"
            className="mt-5"
            popupAlignment="right"
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
