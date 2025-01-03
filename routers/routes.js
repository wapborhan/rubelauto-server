const leadRouter = require("./lead");
const supplierRouter = require("./supplier");
const productRouter = require("./product");
const stockRouter = require("./stock");
const userRouter = require("./user");
const installmentRouter = require("./installment");
const customerRouter = require("./customer");
const documentRouter = require("./document");
const showroomRouter = require("./showroom");
const accountRouter = require("./account");
const incomeRouter = require("./income");
const costRouter = require("./cost");

const routers = [
  {
    path: "/api/lead",
    handler: leadRouter,
  },
  {
    path: "/api/supplier",
    handler: supplierRouter,
  },
  {
    path: "/api/product",
    handler: productRouter,
  },
  {
    path: "/api/stock",
    handler: stockRouter,
  },
  {
    path: "/api/customer",
    handler: customerRouter,
  },
  {
    path: "/api/installment",
    handler: installmentRouter,
  },
  {
    path: "/api/showroom",
    handler: showroomRouter,
  },
  {
    path: "/api/account",
    handler: accountRouter,
  },
  {
    path: "/api/income",
    handler: incomeRouter,
  },
  {
    path: "/api/cost",
    handler: costRouter,
  },
  {
    path: "/api/document",
    handler: documentRouter,
  },
  {
    path: "/api/user",
    handler: userRouter,
  },

  // {
  //     path : '/',
  //     handler : (req,res) =>{
  //         res.send('Server is ready!');
  //     }
  // }
];

const applyRouter = (app) => {
  routers.map((r) => {
    if (r.path === "/") {
      app.get(r.path, r.handler);
    } else {
      app.use(r.path, r.handler);
    }
  });
};

module.exports = applyRouter;
