import { createSlice } from "@reduxjs/toolkit";

// Initial State
export const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null,
  //signup 
  postSignupAPiDetails: {},
  postSignupAPiSuccessData: false,
  postSignupAPiLoadingState: false,
    //get signup user 
  getSignupuserAPiDetails: {},
  getSignupuserAPiSuccessData: false,
  getSignupuserAPiLoadingState: false,
  // login
  postLoginAPiDetails: [],
  postLoginAPiSuccessData: false,
  postLoginAPiLoadingState: false,
  // contact
  postContactAPiDetails: {},
  postContactAPiSuccessData: false,
  postContactAPiLoadingState: false,
  // Add Post
  postAddBlogAPiDetails: {},
  postAddBlogAPiSuccessData: false,
  postAddBlogAPiLoadingState: false,
  // Get all blog
  GetBlogAPiDetails: [],
  getAllBlogAPiSuccessData: false,
  getAllBlogAPiLoadingState: false,

    // Get blog by id 
  GetBlogbyidAPiDetails: [],
  getAllBlogbyidAPiSuccessData: false,
  getAllBlogbyidAPiLoadingState: false,

      // update blog by id 
  updatebyidAPiDetails: [],
  updateBlogbyidAPiSuccessData: false,
  updateBlogbyidAPiLoadingState: false,

     // delete blog by id 
  deleteBlogResponseiDetails: [],
  deleteBlogSuccessData: false,
  deleteBlogLoadingState: false,
  
   // dark theme
  theme: localStorage.getItem("theme") || "light"
};

const BlogSlice = createSlice({
  name: "blogReducer",
  initialState: INITIAL_STATE,
  reducers: {
  // dark theme
    setTheme(state, { payload }) {
      state.theme = payload;
      localStorage.setItem("theme", payload); 
    },

    //sign up reducer
    postSignupAPiResponse(state, { payload }) {
      return {
        ...state,
        postSignupAPiDetails: payload?.response,
      };
    },
    postSignupAPiRequest: (state) => state,

    postSignupAPiSuccess(state, { payload }) {
      return {
        ...state,
        postSignupAPiSuccessData: payload,
      };
    },
    postSignupAPiLoading(state, { payload }) {
      return {
        ...state,
        postSignupAPiLoadingState: payload,
      };
    },

     //get all user for sign up reducer
    getSignupuserAPiResponse(state, { payload }) {
      return {
        ...state,
        getSignupuserAPiDetails: payload?.response,
      };
    },
    getSignupuserAPiRequest: (state) =>
       state,

    getSignupuserAPiSuccess(state, { payload }) {
      return {
        ...state,
        getSignupuserAPiSuccessData: payload,
      };
    },
    getSignupuserAPiLoading(state, { payload }) {
      return {
        ...state,
        getSignupuserAPiLoadingState: payload,
      };
    },


   //login in reducer
    postLoginAPiResponse(state, { payload }) {
      return {
        ...state,
        postLoginAPiDetails: payload?.response
      };  
    },
   
    postLoginAPiRequest: (state) => 
      state,
    postLoginAPiSuccess(state, { payload }) {
      return {
        ...state,
        postLoginAPiSuccessData: payload,
      };
    },
    postLoginAPiLoading(state, { payload }) {
      return {
        ...state,
        postLoginAPiLoadingState: payload,
      };
    },


    // contact in reducer
    postContactAPiResponse(state, { payload }) {
      return {
        ...state,
        postContactAPiDetails: payload?.response?.user,
      };
    },
    postContactAPiRequest: (state) => 
      state,
    postContactAPiSuccess(state, { payload }) {
      return {
        ...state,
        postContactAPiSuccessData: payload,
      };
    },
    postContactAPiLoading(state, { payload }) {
      return {
        ...state,
        postContactAPiLoadingState: payload,
      };
    },

    // Add Blog API Response
    postAddBlogAPiResponse(state, { payload }) {
      return {
        ...state,
        postAddBlogAPiDetails: payload?.response,
      };
    },
    postAddBlogAPiRequest: (state) =>
       state,
    postAddBlogAPiSuccess(state, { payload }) {
      return {
        ...state,
        postAddBlogAPiSuccessData: payload,
      };
    },
    postAddBlogAPiLoading(state, { payload }) {
      return {
        ...state,
        postAddBlogAPiLoadingState: payload,
      };
    },

      // get Blog API Response
    getAllBlogAPiResponse(state, { payload }) {
      return {
        ...state,
        GetBlogAPiDetails: payload?.response,
      };
    },
    getBlogAPiRequest: (state) => 
      state,
    getAllBlogAPiSuccess(state, { payload }) {
      return {
        ...state,
        getAllBlogAPiSuccessData: payload,
      };
    },
    getAllBlogAPiLoading(state, { payload }) {
      return {
        ...state,
        getAllBlogAPiLoadingState: payload,
      };
    },


         // get Blog API Response
    getAllBlogbyidAPiResponse(state, { payload }) {
      return {
        ...state,
        GetBlogbyidAPiDetails: payload?.response,
      };
    },
    getBlogbyidAPiRequest: (state) => 
      state,
    getAllBlogbyidAPiSuccess(state, { payload }) {
      return {
        ...state,
        getAllBlogbyidAPiSuccessData: payload,
      };
    },
    getAllBlogbyidAPiLoading(state, { payload }) {
      return {
        ...state,
        getAllBlogbyidAPiLoadingState: payload,
      };
    },

        // Update Blog API Response
    updateBlogbyidAPiResponse(state, { payload }) {
      return {
        ...state,
        updatebyidAPiDetails: payload?.response,
      };
    },
    updatebyidAPiRequest: (state) => 
      state,
    updateBlogbyidAPiSuccess(state, { payload }) {
      return {
        ...state,
        updateBlogbyidAPiSuccessData: payload,
      };
    },
    updateBlogbyidAPiLoading(state, { payload }) {
      return {
        ...state,
        updateBlogbyidAPiLoadingState: payload,
      };
    },


    // delete Blog API Response
deleteBlogResponse(state, { payload }) {
  return {
    ...state,
    deleteBlogResponseiDetails: payload?.response,
  };
},
deleteBlogRequest: (state) => state,

deleteBlogSuccess(state, { payload }) {
  return {
    ...state,
    deleteBlogSuccessData: payload,
  };
},

deleteBlogLoading(state, { payload }) {
  return {
    ...state,
    deleteBlogLoadingState: payload,
  };
},


  },
});

export const {
  setTheme,
  // signup
  postSignupAPiResponse,
  postSignupAPiRequest,
  postSignupAPiSuccess,
  postSignupAPiLoading,
      // Get blog by id
  getSignupuserAPiResponse,
  getSignupuserAPiRequest,
  getSignupuserAPiSuccess,
  getSignupuserAPiLoading,

  // login
  postLoginAPiResponse,
  postLoginAPiRequest,
  postLoginAPiSuccess,
  postLoginAPiLoading,
  // contact
  postContactAPiResponse,
  postContactAPiRequest,
  postContactAPiSuccess,
  postContactAPiLoading,
  // Add Post
  postAddBlogAPiResponse,
  postAddBlogAPiRequest,
  postAddBlogAPiSuccess,
  postAddBlogAPiLoading,
  // Get  all blog
  getAllBlogAPiResponse,
  getBlogAPiRequest,
  getAllBlogAPiSuccess,
  getAllBlogAPiLoading,
    // Get blog by id
  getAllBlogbyidAPiResponse,
  getBlogbyidAPiRequest,
  getAllBlogbyidAPiSuccess,
  getAllBlogbyidAPiLoading,

      // update blog by id
  updateBlogbyidAPiResponse,
  updatebyidAPiRequest,
  updateBlogbyidAPiSuccess,
  updateBlogbyidAPiLoading,


    // delete blog by id
  deleteBlogResponse,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteBlogLoading,


} = BlogSlice.actions;

export default BlogSlice.reducer;
