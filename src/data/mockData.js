/*
//File ENV
REACT_APP_BASE_URL=https://udpt-be.onrender.com
REACT_APP_API_VER=api/v1
// 
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = process.env.REACT_APP_API_VER;
*/
// mockData.js

const BASE_URL = "https://un55jky373.execute-api.ap-southeast-1.amazonaws.com";
const API_VER = "api/v1";

//Login
export const loginUser = async (username, password) => {
  const loginData = new URLSearchParams();
  loginData.append("grant_type", "password");
  loginData.append("username", username);
  loginData.append("password", password);

  const response = await fetch(`${BASE_URL}/${API_VER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: loginData.toString(),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // Log data for debugging
  console.log("Login response data:", data);

  // Ensure 'access_token' exists in the response
  if (data.access_token) {
    localStorage.setItem("accessToken", data.access_token);
  } else {
    throw new Error("Access token not found in response");
  }

  return data;
};

//Logout
export const logoutUser = async () => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Make a request to the logout API
    const response = await fetch(`${BASE_URL}/${API_VER}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    // Remove the access token from local storage
    localStorage.removeItem("accessToken");

    return true; // Indicate successful logout
  } catch (error) {
    console.error("Error logging out:", error);
    return false; // Indicate failure to log out
  }
};

//Change Password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await fetch(
      `${BASE_URL}/${API_VER}/users/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the token in the header
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    const result = await response.json();
    return result; // Return the response
  } catch (error) {
    console.error("Error changing password:", error);
    return null; // Return null in case of error
  }
};

//Dashboard
export const fetchUserInfo = async () => {
  const token = localStorage.getItem("accessToken"); // Retrieve the token directly as a string

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Use the token directly as a string
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Get error details as text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch user information");
    }

    const data = await response.json();
    console.log("User info response data:", data); // Log data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

//Get my Request
export const getMyTickets = async () => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get tickets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting tickets:", error);
    return null;
  }
};

//Get my ticket
export const fetchUserTickets = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_VER}/tickets/me/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text(); // Lấy thông tin lỗi dưới dạng text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch user tickets");
    }

    const data = await response.json();
    console.log("User tickets response data:", data); // Log dữ liệu để debug
    return data;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    return null;
  }
};
//Get my exchange
export const fetchUserExchange = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_VER}/voucher_exchanges/me/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text(); // Lấy thông tin lỗi dưới dạng text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch user tickets");
    }

    const data = await response.json();
    console.log("User tickets response data:", data); // Log dữ liệu để debug
    return data;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    return null;
  }
};
//my participation
export const fetchUserParticipations = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("accessToken"); // Get token from localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_VER}/activity_participations/me?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text(); // Get error as text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch user participations");
    }

    const data = await response.json();
    console.log("User participations response data:", data); // Log data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching user participations:", error);
    return null;
  }
};

//My check in
export const fetchMyWorkLogsData = async (startDate, endDate) => {
  const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(
      `https://udpt-be.onrender.com/api/v1/work-logs/me/?start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text(); // Get error response as text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch work logs");
    }

    const data = await response.json();
    console.log("Work logs response data:", data); // Log data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching work logs:", error);
    return null;
  }
};

// My Time Sheet
export const getMyTimeSheet = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");

    const response = await fetch(`${BASE_URL}/${API_VER}/time_sheets/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to get time sheet");
    return await response.json();
  } catch (error) {
    console.error("Error getting time sheet:", error);
    return null;
  }
};

export const UpdateMyTimeSheet = async (TimeSheetData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/time_sheets/me/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TimeSheetData),
    });

    if (!response.ok) {
      throw new Error("Failed to get time sheet");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting time sheet:", error);
    return null;
  }
};

//MANAGE TEAM
//View Team
export const fetchTeamData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/users/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error("Error fetching team data:", error);
    return []; // Return an empty array in case of error
  }
};

//Create new user
export const createUser = async (userData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const result = await response.json();
    console.log("API response:", result); // Log the response for debugging
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error("Error creating user:", error);
    return null; // Return null in case of error
  }
};

//Delete User
export const deleteUser = async (userId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false; // Return false if deletion fails
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json(); // Return the updated user data
  } catch (error) {
    console.error("Error updating user:", error);
    return null; // Return null if update fails
  }
};

export const fetchUserById = async (userId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json(); // Return the user data
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null if fetch fails
  }
};

//ACTIVITIES
// View all activities
export const fetchActivitiesData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/activities/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching activities data:", error);
    return [];
  }
};
export const createActivity = async (activityData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/activities/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Lấy thông tin lỗi từ response
      throw new Error(`Failed to create activity: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating activity:", error);
    return null;
  }
};

// Update an activity by ID// Update an activity by ID
export const updateActivity = async (activityId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/activities/${activityId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update activity");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating activity:", error);
    return null;
  }
};

// Fetch an activity by ID
export const fetchActivityById = async (activityId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/activities/${activityId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch activity data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
};

// TICKETS
// View all tickets
export const fetchTicketsData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/tickets/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching tickets data:", error);
    return [];
  }
};

// Create a new ticket
export const createTicket = async (ticketData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating ticket:", error);
    return null;
  }
};

// Update a ticket by ID
export const updateTicket = async (ticketId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/${ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating ticket:", error);
    return null;
  }
};

// Fetch a ticket by ID
export const fetchTicketById = async (ticketId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/${ticketId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch ticket data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return null;
  }
};

export const fetchTicketsByUserId = async (userId, page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/tickets/users/${userId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch tickets: ${errorText}`);
    }

    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error("Error fetching tickets data:", error);
    return [];
  }
};

//Voucher
// View all vouchers
export const fetchVouchersData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/vouchers/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching vouchers data:", error);
    return [];
  }
};

// Create a new voucher
export const createVoucher = async (voucherData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/vouchers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(voucherData),
    });

    if (!response.ok) {
      throw new Error("Failed to create voucher");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating voucher:", error);
    return null;
  }
};

// Update a voucher by ID
export const updateVoucher = async (voucherId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/vouchers/${voucherId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update voucher");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating voucher:", error);
    return null;
  }
};

// Fetch a voucher by ID
export const fetchVoucherById = async (voucherId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/vouchers/${voucherId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch voucher data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching voucher:", error);
    return null;
  }
};

//Exchange
// View all voucher exchanges
export const fetchVoucherExchangesData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/voucher_exchanges/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching voucher exchanges data:", error);
    return [];
  }
};

// Create a new voucher exchange
export const createVoucherExchange = async (voucherExchangeData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(voucherExchangeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create voucher exchange");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating voucher exchange:", error);
    return null;
  }
};

// Update a voucher exchange by ID
export const updateVoucherExchange = async (voucherExchangeId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/voucher_exchanges/${voucherExchangeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update voucher exchange");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating voucher exchange:", error);
    return null;
  }
};

// Fetch a voucher exchange by ID
export const fetchVoucherExchangeById = async (voucherExchangeId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/voucher_exchanges/${voucherExchangeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch voucher exchange data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching voucher exchange:", error);
    return null;
  }
};

export const checkIn = async () => {
  const token = localStorage.getItem("accessToken"); // Retrieve the access token from localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/work-logs/check-in`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Error response:", errorResponse);
      throw new Error("Failed to check in.");
    }

    const data = await response.json();
    console.log("Check-in response data:", data);
    return data;
  } catch (error) {
    console.error("Error during check-in:", error);
    return null;
  }
};

export const checkOut = async () => {
  const token = localStorage.getItem("accessToken"); // Retrieve the access token from localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/work-logs/check-out`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Error response:", errorResponse);
      throw new Error("Failed to check out.");
    }

    const data = await response.json();
    console.log("Check-out response data:", data);
    return data;
  } catch (error) {
    console.error("Error during check-out:", error);
    return null;
  }
};
export const fetchWorkLogsData = async (
  page = 1,
  limit = 10,
  startDate,
  endDate
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Format lại startDate và endDate để phù hợp với định dạng của API
    const formattedStartDate = startDate.replace(/:/g, "%3A");
    const formattedEndDate = endDate.replace(/:/g, "%3A");

    const response = await fetch(
      `${BASE_URL}/${API_VER}/work-logs/?page=${page}&limit=${limit}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch work logs: ${errorText}`);
    }

    const result = await response.json();
    console.log("API Response:", result);
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error("Error fetching work logs data:", error);
    return [];
  }
};
export const fetchWorkLogs = async (startDate, endDate) => {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_VER}/work-logs/me/?start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.text(); // Lấy thông tin lỗi dưới dạng text
      console.error("Error response:", errorResponse);
      throw new Error("Failed to fetch work logs");
    }

    const data = await response.json();
    console.log("Work logs response data:", data); // Log dữ liệu để debug
    return data;
  } catch (error) {
    console.error("Error fetching work logs:", error);
    return null;
  }
};
export const updateWorkLog = async (WorklogID, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/work-logs/note/${WorklogID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update work log");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating work log:", error);
    return null;
  }
};

// Fetch a ticket by ID
export const fetchWorkLogById = async (WorklogID) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/work-logs/${WorklogID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch ticket data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return null;
  }
};
//Point transfer

export const createPointTransfer = async (PointTransferData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/points-transfers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(PointTransferData),
    });

    if (!response.ok) {
      throw new Error("Failed to create voucher exchange");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating voucher exchange:", error);
    return null;
  }
};

export const fetchPointSent = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/points-transfers/sent/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching voucher exchanges data:", error);
    return [];
  }
};

export const fetchPointReceived = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/points-transfers/received/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching voucher exchanges data:", error);
    return [];
  }
};

export const createParticipation = async (ParticipationData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/activity_participations/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(ParticipationData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create activity participation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating activity participation:", error);
    return null;
  }
};
export const fetchList = async (activityId, page = 1, limit = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/activity_participations/?activity_id=${activityId}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch activity data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
};

export const createExchange = async (ExchangeData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(ExchangeData),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange voucher");
    }

    return await response.json();
  } catch (error) {
    console.error("Error exchange voucher:", error);
    return null;
  }
};
export const exchangeVoucher = async (ExchangeData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(ExchangeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create voucher");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating voucher:", error);
    return null;
  }
};

//Time sheet
export const fetchTimeSheetData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${BASE_URL}/${API_VER}/time_sheets/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching Time Sheet data:", error);
    return [];
  }
};
export const createTimeSheet = async (TimeSheetData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/time_sheets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(TimeSheetData),
    });

    if (!response.ok) {
      throw new Error("Failed to create Time Sheet");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Time Sheet:", error);
    return null;
  }
};

export const updateTimesheetStatus = async (id, status) => {
  try {
    // Lấy access token từ local storage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await fetch(
      `${BASE_URL}/${API_VER}/time_sheets/${id}/?status=${status}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update Status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error update status:", error);
    return null;
  }
};
