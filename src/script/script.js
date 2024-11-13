const scheduleData = {
  SUN: [
    {
      "Class Type": "Lecture",
      "Module Code": "4CS001",
      "Module Title": "Introductory Programming and Problem Solving",
      Lecturer: "Mr. Basanta Singh",
      Time: "8 AM to 10 AM",
      Group: ["L4CG1", "L4CG2"],
      Room: "LT - 01 Wulfurna",
    },
    {
      "Class Type": "Workshop",
      "Module Code": "4CS015",
      "Module Title": "Fundamentals of Computing",
      Lecturer: "Mr. Sanjeev Chamling",
      Time: "8 AM to 10:30 AM",
      Group: ["L4CG4"],
      Room: "LAB - 01 Baraha",
    },
    {
      "Class Type": "Workshop",
      "Module Code": "4CS017",
      "Module Title": "Internet Software Architecture and Database",
      Lecturer: "Mr. Arvind Nepal",
      Time: "11:00 AM to 1:30 PM",
      Group: ["L4CG1"],
      Room: "SR - 01 Wolves",
    },
    {
      "Class Type": "Workshop",
      "Module Code": "4CS015",
      "Module Title": "Fundamentals of Computing",
      Lecturer: "Mr. Sanjeev Chamling",
      Time: "11:30 AM to 2:00 PM",
      Group: ["L4CG2"],
      Room: "SR - 02 Compton",
    },
    {
      "Class Type": "Lecture",
      "Module Code": "4CS001",
      "Module Title": "Introductory Programming and Problem Solving",
      Lecturer: "Mr. Basanta Singh",
      Time: "12 PM to 2 PM",
      Group: ["L4CG3", "L4CG4"],
      Room: "LT - 01 Wulfurna",
    },
  ],
  MON: [
    {
      "Class Type": "Lecture",
      "Module Code": "4CS015",
      "Module Title": "Fundamentals of Computing",
      Lecturer: "Mr. Sanjeev Chamling",
      Time: "8 AM to 10 AM",
      Group: ["L4CG1", "L4CG2"],
      Room: "LT - 01 Wulfurna",
    },
    {
      "Class Type": "Tutorial",
      "Module Code": "4CS001",
      "Module Title": "Introductory Programming and Problem Solving",
      Lecturer: "Mr. Basanta Singh",
      Time: "8 AM to 10 AM",
      Group: ["L4CG3"],
      Room: "SR - 01 Wolves",
    },
    {
      "Class Type": "Workshop",
      "Module Code": "4CS017",
      "Module Title": "Internet Software Architecture and Database",
      Lecturer: "Mr. Arvind Nepal",
      Time: "8 AM to 10:30 AM",
      Group: ["L4CG4"],
      Room: "LAB - 01 Baraha",
    },
    {
      "Class Type": "Lecture",
      "Module Code": "4CS015",
      "Module Title": "Fundamentals of Computing",
      Lecturer: "Mr. Sanjeev Chamling",
      Time: "12 PM to 2 PM",
      Group: ["L4CG3", "L4CG4"],
      Room: "LT - 01 Wulfurna",
    },
    {
      "Class Type": "Tutorial",
      "Module Code": "4CS001",
      "Module Title": "Introductory Programming and Problem Solving",
      Lecturer: "Mr. Basanta Singh",
      Time: "11:00 AM to 1:00 PM",
      Group: ["L4CG1"],
      Room: "SR - 01 Wolves",
    },
    {
      "Class Type": "Workshop",
      "Module Code": "4CS017",
      "Module Title": "Internet Software Architecture and Database",
      Lecturer: "Mr. Arvind Nepal",
      Time: "12:00 PM to 2:30 PM",
      Group: ["L4CG2"],
      Room: "SR - 02 Compton",
    },
  ],
  TUE: [
    {
      "Class Type": "Lecture",
      "Module Code": "4CS017",
      "Module Title": "Internet Software Architecture and Database",
      Lecturer: "Mr. Arvind Nepal",
      Time: "8 AM to 10 AM",
      Group: ["L4CG1", "L4CG2"],
      Room: "LT - 01 Wulfurna",
    },
    {
      "Class Type": "Tutorial",
      "Module Code": "4CS015",
      "Module Title": "Fundamentals of Computing",
      Lecturer: "Mr. Sanjeev Chamling",
      Time: "8 AM to 10 AM",
      Group: ["L4CG3"],
      Room: "SR - 01 Wolves",
    },
    {
      "Class Type": "Tutorial",
      "Module Code": "4CS001",
      "Module Title": "Introductory Programming and Problem Solving",
      Lecturer: "Mr. Basanta Singh",
      Time: "8 AM to 10 AM",
      Group: ["L4CG4"],
      Room: "LAB - 01 Baraha",
    },
    {
      "Class Type": "Lecture",
      "Module Code": "4CS017",
      "Module Title": "Internet Software Architecture and Database",
      Lecturer: "Mr. Arvind Nepal",
      Time: "12 PM to 2 PM",
      Group: ["L4CG3", "L4CG4"],
      Room: "LT - 01 Wulfurna",
    },
  ],
  // Additional days can be added similarly if there are more.
};
// let container = document.querySelector(".container");
// container.innerHTML = "";
// let req = Object.entries(scheduleData).map(([day, data]) => {
//   data.forEach((session) => {
//     let tr = document.createElement("tr");
//     tr.classList.add(
//       "odd:bg-white",
//       "odd:dark:bg-gray-900",
//       "even:bg-gray-50",
//       "even:dark:bg-gray-800",
//       "border-b",
//       "dark:border-gray-700"
//     );
//     tr.innerHTML = `
//           <td class="px-6 py-4">${session.Time}</td>
//           <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${session["Class Type"]}</td>
//           <td class="px-6 py-4">${session["Module Code"]}</td>
//           <td class="px-6 py-4">${session["Module Title"]}</td>
//           <td class="px-6 py-4">${session.Lecturer}</td>
//           <td class="px-6 py-4">${session.Group.join(", ")}</td>
//           <td class="px-6 py-4">${session.Room}</td>
//       `;
//     container.appendChild(tr);
//   });
// });
function toggleTheme() {
  document.body.classList.toggle("dark");
}
const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");

// Toggle dropdown visibility on button click
menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !isExpanded);
  dropdownMenu.classList.toggle("hidden");

  // Trigger the animation by removing the "transform opacity-0 scale-95" classes
  if (!isExpanded) {
    dropdownMenu.classList.remove("opacity-0", "scale-95");
    dropdownMenu.classList.add("opacity-100", "scale-100");
  } else {
    dropdownMenu.classList.remove("opacity-100", "scale-100");
    dropdownMenu.classList.add("opacity-0", "scale-95");
  }
});

// Close the dropdown if clicked outside
document.addEventListener("click", (event) => {
  if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    menuButton.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.add("hidden");
    dropdownMenu.classList.remove("opacity-100", "scale-100");
    dropdownMenu.classList.add("opacity-0", "scale-95");
  }
});
