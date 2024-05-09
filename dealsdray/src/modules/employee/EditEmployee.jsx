import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import InputRadioButton from "../../components/Input/InputRadioButton";
import { useNavigate, useParams } from "react-router-dom";
import {  userRequest } from "../../axios/axios";
import Button from "../../components/Button/Button";

const EditEmployee = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      if (id) {
        // If id exists, set isEditing to true and fetch employee data
        setIsEditing(true);
        fetchEmployeeData();
      }
    }, []);
  
  const fetchEmployeeData = async () => {
    try {
      const response = await userRequest.get(`/employee/${id}`);
      const employeeData = response.data;
      setFormData({
        name: employeeData.name,
        email: employeeData.email,
        mobile: employeeData.mobile,
        designation: employeeData.designation,
        gender: employeeData.gender,
        course: employeeData.course,
        image: employeeData.image,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
      // Handle error
    }
  };


 const handleInputChange = (e) => {
   if (e.target.name === "image") {
     // If the input is for image
     setFormData({ ...formData, image: e.target.files[0] });
   } else if (e.target.type === "checkbox") {
     // If the input is a checkbox
     const value = e.target.checked;
     const updatedCourse = e.target.value;
     if (value) {
       // Add course to the list
       setFormData({
         ...formData,
         course: [...formData.course, updatedCourse],
       });
     } else {
       // Remove course from the list
       const filteredCourses = formData.course.filter(
         (course) => course !== updatedCourse
       );
       setFormData({ ...formData, course: filteredCourses });
     }
   } else {
     // For other input fields
     const value = e.target.value;
     setFormData({ ...formData, [e.target.name]: value });
   }
 };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const formDataToSend = new FormData();
      // Append other form data
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("course", formData.course);
      // Check if image exists before appending
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      let response;
      if (isEditing) {
        // Send PUT request for editing an existing employee
        response = await userRequest.put(
          `/employee/edit/${id}`,
          formDataToSend
        );
      } else {
        // Send POST request for adding a new employee
        response = await userRequest.post("/employee/add", formDataToSend);
      }
      navigate("/employee");

      // Clear form data on successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        image: null,
      });
    } catch (error) {
      setErrorMessage("Failed, Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d2cfdf] h-full w-screen flex justify-center items-center">
      <div className="h-[900px] w-[1000px] bg-white flex justify-center items-center md:flex-row">
        <div className="pt-20 w-full flex flex-col overflow-scroll items-center scrollbar-hide">
          <div>
            <h1 className="text-2xl font-bold text-red-600">
              {isEditing ? "Edit Employee" : "Add new employee"}
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <Input
                label="User Name"
                name="name"
                type="text"
                placeholder="Enter user name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="mobile"
                type="text"
                placeholder="Enter phone number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Gender:</label>
              <div className="flex mb-2">
                <InputRadioButton
                  label="Male"
                  name="gender"
                  type="radio"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                <InputRadioButton
                  label="Female"
                  name="gender"
                  type="radio"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                <InputRadioButton
                  label="Other"
                  name="gender"
                  type="radio"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Designation</label>
              <select
                className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="designation"
                id="designation"
                value={formData.designation}
                onChange={handleInputChange}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Course</label>
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="bca"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={handleInputChange}
                />
                <label htmlFor="bca">BCA</label>
              </div>
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="mca"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={handleInputChange}
                />
                <label htmlFor="mca">MCA</label>
              </div>
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="mba"
                  name="course"
                  value="MBA"
                  checked={formData.course.includes("MBA")}
                  onChange={handleInputChange}
                />
                <label htmlFor="mba">MBA</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                name="image"
              />
              {/* {formData.image && (
                <img
                  src={formData.image}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )} */}
            </div>
            <div className="flex flex-col items-center">
              <Button
                type="submit"
                className="p-2"
                label="Done"
                disabled={loading}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
