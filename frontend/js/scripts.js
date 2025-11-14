const API = "http://localhost:5000/api";

// ------------------ LOGIN ------------------
if (document.getElementById("loginForm")) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") location.href = "admin-dashboard.html";
    else location.href = "student-dashboard.html";
  });
}

// ------------------ SIGNUP ------------------
if (document.getElementById("signupForm")) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    location.href = "student-dashboard.html";
  });
}

// ------------------ LOGOUT ------------------
function logout() {
  localStorage.clear();
  location.href = "index.html";
}

// ------------------ LOAD COURSES (Student Dashboard) ------------------
if (document.getElementById("coursesTable")) {
  loadCourses();
}

async function loadCourses() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  document.getElementById("welcome").innerText = `Welcome, ${user.name}`;

  const res = await fetch(`${API}/courses/`, {
    headers: { Authorization: "Bearer " + token },
  });

  const data = await res.json();
  const tbody = document.querySelector("#coursesTable tbody");
  tbody.innerHTML = "";

  data.forEach((c) => {
    let row = `
      <tr>
        <td>${c.courseName}</td>
        <td>${c.facultyName || ""}</td>
        <td><button onclick="goToFeedback('${c._id}')">Give Feedback</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function goToFeedback(id) {
  location.href = `feedback.html?course=${id}`;
}

// ------------------ FEEDBACK PAGE ------------------
if (document.getElementById("feedbackForm")) {
  loadCourseDropdown();

  feedbackForm.addEventListener("submit", submitFeedback);
}

async function loadCourseDropdown() {
  const res = await fetch(`${API}/courses/`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const data = await res.json();
  const select = document.getElementById("courseSelect");

  const urlParam = new URLSearchParams(window.location.search).get("course");

  data.forEach((c) => {
    let opt = document.createElement("option");
    opt.value = c._id;
    opt.text = c.courseName;

    if (urlParam === c._id) opt.selected = true;

    select.appendChild(opt);
  });
}

async function submitFeedback(e) {
  e.preventDefault();

  let courseId = document.getElementById("courseSelect").value;
  let rating = document.getElementById("rating").value;
  let comments = document.getElementById("comments").value;

  const res = await fetch(`${API}/feedback/submit`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseId, rating, comments }),
  });

  if (res.ok) {
    alert("Feedback submitted successfully!");
    location.href = "student-dashboard.html";
  }
}

// ------------------ ADMIN DASHBOARD ------------------
if (document.getElementById("feedbackTable")) {
  loadAdminFeedback();
}

async function loadAdminFeedback() {
  const res = await fetch(`${API}/feedback/all`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const data = await res.json();

  const tbody = document.querySelector("#feedbackTable tbody");
  tbody.innerHTML = "";

  data.forEach((f) => {
    let row = `
      <tr>
        <td>${f.studentId?.name}</td>
        <td>${f.studentId?.email}</td>
        <td>${f.courseId?.courseName}</td>
        <td>${f.rating}</td>
        <td>${f.comments}</td>
        <td>${new Date(f.createdAt).toLocaleString()}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Add Course
if (document.getElementById("addCourseForm")) {
  addCourseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let courseName = document.getElementById("cname").value;
    let facultyName = document.getElementById("cfac").value;

    const res = await fetch(`${API}/courses/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseName, facultyName }),
    });

    if (res.ok) {
      alert("Course added!");
      location.reload();
    }
  });
}

function exportCSV() {
  window.location.href = `${API}/feedback/export`;
}

// ------------------ ANALYTICS ------------------
if (document.getElementById("avgChart")) {
  loadChart();
}

async function loadChart() {
  const res = await fetch(`${API}/feedback/all`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const data = await res.json();

  let map = {};

  data.forEach((f) => {
    let course = f.courseId?.courseName || "Unknown";

    if (!map[course]) map[course] = { total: 0, count: 0 };

    map[course].total += f.rating;
    map[course].count++;
  });

  let labels = Object.keys(map);
  let values = labels.map((c) =>
    (map[c].total / map[c].count).toFixed(2)
  );

  const ctx = document.getElementById("avgChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Average Rating",
          data: values,
        },
      ],
    },
  });
}
