import { createBrowserRouter } from "react-router-dom";
import * as All from "../pages";
import Redirect from "../pages/Redirect";
import Root from "../layout/Root";
import SignIn from "../layout/signin/SignIn";
import SignUp from "../layout/signup/SignUp";
import PrivateRoute from "../provider/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Redirect />,
    errorElement: "Error",
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    errorElement: "Error",
    children: [
      {
        path: "/dashboard",
        element: <All.Dashboard />,
      },
      // Contact
      {
        path: "/contact",
        children: [
          {
            path: "lead/add",
            element: <All.AddLead />,
          },
          {
            path: "lead/add/guarantor/:id",
            element: <All.AddGuarantor />,
          },
          {
            path: "lead/edit/guarantor/:id",
            element: <All.EditGuarantor />,
          },
          {
            path: "lead/view",
            element: <All.ViewLead />,
          },
          {
            path: "lead/view/:id",
            element: <All.LeadDetails />,
          },
          {
            path: "lead/edit/:id",
            element: <All.EditLead />,
          },
          {
            path: "supplier/add",
            element: <All.AddSuplier />,
          },
          {
            path: "supplier/view",
            element: <All.ViewSuplier />,
          },

          {
            path: "supplier/view/:id",
            element: <All.SuplierDetails />,
          },
          {
            path: "supplier/edit/:id",
            element: <All.UpdateSuplier />,
          },
        ],
      },
      // Product
      {
        path: "/products/",
        children: [
          {
            path: "add",
            element: <All.AddProduct />,
          },
          {
            path: "view",
            element: <All.ViewProduct />,
          },
          {
            path: "edit/:id",
            element: <All.EditProduct />,
          },
        ],
      },
      // Purchase
      {
        path: "/purchase/",
        children: [
          {
            path: "add",
            element: <All.AddPurchase />,
          },
          {
            path: "view",
            element: <All.ViewPurchase />,
          },
        ],
      },
      // Sale
      {
        path: "/sale",
        children: [
          {
            path: ":status",
            element: <All.AddSale />,
          },
          {
            path: "return",
            element: "Coming...",
          },
        ],
      },
      // Customer
      {
        path: "/customer",
        children: [
          {
            path: ":status",
            element: <All.Customer />,
          },

          {
            path: "view/:cardNo",
            element: <All.CustomerDetails />,
          },
          {
            path: "payment/:cardNo",
            element: <All.Payment />,
          },
          {
            path: "seized/:cardNo",
            element: <All.Seized />,
          },
          {
            path: "paid/:cardNo",
            element: <All.Paid />,
          },
          {
            path: "due/:cardno",
            element: "Coming Soon",
          },
        ],
      },
      // Documents
      {
        path: "/documents",
        children: [
          {
            path: "",
            element: <All.Documents />,
          },
        ],
      },
      {
        path: "/showroom",
        children: [
          {
            path: "add",
            element: <All.AddShowroom />,
          },
          {
            path: "view",
            element: <All.ViewShowroom />,
          },
        ],
      },
      // account
       {
        path: "/account",
        children: [
          {
            path: "income",
            element: <All.AddShowroom />,
          },
          {
            path: "cost",
            element: <All.ViewShowroom />,
          },{
            path: "list",
            element: <All.AccountLists />,
          },
        ],
      },
      // Staff
      {
        path: "/staff",
        errorElement: "404",
        children: [
          {
            path: "add",
            element: "Under Constraction",
          },
          {
            path: "view",
            element: <All.ViewStaff />,
          },
        ],
      },
      // Profile
      {
        path: "/profile",
        errorElement: "404",
        // element: <StaffDetails />,
        children: [
          {
            path: "view",
            element: <All.Profile />,
          },
          {
            path: "edit",
            element: <All.Settings />,
          },
          {
            path: "details",
            element: <All.StaffDetails />,
          },
        ],
      },
    ],
  },
]);

export default routes;
