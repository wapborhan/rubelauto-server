import { BreadCrumb } from "primereact/breadcrumb";
import { Link, NavLink } from "react-router-dom";

const BackPage = ({ linkFirst, textFirst, textSecond }) => {
  const items = [
    {
      template: () => <Link to={linkFirst}>{textFirst}</Link>,
    },
    {
      template: () => (
        <span className="text-primary font-semibold">{textSecond}</span>
      ),
    },
  ];
  const home = {
    template: () => (
      <NavLink to="/dashboard" icon="pi pi-home">
        <i className="text-primary font-semibold pi pi-home"></i>
      </NavLink>
    ),
  };

  return (
    <>
      <div className="breadcamps mb-8">
        <BreadCrumb model={items} home={home} />
      </div>
    </>
  );
};

export default BackPage;
