import { scheduleData } from "./routine-data.js";
let selectedGroup = null;
document.querySelector(".dark-toggle").addEventListener("click",toggleTheme)
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
function fetchSchedule(selectedDay, selectedGroup) {
  let classContainer = document.querySelector(".classes-wrapper");
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
      let filteredData = data.filter((dat) =>
        dat.Group.includes(selectedGroup),
      );
      filteredData.forEach((dat) => {
        let newData = document.createElement("div");
        newData.classList.add(
          "classes-card",
          "flex",
          "justify-between",
          "p-2",
          "items-center",
          "w-full",
          "p-4",
        );

        newData.innerHTML = `
          <div class="card-left flex-grow">
            <div class="info">
              <p class="text-sm md:text-base font-semibold">${dat["Module Title"]}</p>
              <p class="text-xs text-gray-400">${dat.Time}</p>
            </div>
          </div>
          <div class="card-right">
            <button class="hover:text-blue-400 hover:underline text-sm view-more">View More</button>
          </div>
        `;

        classContainer.appendChild(newData);
      });
    }
  });
  // Event delegation: Add a single event listener to classContainer
  classContainer.addEventListener("click", (e) => {
    // Check if the clicked element has the 'view-more' class
    if (e.target.classList.contains("view-more")) {
      console.log("Clicked button:", e.target);

      // Toggle class to show detailed view
      showDetailsModal();
    }
    // });
  });
}

function showDetailsModal() {
  let mainContainer = document.querySelector(".main-content-wrapper");
  mainContainer.classList.add("details-visible");
  let closeBtn = document.querySelector(".close-button");
  closeBtn.addEventListener("click", () => {
    mainContainer.classList.remove("details-visible");
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
