import { apiRequest } from "./apiHelper";

//sign up post api
export const postsignup = async (userData) => {
  return await apiRequest(`api/auth/register`, "POST", userData);
};

//getuser get sign up users
export const getsignupuser = async () => {
  return await apiRequest(`api/auth/getuser`, "GET");
};

// login post api
export const postsignin = async (userData) => {
  const response = await apiRequest(`api/auth/login`, "POST", userData);
  return response;
};

// contact posts api
export const postcontact = async (contactData) => {
  return await apiRequest(`api/contact/create-contact`, "POST", contactData);
};

// add post api
export const postaddblog = async (postData) => {
  return await apiRequest(`api/posts`, "POST", postData);
};

// get all posts api
export const getallposts = async () => {
  return await apiRequest(`api/posts`, "GET");
};

// get blogbyid
export const getblogbyid = async (id) => {
  return await apiRequest(`api/posts/${id}`, "GET");
};

//update blog
export const updateblog = async (id, data) => {
  return await apiRequest(`api/posts/${id}`, "PUT", data);
};


//delete blog
export const deleteblog = async (id) => {
  return await apiRequest(`api/posts/${id}`, "DELETE");
};

// email verifyEmail
export const postverifyotp = async (userData) => {
  return await apiRequest(`api/auth/verify-email`, "POST", userData);
};
