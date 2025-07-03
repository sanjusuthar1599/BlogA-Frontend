// // import Cookies from "js-cookie";

// export const apiRequest = async (
//   endpoint,
//   method = "GET",
//   body = null,
//   customHeaders = {}
// ) => {
//   try {
//     const token = localStorage.getItem("token");
//     const headers = {
//       "Content-Type": "multipart/form-data",
//       Authorization: token ? `Bearer ${token}` : undefined,
//       ...customHeaders,
//     };

//     // const url = `${process.env.REACT_APP_BASE_API_URL}${endpoint}`;
//     const url = `http://localhost:3000/${endpoint}`;

//     const response = await fetch(url, {
//       method,
//       headers,
//       mode: "cors",
//       credentials: "same-origin",
//       ...(body && method !== "GET" && method !== "HEAD"
//         ? { body: JSON.stringify(body) }
//         : {}),
//     });

//     // console.log("response api caller", response);
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error(
//         `Invalid response type: Expected JSON but got ${contentType}`
//       );
//     }

//     // console.log("response omk", response.ok);
//     // if (!response.ok) {
//     //   const errorDetails = await response.json();
//     //   throw {
//     //     status: response.status,
//     //     response: errorDetails,
//     //   };
//     // }

//     return await response.json();
//   } catch (error) {
//     console.error("API call error:", error.message || error);
//     throw error;
//   }
// };



// export const apiRequest = async (
//   endpoint,
//   method = "GET",
//   body = null,
//   customHeaders = {}
// ) => {
//   try {
//     const token = localStorage.getItem("token");

//     // Base headers
//     let headers = {
//       Authorization: token ? `Bearer ${token}` : undefined,
//       ...customHeaders,
//     };

//     // If body is not FormData, add content-type
//  const isFormData = body instanceof FormData;
// if (!isFormData) {
//   headers["Content-Type"] = "application/json";
// }

//     const url = `http://localhost:3000/${endpoint}`;

//     const response = await fetch(url, {
//       method,
//       headers,
//       mode: "cors",
//       credentials: "same-origin",
//       ...(body && method !== "GET" && method !== "HEAD"
//         ? { body: isFormData ? body : JSON.stringify(body) }
//         : {}),
//     });

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error(
//         `Invalid response type: Expected JSON but got ${contentType}`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API call error:", error.message || error);
//     throw error;
//   }
// };
export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  customHeaders = {}
) => {
  try {
    const token = localStorage.getItem("token");

    let headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    };



 const isFormData = body instanceof FormData;
if (!isFormData) {
  headers["Content-Type"] = "application/json";
}
// 👇 Don't set Content-Type manually if using FormData




    // const url = `http://localhost:3000/${endpoint}`;

    const url = `https://blogapp-backend-2-o19a.onrender.com/${endpoint}`;


    const response = await fetch(url, {
      method,
      headers,
      mode: "cors",
      credentials: "same-origin",
      ...(body && method !== "GET" && method !== "HEAD"
        ? { body: isFormData ? body : JSON.stringify(body) }
        : {}),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Invalid response type: Expected JSON but got ${contentType}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error.message || error);
    throw error;
  }
};
