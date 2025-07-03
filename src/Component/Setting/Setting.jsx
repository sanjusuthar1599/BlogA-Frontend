import { FiMail, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducers/reducer/blogreducer";

const Setting = () => {
  const getUser = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  // 👇 Dark Mode Logic
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.blogReducer.theme);

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };


  return (
    <>
      {/* Heading Section */}
      <div className="bg-white dark:bg-slate-900 p-6 pt-4 pb-4 rounded-xl shadow">
        <h1 className="text-3xl font-bold bg-gradient-to-br from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Setting
        </h1>
      </div>

      {/* User Info Section */}
      <div className="bg-white dark:bg-gray-900 p-6 mt-10 rounded-xl shadow flex items-center gap-6">
        <div className="flex items-center justify-center size-16 rounded-full bg-orange-500 text-white text-4xl font-bold uppercase shadow-md">
          {getUser.name?.[0] || "S"}
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700 dark:text-gray-200 font-semibold">
            <FiUser className="text-orange-500" /> {getUser.name}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700 dark:text-gray-300 font-semibold">
            <FiMail className="text-orange-500" /> {getUser.email}
          </div>
        </div>
      </div>

      {/* 🌙 Theme Toggle Section */}
      <div className=" flex bg-white dark:bg-gray-900 p-6 mt-10 rounded-xl shadow space-x-5">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-0 ">Theme : </h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
               onChange={handleThemeChange}
            />
            Light Mode
          </label>

          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
               onChange={handleThemeChange}
            />
            Dark Mode
          </label>
        </div>
      </div>
    </>
  );
};

export default Setting;
