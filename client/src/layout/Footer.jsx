const Footer = () => {
  return (
    <div className="foot py-3 text-white fixed right-0 lg:left-[250px] bottom-0  bg-[#198754]">
      <div className="mx-auto w-full px-10">
        <div className="flex justify-between">
          <div className="col-lg-6 col-md-12">
            <div className="copyright-info">
              <span>
                Copyright © 2009 - {new Date().getFullYear()} Rubel Auto. All
                Rights Reserved.
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="footer-menu text-right">
              Developed By{" "}
              <a
                href="https://www.srdreamlab.com"
                target="__BLANK"
                className="text-white"
              >
                SR Dream Lab
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
