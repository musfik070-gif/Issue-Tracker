const tabButtons = document.querySelectorAll(".tab-btn");

let allIssues = [];
let currentTab = "all";

const issuesContainer = document.getElementById("issuesContainer");
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

async function loadIssues() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const issues = data.data;
    allIssues = issues;
    renderIssues(allIssues);
  } catch (error) {
    console.error("Error loading issues:", error);
  }
}

function renderIssues(issues) {
  issuesContainer.innerHTML = "";

  //filter based on currentTab
  let filteredIssues = issues;
  if (currentTab !== "all") {
    filteredIssues = issues.filter((issue) => issue.status === currentTab);
  }

  filteredIssues.forEach((issue) => {
    //G,P,Y
    let statusColor = "border-gray-500";
    let iconBg = "bg-gray-100";
    let iconTextColor = "text-gray-500";

    if (issue.status === "open") {
      statusColor = "border-green-500";
      iconBg = "bg-green-100";
      iconTextColor = "text-green-500";
    } else if (issue.status === "closed") {
      statusColor = "border-purple-500";
      iconBg = "bg-purple-100";
      iconTextColor = "text-purple-500";
    } else {
      statusColor = "border-yellow-400";
      iconBg = "bg-yellow-100";
      iconTextColor = "text-yellow-500";
    }

    //high, medium, low
    let priorityClass = "bg-gray-100 text-gray-500"; // Default
    const priority = issue.priority ? issue.priority.toLowerCase() : "";

    if (priority === "high") {
      priorityClass = "bg-red-100 text-red-500";
    } else if (priority === "medium") {
      priorityClass = "bg-yellow-100 text-yellow-600";
    } else if (priority === "low") {
      priorityClass = "bg-gray-100 text-gray-500";
    }

    const card = document.createElement("div");
    card.className = `bg-white border-t-4 ${statusColor} rounded-lg shadow-sm p-4`;

    card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            
            <div class="w-7 h-7 rounded-full ${iconBg} flex items-center justify-center ${iconTextColor}">
                <i class="fa-regular fa-circle-check"></i>
            </div>

            <span class="${priorityClass} text-xs px-3 py-1 rounded-full font-medium uppercase">
                ${issue.priority}
            </span>

        </div>

        <h4 class="font-semibold text-sm mb-2 cursor-pointer">
            ${issue.title}
        </h4>

        <p class="text-xs text-gray-500 mb-3">
            ${issue.description.substring(0, 70)}...
        </p>

        <div class="flex gap-2 text-xs mb-3">
            ${issue.labels
              .map((label) => {
                let labelClass = "bg-gray-100 text-gray-600"; // Default
                const lbl = label.toLowerCase();

                if (lbl.includes("bug")) {
                  labelClass = "bg-red-100 text-red-500";
                } else if (lbl.includes("help")) {
                  labelClass = "bg-yellow-100 text-yellow-600";
                } else if (lbl.includes("enhancement")) {
                  labelClass = "bg-blue-100 text-blue-500";
                }

                return `
                <span class="${labelClass} px-2 py-1 rounded-full">
                    ${label}
                </span>`;
              })
              .join("")}
        </div>

        <div class="text-xs text-gray-500 border-t pt-2 mt-2">
            #${issue.id} by ${issue.author} <br>
            ${new Date(issue.createdAt).toLocaleDateString()}
        </div>
    `;

    issuesContainer.appendChild(card);
  });
}

loadIssues();

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentTab = button.dataset.tab;

    renderIssues(allIssues);

    updateActiveTab(button);
  });
});

function updateActiveTab(activeButton) {
  tabButtons.forEach((btn) => {
    btn.classList.remove(
      "bg-gradient-to-r",
      "from-purple-500",
      "to-indigo-600",
      "text-white",
    );

    btn.classList.add("border", "border-gray-300", "text-gray-700");
  });

  activeButton.classList.remove("border", "border-gray-300", "text-gray-700");

  activeButton.classList.add(
    "bg-gradient-to-r",
    "from-purple-500",
    "to-indigo-600",
    "text-white",
  );
}
