import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { userRequest } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState(null); 
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeRes = await userRequest.get("/employee/all");
        setEmployees(employeeRes.data); // Set the employee data
        setTotalCount(employeeRes.data.length); // Set the total count
      } catch (error) {
        alert(error)
      }
    };
    fetchData();
  }, []);

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
     
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Function to sort the employees array based on the selected field and order
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy) {
      const comparison = a[sortBy].localeCompare(b[sortBy]);
      return sortOrder === "asc" ? comparison : -comparison;
    }
    return 0;
  });

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`); 
  };

  const handleCreateEmployee = () => {
    navigate("/employee/edit");
  };
  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/employee/delete/${id}`);
      // Update the employee list after deletion
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);
    } catch (error) {
     alert(error)
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to perform search based on the search query
  const handleSearch = async () => {
    try {
      const response = await userRequest.get(
        `/employee/search?q=${searchQuery}`
      );
      setEmployees(response.data);
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="w-screen">
      <TopNav />
      <div className="w-screen">
        <h1>Employee List</h1>
      </div>
      <div className="flex justify-between px-4">
        <h1 className="px-12">Total Count: {totalCount}</h1>
        <button onClick={handleCreateEmployee}>Create Employee</button>
      </div>
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search Employee"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("_id")}
              >
                Unique ID
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("image")}
              >
                Image
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("email")}
              >
                Email
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("mobile")}
              >
                Mobile No
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("designation")}
              >
                Designation
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("gender")}
              >
                gender
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("course")}
              >
                Course
              </th>
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort("createDate")}
              >
                Create Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEmployees.map((employee, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">{employee._id}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <img
                    className="h-12 w-12"
                    src={`/avatar/${
                      employee.image.split("public\\avatar\\")[1]
                    }`}
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.mobile}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.designation}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.gender}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.course}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {employee.createDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <p>{employee.active ? "Active" : "Deactive"}</p>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
