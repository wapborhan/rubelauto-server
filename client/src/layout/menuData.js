export const menuData = [
  {
    label: "Dashboard",
    icon: "pi-chart-bar",
    path: "/dashboard",
  },
  {
    label: "Contact",
    icon: "pi-users",
    subMenu: [
      {
        label: "Add Lead",
        path: "/contact/lead/add",
      },
      {
        label: "Add Suppliers",
        path: "/contact/supplier/add",
      },
      {
        label: "View Lead",
        path: "/contact/lead/view",
      },
      {
        label: "View Suppliers",
        path: "/contact/supplier/view",
      },
    ],
  },

  {
    label: "Products",
    icon: "pi-box",
    subMenu: [
      {
        label: "Add Product",
        path: "/products/add",
      },
      {
        label: "View Products",
        path: "/products/view",
      },
    ],
  },
  {
    label: "Purchase",
    icon: "pi-arrow-circle-up",
    subMenu: [
      {
        label: "Add Purchase",
        path: "/purchase/add",
      },
      {
        label: "View Purchase",
        path: "/purchase/view",
      },
    ],
  },
  {
    label: "Sale",
    icon: "pi-arrow-circle-down",
    subMenu: [
      {
        label: "Credit Sale",
        path: "/sale/credit",
      },
      {
        label: "Cash Sale",
        path: "/sale/cash",
      },
      {
        label: "Return Sale",
        path: "/sale/return",
      },
    ],
  },
  {
    label: "Customers",
    icon: "pi-user",
    subMenu: [
      {
        label: "Running Customers",
        path: "/customer/running",
      },

      {
        label: "Seized Customer",
        path: "/customer/seized",
      },
    ],
  },
  {
    label: "Documents",
    icon: "pi-chart-bar",
    path: "/documents",
  },
  {
    label: "Staff",
    icon: "pi-user-plus",
    subMenu: [
      {
        label: "Add Staff",
        path: "/staff/add",
      },
      {
        label: "View Staff",
        path: "/staff/view",
      },
    ],
  },
  {
    label: "Report",
    icon: "pi-database",
    subMenu: [
      {
        label: "Customer Due",
        path: "/customer/due/cardno",
      },
    ],
  },
];