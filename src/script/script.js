import scheduleData from "../../schedule-formatter.js";
let selectedGroup = null;
let extraDatas = {
  "4CS001": {
    image: "src/assets/problem-solving.svg",
    teacher: {
      profile: "",
      socials: {
        linkedIn:
          "https://www.linkedin.com/in/basanta-singh-2583a01a5/?originalSubdomain=np",
        github: "",
        email: "",
      },
    },
  },
  "4CS017": {
    image: "src/assets/database.svg",
    teacher: {
      profile: "",
      socials: {
        linkedIn:
          "https://www.linkedin.com/in/arvind-nepal-679b52280/?originalSubdomain=np",
        github: "",
        email: "",
      },
    },
  },
  "4CS015": {
    image: "src/assets/programming.svg",
    teacher: {
      profile: "",
      socials: {
        linkedIn:
          "https://www.linkedin.com/in/sanjeev-rai-abab20135?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "",
        email: "",
      },
    },
  },
};
// document.addEventListener("DOMContentLoaded", () => {
//   let userGroup = localStorage.getItem("user-group");
//   populateScheduleCards("MON", JSON.parse(userGroup),filteredData);
// });
document.querySelector(".dark-toggle").addEventListener("click", toggleTheme);
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}
// Function to apply dark mode based on local storage
// function applyDarkModePreference() {
//   const darkModePreference = localStorage.getItem("darkMode");
//   if (darkModePreference === "enabled") {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }

// document.addEventListener("DOMContentLoaded", applyDarkModePreference);

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
  if (
    !menuButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    menuButton.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.add("hidden");
    dropdownMenu.classList.remove("opacity-100", "scale-100");
    dropdownMenu.classList.add("opacity-0", "scale-95");
  }
});
// Adds event listener to the classes groups menu button
let groupsBtn = document.querySelectorAll(".class-groups-btn");
groupsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectedGroup = e.target.textContent.trim();
    setActive(document.querySelector(".btn-day")); // Sets the sunday tab button to active state
    updateSelectedGroupInfoDisplay(selectedGroup);
    populateScheduleCards("SUN", selectedGroup);
    hideAlertMessage();
  });
});
function updateSelectedGroupInfoDisplay(selectedGroup) {
  let selectedGroupInfoDisplay =
    selectedGroup != null
      ? `You are currently viewing schedule of Group ${selectedGroup}`
      : "You haven't selected any group";
  document.querySelector(".display-group").textContent =
    selectedGroupInfoDisplay;
}
updateSelectedGroupInfoDisplay(selectedGroup);
document.querySelectorAll(".btn-day").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Changes classes of currently selected tab component
    setActive(e.target);
    // Retrieves first 3 word from it eg: SUN from Sunday
    let selectedDay = e.target.textContent.trim().slice(0, 3).toUpperCase();
    if (selectedGroup == null) {
      console.warn("SELECT GROUP YOU FOOL");
      alertMessagePop();
    } else {
      populateScheduleCards(selectedDay, selectedGroup);
    }
  });
});
let filteredData = [];
function setActive(selectedBtn) {
  let activeClassNames = [
    "text-blue-600",
    "border-b-2",
    "border-blue-600",
    "dark:text-blue-500",
    "dark:border-blue-500",
  ];
  document.querySelectorAll(".btn-day").forEach((button) => {
    button.classList.remove(...activeClassNames);
  });
  selectedBtn.classList.add(...activeClassNames);
}
let classContainer = document.querySelector(".classes-wrapper");
// Event delegation: Added a single event listener to classContainer
classContainer.addEventListener("click", (e) => {
  console.log(e.target);
  // Check if the clicked element has the 'view-more' class
  if (e.target.classList.contains("view-more")) {
    const classesCard = e.target.closest(".classes-card");
    const moduleCode = classesCard.dataset.moduleCode;
    // Calls the function when "View More" button is clicked
    showDetailsModal(moduleCode, filteredData);
    console.log("Hello");
  }
  // });
});

function getRandomColor() {
  let randomColors = ["yellow-400", "red-400", "green-400", "teal-500"];
  return randomColors[Math.floor(Math.random() * randomColors.length)];
}
function populateScheduleCards(selectedDay, selectedGroup) {
  // Clears existing content to prevent duplicate elements
  classContainer.innerHTML = "";
  let newDataClassNames = [
    "classes-card",
    "flex",
    "w-full",
    "items-center",
    "justify-between",
    "rounded-md",
    "p-4",
    "shadow-md",
    "border-l-4",
    "pl-2",
    "gap-2",
    "md:gap-0",
    "dark:bg-gray-800",
    "bg-slate-50",
  ];
  // Returns array of data of the selected day and group
  filteredData = scheduleData[selectedDay].filter((dat) =>
    dat.Group.includes(selectedGroup),
  );
  filteredData.forEach((data) => {
    let newData = document.createElement("div");
    newData.classList.add(...newDataClassNames);
    let randomColor = getRandomColor();
    newData.classList.add(`border-l-${randomColor}`); // Adding random border colour
    newData.innerHTML = `
          <div class="card-left flex flex-grow items-center gap-6 dark:text-white">
                <div class="card-cover">
                  <img
                    src="${extraDatas[data["Module Code"]].image}"
                    alt=""
                    class="h-12 w-14 rounded-lg object-contain shadow-xl md:h-14 md:w-16 lg:h-16 lg:w-20"
                  />
                </div>
                <div class="info">
                  <div
                    class="main-class-info flex flex-col-reverse items-center gap-1 md:flex-row md:gap-3 lg:gap-4"
                  >
                    <p class="text-sm font-semibold md:text-base">
                      ${data["Module Title"]}
                  </p>
                  <div
                    class="class-code self-start rounded-full bg-${randomColor} px-3 py-1 text-xs text-white md:self-center"
                  >
                    ${data["Module Code"]}
                  </div>
                </div>
                <div class="time-info flex items-center gap-2 p-1">
                  <i class="fa-regular fa-clock"></i>
                  <p class="text-xs text-gray-400">${data.Time}</p>
                </div>
              </div>
            </div>
            <div class="card-right">
              <button
                href=""
                class="text-xs hover:text-blue-400 hover:underline md:text-sm view-more"
              >
                View More
              </button>
            </div>
    `;
    newData.dataset.moduleCode = data["Module Code"];
    classContainer.appendChild(newData);
  });
}

function showDetailsModal(code, filteredData) {
  let mainContainer = document.querySelector(".main-content-wrapper");
  let detailedCard = document.querySelector(".detailed-card");
  let requiredData = filteredData.find((dat) => dat["Module Code"] == code);
  console.log(requiredData);
  // Updates the info inside details modal accordingly
  updateDetailsModal(requiredData, code);
  if (window.innerWidth <= 768) {
    detailedCard.style.display = "block"; // Show as popup modal
  } else {
    mainContainer.classList.add("details-visible"); // Slide-in behavior
  }
  // Remove 'closing' class to allow for smooth transition
  detailedCard.classList.remove("closing");

  let closeBtn = document.querySelector(".close-button");
  closeBtn.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        detailedCard.style.display = "none"; // Hide modal for mobile
      }, 300);
    } else {
      setTimeout(() => {
        mainContainer.classList.remove("details-visible");
      }, 300);
    }
    detailedCard.classList.add("closing");
  });
}
function updateDetailsModal(requiredData, code) {
  let moduleTitle = document.querySelector(".card-module-title");
  let moduleCode = document.querySelector(".card-code-info");
  let cardGroupInfo = document.querySelector(".card-group-info");
  let lecturerName = document.querySelector(".card-lecturer-name");
  let roomName = document.querySelector(".card-room-right");
  let classTime = document.querySelector(".card-time-right");
  moduleTitle.textContent = requiredData["Module Title"];
  moduleCode.textContent = requiredData["Module Code"];
  cardGroupInfo.textContent = requiredData["Group"];
  lecturerName.textContent = requiredData["Lecturer"];
  roomName.textContent = requiredData.Room;
  classTime.textContent = requiredData.Time;
  let linkGithub = document.querySelector(".link-github");
  let linkLinkedIn = document.querySelector(".link-linkedin");
  let linkEmail = document.querySelector(".link-email");
  linkGithub.href = extraDatas[code].teacher.socials.github;
  linkLinkedIn.href = extraDatas[code].teacher.socials.linkedIn;
  linkEmail.href = extraDatas[code].teacher.socials.email;
}

function alertMessagePop() {
  const alertMessage = document.querySelector(".alert-message");
  const closeAlert = document.querySelector("#alert-3 button");
  alertMessage.classList.remove("hidden");
  closeAlert.addEventListener("click", () => {
    hideAlertMessage();
  });
}

function hideAlertMessage() {
  const alertMessage = document.querySelector(".alert-message");
  const closeAlert = document.querySelector("#alert-3 button");
  closeAlert.addEventListener("click", () => {
    alertMessage.classList.add("hidden");
  });
  alertMessage.style.display = "none";
}
