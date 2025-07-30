
const form = document.getElementById("studentForm");
const output = document.getElementById("jsonOutput");


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const subjects = document.querySelectorAll('input[name="subject"]:checked');

  if (name === "" || email === "" || dob === "" || phone === "" || !gender || subjects.length === 0) {
    alert("Please fill all fields and make selections.");
    return;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    alert("Enter a valid email.");
    return;
  }

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  if (!phoneValid) {
    alert("Enter a valid 10-digit phone number starting with 6-9.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18) {
    alert("You must be at least 18 years old.");
    return;
  }

  const genderValue = gender.value;
  const selectedSubjects = Array.from(subjects).map(sub => sub.value);

  const studentData = {
    name,
    email,
    dob,
    age,
    phone,
    gender: genderValue,
    subjects: selectedSubjects
  };

  output.textContent = JSON.stringify(studentData, null, 2);

  localStorage.setItem("studentData", JSON.stringify(studentData));
});

form.addEventListener("reset", function () {
  localStorage.removeItem("studentData");
  output.textContent = "";
});

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
