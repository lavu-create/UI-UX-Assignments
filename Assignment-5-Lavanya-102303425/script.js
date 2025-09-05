// i. Take two numbers and display sum, difference, product, quotient
function calculateNumbers() {
  let num1 = parseFloat(prompt("Enter first number:"));
  let num2 = parseFloat(prompt("Enter second number:"));
  let result = `
    Sum: ${num1 + num2}<br>
    Difference: ${num1 - num2}<br>
    Product: ${num1 * num2}<br>
    Quotient: ${num1 / num2}<br>
  `;
  document.getElementById("output1").innerHTML = result;
}

// ii. Array operations
function arrayOperations() {
  let numbers = [45, 12, 78, 34, 56];
  let largest = Math.max(...numbers);
  let smallest = Math.min(...numbers);
  let ascending = [...numbers].sort((a, b) => a - b);
  let descending = [...numbers].sort((a, b) => b - a);
  let result = `
    Numbers: ${numbers}<br>
    Largest: ${largest}<br>
    Smallest: ${smallest}<br>
    Ascending: ${ascending}<br>
    Descending: ${descending}<br>
  `;
  document.getElementById("output2").innerHTML = result;
}

// iii. Form Validation
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = parseInt(document.getElementById("age").value);
  if (name === "") {
    alert("Name cannot be empty!");
    return;
  }
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format!");
    return;
  }
  if (isNaN(age) || age < 18 || age > 100) {
    alert("Age must be between 18 and 100!");
    return;
  }
  alert("Form submitted successfully!");
}

// iv. Student Object
function studentOperations() {
  // Create student object
  let student = {
    name: "Lavanya",
    age: 20,
    grades: "B"
  };
  // Add a new property
  student.class = "12th";
  // Update grade
  student.grades = "A";
  // Display student info
  let result = "";
  for (let key in student) {
    result += `${key}: ${student[key]}<br>`;
  }
  document.getElementById("output4").innerHTML = result;
}

// v. Array with map(), filter(), reduce()
function processNumbers() {
  let numbers = [1, 2, 3, 4, 5, 6];
  //Remove odd numbers
  let evens = numbers.filter(num => num % 2 === 0);
  //Multiply remaining numbers by 2
  let multiplied = evens.map(num => num * 2);
  //Find the sum
  let finalSum = multiplied.reduce((sum, num) => sum + num, 0);
  // Display step by step
  let result = `
    Array = [${numbers}]<br><br>
    Remove odd → [${evens}]<br><br>
    Multiply ×2 → [${multiplied}]<br><br>
    Sum → ${finalSum}
  `;
  document.getElementById("output5").innerHTML = result;
}