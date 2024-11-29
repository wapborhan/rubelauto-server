import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { useGetStaffQuery } from "../../redux/feature/api/staffApi";

const Settings = () => {
  const toast = useRef(null);
  const { name, email, photo } = useSelector((state) => state.userStore);
  const { data: users } = useGetStaffQuery();

  return (
    <div className="addlead">
      <Toast
        ref={toast}
        pt={{
          message: ({ index }) => ({
            className: `bg-yellow-${((index > 5 && 5) || index || 1) * 100}`,
          }),
        }}
      />
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <fieldset className="mb-4">
          <legend>Update Profile</legend>
          <div className="flex justify-center items-center w-full">
            <div className="font-sans leading-tight bg-grey-lighter p-8 w-full">
              <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <div
                  className="bg-cover h-40"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a634781c01d2dd529412c2d1e2224ec0&auto=format&fit=crop&w=2098&q=80")`,
                  }}
                ></div>
                <div className="border-b px-4 pb-6">
                  <div className="text-center sm:text-left sm:flex mb-4">
                    <img
                      className="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4"
                      src={photo}
                      alt={name}
                    />
                    <div className="py-2">
                      <h3 className="font-bold text-2xl mb-1">{name}</h3>
                      <div className="inline-flex text-grey-dark sm:flex items-center">
                        <svg
                          className="h-5 w-5 text-grey mr-1"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path
                            className="heroicon-ui"
                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                          />
                        </svg>
                        {email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center text-grey-darker mb-4">
                    <svg
                      className="h-6 w-6 text-grey mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                      />
                    </svg>
                    <span>
                      <strong className="text-black">
                        {users?.data ? users?.data.length : "-"}
                      </strong>{" "}
                      Users
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="flex flex-row-reverse justify-end mr-2">
                        {users?.data
                          ? users?.data.slice(0, 8).map((user) => {
                              return (
                                <img
                                  key={user?.email}
                                  className="border-2 border-white rounded-full h-10 w-10 -mr-2"
                                  src={user?.photo}
                                  alt=""
                                />
                              );
                            })
                          : "-"}
                      </div>{" "}
                      {users?.data.length >= 8 ? (
                        <span className="flex items-center justify-center text-sm text-grey-darker font-semibold border-2 border-grey-light rounded-full h-10 w-10">
                          +{users?.data.length - 8}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="message">
                      <a
                        href={`https://api.whatsapp.com/send?phone=+8801907093959&text=Hello Admin, i am ${name}, staff on Rubel Auto, Please Active my Account`}
                        className="blantershow-chat flex gap-2 border-2 rounded-full py-2 px-5 cursor-pointer hover:bg-green-600 hover:text-white  transition-all"
                        title="Show Chat"
                      >
                        <svg width="20" viewBox="0 0 24 24">
                          <defs />
                          <path
                            fill="#eceff1"
                            d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z"
                          />
                          <path
                            fill="#4caf50"
                            d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z"
                          />
                          <path
                            fill="#fafafa"
                            d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"
                          />
                        </svg>
                        একাউন্ট একটিভ করতে এডমিন কে মেসেজ করুন।
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Settings;
