import axios from "axios";
import "../../formstyle/formstyle.css";
import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Select Value",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const nameRegex = /^[a-zA-Z0-9_ ]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^$|^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  const validate = () => {
    const { name, email, phone, topic, message } = formData;
    let errs = {};

    if (!name.trim()) errs.name = "*Required";
    else if (!nameRegex.test(name)) errs.name = "*Invalid name";

    if (!email.trim()) errs.email = "*Required";
    else if (!emailRegex.test(email)) errs.email = "*Invalid email";

    if (phone && !phoneRegex.test(phone)) errs.phone = "*Invalid phone";

    if (!message.trim()) errs.message = "*Required";

    if (topic === "Select Value") errs.topic = "*Please select a topic";

    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    try {
const apiUrl = process.env.REACT_APP_CONTACT_API_URL || "https://contact-backend-wetd.onrender.com/api/contact";
      await axios.post(apiUrl, formData);
      alert("Query submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "Select Value",
        message: ""
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="h">Contact Us!</h3>

        {/* Name */}
        <div>
          <label>
            <i className="far fa-user myIcon"></i>
          </label>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>
            <i className="far fa-envelope myIcon"></i>
          </label>
          <input
            className="input"
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label>
            <i className="fas fa-phone myIcon"></i>
          </label>
          <input
            className="input"
            type="text"
            name="phone"
            placeholder="123 456 7890 (optional)"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Topic Select */}
        <div className="selectdiv">
          <select
            className="select"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            <option value="Select Value">Select Value</option>
            <option value="Schedule a Visit">Schedule a Visit</option>
            <option value="Develop Website">Develop Website</option>
            <option value="Develop App">Develop App</option>
          </select>
          {errors.topic && <p className="error">{errors.topic}</p>}
        </div>

        {/* Message */}
        <div>
          <textarea
            className="input"
            id="message"
            name="message"
            rows="4"
            cols="50"
            maxLength="1000"
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        {/* Submit */}
        <div className="subdiv">
          <button type="submit">Submit query</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
