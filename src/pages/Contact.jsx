import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { postContactAPiRequest } from "../redux/reducers/reducer/blogreducer";  
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
       dispatch(postContactAPiRequest(formData));
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
       navigate("/", {
          state: { message: "Contact form submitted successfully!" }
        });
    }
  };
 

  return (
    <>
    <div className="bg-white p-6 pt-3 pb-3 rounded-xl shadow">
  <div className="text-3xl font-bold  bg-gradient-to-br from-orange-500 to-yellow-400 bg-clip-text text-transparent">
    Contect
  </div>
</div>

    <form
      onSubmit={handleSubmit}
      className=" mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10"
    >
      <div className="title w-full mb-8">
        <h4 className="text-xl font-bold mb-2">Need Help or Have a Suggestion?</h4>
        <p className="text-base text-gray-600">
          Our team is here to assist you! Reach out with any questions, or share your suggestions—we value your feedback and will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.name && <p className="text-red-500 text-sm absolute">{errors.name}</p>}
        </div>

        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && <p className="text-red-500 text-sm absolute">{errors.email}</p>}
        </div>

        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Subject of your message"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.subject && <p className="text-red-500 text-sm absolute">{errors.subject}</p>}
        </div>

        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm absolute">{errors.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default Contact;
