export const menuData = [
  {
    label: "ড্যাশবোর্ড",
    icon: "pi-chart-bar",
    path: "/dashboard",
  },
  {
    label: "কন্টাক্ট",
    icon: "pi-users",
    subMenu: [
      {
        label: "লিড যোগ করুন",
        path: "/contact/lead/add",
      },
      {
        label: "সাপ্লায়ার যোগ করুন",
        path: "/contact/supplier/add",
      },
      {
        label: "লিড দেখুন",
        path: "/contact/lead/view",
      },
      {
        label: "সাপ্লায়ার দেখুন",
        path: "/contact/supplier/view",
      },
    ],
  },

  {
    label: "প্রোডাক্টস",
    icon: "pi-box",
    subMenu: [
      {
        label: "প্রোডাক্ট যোগ করুন",
        path: "/products/add",
      },
      {
        label: "প্রোডাক্ট দেখুন",
        path: "/products/view",
      },
    ],
  },
  {
    label: "ক্রয়",
    icon: "pi-arrow-circle-up",
    subMenu: [
      {
        label: "ক্রয় করুন",
        path: "/purchase/add",
      },
      {
        label: "সকল ক্রয় দেখুন",
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
    label: "কাস্টমার",
    icon: "pi-user",
    subMenu: [
      {
        label: "Running",
        path: "/customer/running",
      },

      {
        label: "Seized",
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
    label: "পার্টস",
    icon: "pi-wrench",
    subMenu: [
      {
        label: "পার্টস সাপ্লালায়ার",
        path: "/contact/supplier/parts/view",
      },
      {
        label: "পার্টস কাস্টমার",
        path: "/parts/customer",
      },
      {
        label: "পার্টস কেনা",
        path: "/purchase/parts/add",
      },
      {
        label: "কেনা পার্টসের তালিকা",
        path: "/purchase/parts/view",
      },
    ],
  },
  {
    label: "Acounts",
    icon: "pi-user",
    subMenu: [
      {
        label: "Add Income",
        path: "/account/income/add",
      },
      {
        label: "Add Cost",
        path: "/account/cost/add",
      },
      {
        label: "View Income",
        path: "/account/income/view",
      },

      {
        label: "View Cost",
        path: "/account/cost/view",
      },
      {
        label: "Accounts List",
        path: "/account/list",
      },
      {
        label: "Showroom List",
        path: "/showroom/list",
      },
      {
        label: "Transfer",
        path: "/account/transfer",
      },
    ],
  },
  // {
  //   label: "Showroom",
  //   icon: "pi-database",
  //   subMenu: [
  //     {
  //       label: "Add Showroom",
  //       path: "/showroom/add",
  //     },
  //   ],
  // },
  {
    label: "কর্মচারিবৃন্দ",
    icon: "pi-user-plus",
    path: "/staff/view",
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
