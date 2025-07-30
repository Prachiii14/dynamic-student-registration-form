// Get form and inputs
const form = document.getElementById("studentForm");
const output = document.getElementById("jsonOutput");

// Submit Event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const subjects = document.querySelectorAll('input[name="subject"]:checked');

  // Validate fields
  if (name === "" || email === "" || dob === "" || phone === "" || !gender || subjects.length === 0) {
    alert("Please fill all fields and make selections.");
    return;
  }

  // Email format
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    alert("Enter a valid email.");
    return;
  }

  // Phone format
  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  if (!phoneValid) {
    alert("Enter a valid 10-digit phone number starting with 6-9.");
    return;
  }

  // Age check
  const age = calculateAge(dob);
  if (age < 18) {
    alert("You must be at least 18 years old.");
    return;
  }

  // Get selected values
  const genderValue = gender.value;
  const selectedSubjects = Array.from(subjects).map(sub => sub.value);

  // Create data object
  const studentData = {
    name,
    email,
    dob,
    age,
    phone,
    gender: genderValue,
    subjects: selectedSubjects
  };

  // Show JSON on screen
  output.textContent = JSON.stringify(studentData, null, 2);

  // Save in local storage
  localStorage.setItem("studentData", JSON.stringify(studentData));
});

// Reset Event
form.addEventListener("reset", function () {
  localStorage.removeItem("studentData");
  output.textContent = "";
});

// Age Calculation
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
