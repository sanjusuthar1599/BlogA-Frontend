// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux';
// import store from '../../frontend/src/redux/store/globlestore.js'


// createRoot(document.getElementById('root')).render(
//   <Provider store={store} >
//     <App />
//   </Provider>
// )
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
// import store from "../../frontend/src/redux/store/globlestore.js";
// ✅ Correct
import  store  from "./redux/store/globlestore.js";

import App from "./App.jsx";
import "./index.css";

// ✅ Wrapper to apply dark class based on Redux theme
const ThemeWrapper = () => {
  const theme = useSelector((state) => state.blogReducer.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <App />;
};

createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <ThemeWrapper />
    </Provider>

);
