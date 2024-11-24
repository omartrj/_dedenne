function openDialog() {
  const dialog = document.getElementById("settings-dialog");
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById("settings-dialog");
  dialog.close();
}

function handleFileClick() {
  const fileInput = document.getElementById("file-input");
  fileInput.click();
}

function handleDragOver(event) {
  event.preventDefault();
  const dropArea = document.getElementById("drop-area");
  dropArea.style.borderColor = "#888";
}

function handleDragLeave() {
  const dropArea = document.getElementById("drop-area");
  dropArea.style.borderColor = "#ccc";
}

function handleDrop(event) {
  event.preventDefault();
  const dropArea = document.getElementById("drop-area");
  dropArea.style.borderColor = "#ccc";
  handleFile(event.dataTransfer.files[0]);
}

function handleFile(file) {
  if (
    file &&
    (file.type === "application/json" || file.name.endsWith(".jsonc"))
  ) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem("userConfig", JSON.stringify(data));
        alert("Settings uploaded successfully!");
        location.reload();
      } catch (error) {
        alert("Invalid JSON format.");
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid JSON/JSONC file.");
  }
}

defaultConfig = {
  widgets: {
    weather: {
      enabled: true,
      apiKey: "API_KEY",
      city_id: "CITY_ID",
      units: "metric",
    },
    dateTime: {
      enabled: true,
      format24Hour: true,
    },
  },

  searchProviders: ["duckduckgo", "google", "youtube"],

  bookmarkGroups: [
    {
      name: "Personal🏠",
      links: [
        { url: "https://www.gmail.com", name: "Gmail" },
        { url: "https://www.youtube.com", name: "YouTube" },
        { url: "https://chatgpt.com/", name: "ChatGPT" },
      ],
    },
    {
      name: "Social🌐",
      links: [
        { url: "https://www.twitter.com", name: "Twitter" },
        { url: "https://www.instagram.com", name: "Instagram" },
        { url: "https://www.reddit.com", name: "Reddit" },
        { url: "https://www.facebook.com", name: "Facebook" },
      ],
    },
    {
      name: "Entertainment🎬",
      links: [
        { url: "https://www.netflix.com", name: "Netflix" },
        { url: "https://www.primevideo.com", name: "Prime Video" },
        { url: "https://www.spotify.com", name: "Spotify" },
        { url: "https://www.twitch.tv", name: "Twitch" },
      ],
    },
  ],
};
