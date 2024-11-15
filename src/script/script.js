import { scheduleData } from "./routine-data.js";
let selectedGroup = null;
document.querySelector(".dark-toggle").addEventListener("click", toggleTheme);
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
document.querySelectorAll(".btn-day").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // alert("Hey I am ", e.target);
    // document.querySelectorAll(".btn-day").forEach((button) => {
    //   button.classList.remove(...activeClassNames);
    // });
    // e.target.classList.add(...activeClassNames);
    setActive(e.target);
    let selectedDay = e.target.textContent.trim().slice(0, 3).toUpperCase();
    console.log("Selected Day:", selectedDay);
    fetchSchedule(selectedDay, selectedGroup);
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
  // Check if the clicked element has the 'view-more' class
  if (e.target.classList.contains("view-more")) {
    // console.log("Clicked button:", e.target);
    const classesCard = e.target.closest(".classes-card");
    // const moduleTitle = classesCard.dataset.moduleTitle;
    const moduleCode = classesCard.dataset.moduleCode;
    // const moduleTitle = classesCard.dataset.moduleTitle;
    // Toggle class to show detailed view
    showDetailsModal(moduleCode);
  }
  // });
});
function fetchSchedule(selectedDay, selectedGroup) {
  // Clear existing content to prevent duplicate elements
  classContainer.innerHTML = "";
  // let required = scheduleData[selectedDay].filter((dat) =>
  //   dat.Group.includes(selectedGroup),
  // );
  // required.forEach((dat) => {
  //   // console.log(data);
  //   // if(day == selectedDay)
  //   // data.forEach((dat) => {
  //   let newData = document.createElement("div");
  //   newData.classList.add(
  //     "classes-card",
  //     "flex",
  //     "justify-between",
  //     "p-2",
  //     "items-center",
  //     "w-full",
  //     "p-4",
  //   );
  //   newData.innerHTML = `
  //     <div class="card-left flex-grow">
  //       <div class="info">
  //         <p class="text-sm md:text-base font-semibold">${dat["Module Title"]}</p>
  //         <p class="text-xs text-gray-400">${dat.Time}</p>
  //       </div>
  //     </div>
  //     <div class="card-right">
  //       <button class="hover:text-blue-400 hover:underline text-sm view-more">View More</button>
  //     </div>
  //   `;
  //   classContainer.appendChild(newData);
  // });
  Object.entries(scheduleData).forEach(([day, data]) => {
    if (day == selectedDay) {
      filteredData = data.filter((dat) => dat.Group.includes(selectedGroup));

      filteredData.forEach((dat) => {
        let newData = document.createElement("div");
        newData.classList.add(
          "classes-card",
          "flex",
          "w-full",
          "items-center",
          "justify-between",
          "rounded-md",
          "p-4",
          "shadow-md",
          "border-l-4",
          "border-l-green-400",
          "pl-2",
          "gap-2",
          "md:gap-0",
        );

        newData.innerHTML = `
          <div class="card-left flex flex-grow items-center gap-6">
              <div class="card-cover">
                <img
                  src="https://img.freepik.com/free-vector/computer-troubleshooting-concept-illustration_114360-7496.jpg?t=st=1731552894~exp=1731556494~hmac=3a7078b16ed6f5da6d567ded90c1335d41475639666a146e65a0e40b6257c71d&w=826 "
                  alt=""
                  class="h-12 w-14 rounded-lg object-cover shadow-lg md:h-14 md:w-16 lg:h-16 lg:w-20"
                />
              </div>
              <div class="info">
                <div class="main-class-info flex flex-col-reverse md:flex-row items-center gap-1 md:gap-3 lg:gap-4">
                  <p class="text-sm font-semibold md:text-base">
                    ${dat["Module Title"]}
                  </p>
                  <div class="self-start class-code text-xs bg-green-200 py-1 px-3 rounded-full text-gray-600">
                    ${dat["Module Code"]}
                  </div>
                </div>
                <div class="time-info flex items-center gap-2 p-1">
                  <i class="fa-regular fa-clock"></i>
                  <p class="text-xs text-gray-400">${dat.Time}</p>
                </div>
              </div>
            </div>
            <div class="card-right">
              <button class="hover:text-blue-400 hover:underline md:text-sm text-xs view-more">View More</button>
            </div>
        `;
        // newData.dataset.moduleTitle = dat["Module Title"];
        newData.dataset.moduleCode = dat["Module Code"];
        // newData.dataset.time = dat.Time;
        classContainer.appendChild(newData);
      });
    }
  });
}

function showDetailsModal(code) {
  let mainContainer = document.querySelector(".main-content-wrapper");
  let detailedCard = document.querySelector(".detailed-card");
  let req = filteredData.find((dat) => dat["Module Code"] == code);
  console.log(req);
  let moduleTitle = document.querySelector(".card-module-title");
  let moduleCode = document.querySelector(".card-code-info");
  let cardGroupInfo = document.querySelector(".card-group-info");
  let lecturerName = document.querySelector(".card-lecturer-name");
  let roomName = document.querySelector(".card-room-right");
  let classTime = document.querySelector(".card-time-right");
  moduleTitle.textContent = req["Module Title"];
  moduleCode.textContent = req["Module Code"];
  cardGroupInfo.textContent = req["Group"];
  lecturerName.textContent = req["Lecturer"];
  roomName.textContent = req.Room;
  classTime.textContent = req.Time;
  // console.log("hello");
  if (window.innerWidth <= 768) {
    detailedCard.style.display = "block"; // Show as popup modal
  } else {
    mainContainer.classList.add("details-visible"); // Slide-in behavior
  }
  // mainContainer.classList.add("details-visible");
  // console.log(code);
  // Remove 'closing' class to allow for smooth transition
  detailedCard.classList.remove("closing");

  let closeBtn = document.querySelector(".close-button");
  closeBtn.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        detailedCard.style.display = "none"; // Hide modal for mobile
      }, 300);
      detailedCard.classList.add("closing");
    } else {
      setTimeout(() => {
        mainContainer.classList.remove("details-visible");
      }, 300);
    }
  });
}

let groupsBtn = document.querySelectorAll(".class-groups-btn");
groupsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectedGroup = e.target.textContent.trim();
    setActive(document.querySelector(".btn-day")); // Sets the sunday tab button to active state
    document.querySelector(".display-group").textContent = selectedGroup;
    fetchSchedule("SUN", selectedGroup);
  });
});
