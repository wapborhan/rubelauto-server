import React from "react";

const Card = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="surface-0 bg-white  shadow-md p-3 border border-gray-50 rounded">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-3">
                Orders
              </span>
              <div className="text-gray-900 font-medium text-xl">152</div>
            </div>
            <div className="flex items-center justify-center bg-blue-100 rounded-full w-10 h-10">
              <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-gray-500">since last visit</span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="surface-0 bg-white shadow-md p-3 border border-gray-50 rounded">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-3">
                Revenue
              </span>
              <div className="text-gray-900 font-medium text-xl">$2.100</div>
            </div>
            <div className="flex items-center justify-center bg-orange-100 rounded-full w-10 h-10">
              <i className="pi pi-map-marker text-orange-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">%52+ </span>
          <span className="text-gray-500">since last week</span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="surface-0 bg-white shadow-md p-3 border border-gray-50 rounded">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-3">
                Customers
              </span>
              <div className="text-gray-900 font-medium text-xl">28441</div>
            </div>
            <div className="flex items-center justify-center bg-cyan-100 rounded-full w-10 h-10">
              <i className="pi pi-inbox text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">520 </span>
          <span className="text-gray-500">newly registered</span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="surface-0 bg-white shadow-md p-3 border border-gray-50 rounded">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-3">
                Comments
              </span>
              <div className="text-gray-900 font-medium text-xl">
                152 Unread
              </div>
            </div>
            <div className="flex items-center justify-center bg-purple-100 rounded-full w-10 h-10">
              <i className="pi pi-comment text-purple-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">85 </span>
          <span className="text-gray-500">responded</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
