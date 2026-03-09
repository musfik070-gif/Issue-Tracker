//New issue add
const newIssueBtn = document.getElementById("newIssueBtn");
const newIssueModal = document.getElementById("newIssueModal");

const cancelIssue = document.getElementById("cancelIssue");
const createIssue = document.getElementById("createIssue");

const issueTitle = document.getElementById("issueTitle");
const issueDescription = document.getElementById("issueDescription");
const issueAuthor = document.getElementById("issueAuthor");
const issueLabel = document.getElementById("issueLabel");
const issueStatus = document.getElementById("issueStatus");
const issuePriority = document.getElementById("issuePriority");

//Open new issue modal
newIssueBtn.addEventListener("click", () => {
  newIssueModal.classList.remove("hidden");
  newIssueModal.classList.add("flex");
});

//Close modal
cancelIssue.addEventListener("click", () => {
  newIssueModal.classList.add("hidden");
});

//create new issue
createIssue.addEventListener("click", () => {
  const newIssue = {
    id: Date.now(),
    title: issueTitle.value,
    description: issueDescription.value,
    author: issueAuthor.value,
    labels: [issueLabel.value],
    status: issueStatus.value,
    priority: issuePriority.value,
    createdAt: new Date().toISOString(),
  };

  allIssues.unshift(newIssue);

  renderIssues(allIssues);

  newIssueModal.classList.add("hidden");
  newIssueModal.classList.remove("flex"); // hiding the modal after creating the issue
});

//search functionality
const searchInput = document.getElementById("searchInput");

// Get modal elements
const issueModal = document.getElementById("issueModal");

const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");

const closeModal = document.getElementById("closeModal");

const tabButtons = document.querySelectorAll(".tab-btn");

let allIssues = [];
let currentTab = "all";

//Open modal with issue details
function openModal(issueId) {
  const issue = allIssues.find((item) => item.id === issueId);

  if (!issue) return; // Safety check

  modalTitle.innerText = issue.title;

  modalDescription.innerText = issue.description;

  modalAuthor.innerText = "Opened by " + issue.author;

  modalDate.innerText = new Date(issue.createdAt).toLocaleDateString();

  modalAssignee.innerText = issue.assignee || "Unassigned";

  modalPriority.innerText = issue.priority;

  modalStatus.innerText = issue.status;

  // Status color
  modalStatus.className =
    issue.status && issue.status.toLowerCase() === "open"
      ? "px-3 py-1 rounded-full text-xs bg-green-500 text-white"
      : "px-3 py-1 rounded-full text-xs bg-purple-500 text-white";

  // Priority color
  modalPriority.className =
    issue.priority && issue.priority.toLowerCase() === "high"
      ? "px-3 py-1 rounded-full text-xs bg-red-500 text-white"
      : issue.priority && issue.priority.toLowerCase() === "medium"
        ? "px-3 py-1 rounded-full text-xs bg-yellow-500 text-white"
        : "px-3 py-1 rounded-full text-xs bg-gray-400 text-white";

  // Labels
  modalLabels.innerHTML = "";

  if (issue.labels) {
    issue.labels.forEach((label) => {
      const span = document.createElement("span");

      span.className =
        "px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600";

      span.innerText = label;

      modalLabels.appendChild(span);
    });
  }
// Show modal
  issueModal.classList.remove("hidden");
  issueModal.classList.add("flex");
}

//Close modal
closeModal.addEventListener("click", () => {
  issueModal.classList.add("hidden");
  issueModal.classList.remove("flex");
});

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
  let filteredIssues = [...issues];
  if (currentTab !== "all") {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.status === currentTab,
    );
  }
  document.getElementById("issueCount").innerText =
    filteredIssues.length + " Issues";

  filteredIssues.forEach((issue) => {
    //G,P,Y
    let statusColor = "border-gray-500";
    let iconBg = "bg-gray-100";
    let iconTextColor = "text-gray-500";
    let statusStr = issue.status ? issue.status.toLowerCase() : "";

    if (statusStr === "open") {
      statusColor = "border-green-500";
      iconBg = "bg-green-100";
      iconTextColor = "text-green-500";
    } else if (statusStr === "closed") {
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
      
    card.className = `bg-white border-t-4 ${statusColor} rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all group`;
    card.onclick = () => openModal(issue.id);

    card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            
            <div class="w-7 h-7 rounded-full ${iconBg} flex items-center justify-center ${iconTextColor}">
                <i class="fa-regular fa-circle-check"></i>
            </div>

            <span class="${priorityClass} text-xs px-3 py-1 rounded-full font-medium uppercase">
                ${issue.priority}
            </span>

        </div>

        <h4 class="font-semibold text-sm mb-2 group-hover:text-purple-600 transition-colors">
            ${issue.title}
        </h4>

        <p class="text-xs text-gray-500 mb-3">
            ${issue.description ? issue.description.substring(0, 70) : ""}...
        </p>

        <div class="flex gap-2 text-xs mb-3">
            ${
              issue.labels
                ? issue.labels
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
                    .join("")
                : ""
            }
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

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = allIssues.filter(
    (issue) => issue.title && issue.title.toLowerCase().includes(keyword),
  );

  renderIssues(filtered);
});