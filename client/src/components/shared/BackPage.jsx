import { BreadCrumb } from "primereact/breadcrumb";
import { Link, NavLink } from "react-router-dom";

const BackPage = () => {
  const items = [
    {
      template: () => <Link to="/lead/view">Lead</Link>,
    },
    {
      template: () => (
        <span className="text-primary font-semibold">Lead Details</span>
      ),
    },
  ];
  const home = {
    template: () => (
      <NavLink to="/" icon="pi pi-home">
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
