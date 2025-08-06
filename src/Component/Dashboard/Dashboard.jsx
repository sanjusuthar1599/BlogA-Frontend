import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogAPiRequest,
  getBlogbyidAPiRequest,
  getSignupuserAPiRequest,
  deleteBlogRequest,
} from "../../redux/reducers/reducer/blogreducer";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Edit from "../Edit/Edit";
import Swal from "sweetalert2";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"; // ✅ Save icon

const Dashboard = () => {
  // popup open and close Edit product
  const [openedEditProduct, setOpenEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const user = jwtDecode(token);
      userId = user.id;
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
    }
  }

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all blog");

  const { GetBlogAPiDetails, GetBlogbyidAPiDetails, getSignupuserAPiDetails } =
    useSelector(({ blogReducer }) => ({
      GetBlogAPiDetails: blogReducer.GetBlogAPiDetails,
      GetBlogbyidAPiDetails: blogReducer.GetBlogbyidAPiDetails,
      getSignupuserAPiDetails: blogReducer.getSignupuserAPiDetails,
    }));

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    if (filterType === "all blog") {
      dispatch(getBlogAPiRequest());
    } else if (filterType === "my blog") {
      dispatch(getBlogbyidAPiRequest(userId));
    }
  }, [filterType, dispatch, token, userId]);

  useEffect(() => {
    dispatch(getSignupuserAPiRequest());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5c35",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (!confirm.isConfirmed) return;

    await dispatch(deleteBlogRequest(id));

    toast.success("Your Blog is deleted successfully");
    filterType === "my blog"
      ? dispatch(getBlogbyidAPiRequest(userId))
      : dispatch(getBlogAPiRequest());
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const blogsToRender =
    filterType === "all blog" ? GetBlogAPiDetails : GetBlogbyidAPiDetails;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 pt-3 pb-3 rounded-xl shadow">
        <div className="text-3xl font-bold bg-gradient-to-br from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Welcome SKBlog User
        </div>
      </div>

      <div className="w-full mt-5">
        {token && userId && (
          <main className="">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Total Blogs
                </h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {" "}
                  {filterType === "all blog"
                    ? GetBlogAPiDetails.length
                    : GetBlogbyidAPiDetails.length}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {getSignupuserAPiDetails.length || 0}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Comments
                </h3>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  Coming Soon
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
              <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {filterType === "my blog" ? "Explore Your Blog Posts " : "Explore All Blogs – Latest Posts with Guidelines."}
                </h2>

                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none h-10"
                  onChange={(e) => setFilterType(e.target.value)}
                  value={filterType}
                >
                  <option value="all blog" className="optiontype">
                    All Blog
                  </option>
                  <option value="my blog" className="optiontype">
                    My Blog
                  </option>
                </select>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Discover our latest blog posts, featuring a wide range of topics
                and insights.
              </p>

              <div className="w-full overflow-y-auto max-h-[563px] border border-gray-200 dark:border-gray-700 rounded-lg p-4 pt-0 pb-0">
                {blogsToRender.length > 0 ? (
                  blogsToRender
                    .slice()
                    .reverse()
                    .map((items) => (
                      <div
                        key={items._id}
                        className={`flex ${
                          items.image ? "flex-col md:flex-row" : "flex-col"
                        } bg-white dark:bg-gray-900 rounded-xl shadow-md my-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition`}
                      >
                        {/* 📷 If image available, show left side */}
                        {items.image && (
                          <div className="md:w-1/3 w-full h-64 md:h-auto">
                            <img
                              src={`https://res.cloudinary.com/djl6lggob/image/upload/${items.image}`}
                              alt={items.title}
                              className="w-full h-full object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl"
                            />
                          </div>
                        )}

                        {/* ✍️ Content */}
                        <div className="flex flex-col justify-between p-6 w-full">
                          {/* Title + Buttons */}
                          <div className="flex justify-between flex-wrap items-start mb-4 flex justify-between flex-wrap items-start mb-4 max-[1199px]:flex-col-reverse">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex-1">
                              {items.title}
                            </h2>
                            {filterType === "my blog" && (
                              <div className="flex gap-2 mt-2 sm:mt-0 max-[1199px]:ml-auto max-[1199px]:mb-[10px]">
                                <button
                                  onClick={() => {
                                    setSelectedProduct(items);
                                    setOpenEditProduct(true);
                                  }}
                                  className="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 rounded-md px-3 py-1 text-sm font-medium transition"
                                >
                                  <FiEdit
                                    size={16}
                                    className="inline-block mr-1"
                                  />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(items._id)}
                                  className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-md px-3 py-1 text-sm font-medium transition"
                                >
                                  <FiTrash2
                                    size={16}
                                    className="inline-block mr-1"
                                  />
                                  Delete
                                </button>
                              </div>
                            )}
                            {/* {filterType === "all blog" && (
                              <button
                                onClick={() => handleSaveToggle(items._id)}
                                className="text-green-600 hover:text-white border border-green-600 hover:bg-green-600 rounded-md px-3 py-1 text-sm font-medium transition inline-flex items-center gap-1"
                              >
                                {savedPosts.includes(items._id) ? (
                                  <>
                                    <BsBookmarkFill size={16} />
                                    Saved
                                  </>
                                ) : (
                                  <>
                                    <BsBookmark size={16} />
                                    Save
                                  </>
                                )}
                              </button>
                            )} */}
                          </div>

                          {/* Content */}
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
                            {items.content}
                          </p>

                          {/* Footer */}
                          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-3 border-gray-200 dark:border-gray-700">
                            <span>👤 Posted by {items.author?.name}</span>
                            <span>
                              🕒{" "}
                              {new Date(
                                items.createdAt || Date.now()
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                    {filterType === "my blog"
                      ? "No blog found for your account."
                      : "No blog posts found."}
                  </p>
                )}
              </div>
            </div>
          </main>
        )}
        {/* Edit Product Popup */}
        {openedEditProduct && (
          <Edit
            open={openedEditProduct}
            editData={selectedProduct}
            onClose={() => {
              setOpenEditProduct(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;

