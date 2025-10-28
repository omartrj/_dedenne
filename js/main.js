let currentProvider = "";
let config = {};

// Define search providers
const providers = {
  duckduckgo: {
    name: "DuckDuckGo",
    placeholder: "DuckDuckGo, privacy matters!",
    getQuery: (terms) =>
      `https://duckduckgo.com/?q=${encodeURIComponent(terms.join(" "))}`,
  },
  google: {
    name: "Google",
    placeholder: "Google, meh...",
    getQuery: (terms) =>
      `https://www.google.com/search?q=${encodeURIComponent(terms.join(" "))}`,
  },
  wikipedia: {
    name: "Wikipedia",
    placeholder: "Wikipedia, the free encyclopedia",
    getQuery: (terms) =>
      `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
        terms.join(" ")
      )}`,
  },
  reddit: {
    name: "Reddit",
    placeholder: "Reddit, just Reddit",
    getQuery: (terms) =>
      `https://www.reddit.com/search/?q=${encodeURIComponent(terms.join(" "))}`,
  },
  pinterest: {
    name: "Pinterest",
    placeholder: "Pinterest, find your inspiration",
    getQuery: (terms) =>
      `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(
        terms.join(" ")
      )}`,
  },
  stackoverflow: {
    name: "Stack Overflow",
    placeholder: "Stack Overflow, where coders cry together",
    getQuery: (terms) =>
      `https://stackoverflow.com/search?q=${encodeURIComponent(
        terms.join(" ")
      )}`,
  },
  youtube: {
    name: "YouTube",
    placeholder: "YouTube, from tutorials to cat videos",
    getQuery: (terms) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        terms.join(" ")
      )}`,
  },
};

/**
 * Initializes the application by applying user settings and generating dynamic content.
 * La funzione è asincrona per attendere il caricamento della configurazione.
 */
async function dedenne() {
  await loadUserConfig();
  initializeBookmarks(config.bookmarkGroups);
  initializeProviders(config.searchProviders);
  initializeWidgets();
}

/**
 * Loads the user configuration by fetching '/config.json' (from volume mount).
 * Falls back to '/default_config.json' (from image) if the primary fetch fails.
 */
async function loadUserConfig() {
  try {
    // 1. Prova a caricare la configurazione utente da /config.json
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error(
        `HTTP error ${response.status}: Failed to fetch config.json`
      );
    }
    config = await response.json();
    console.log("Successfully loaded user config from /config.json");
  } catch (userConfigError) {
    // 2. Se fallisce, logga l'errore e prova a caricare la configurazione di default
    console.warn(
      `Could not load user config from /config.json. (${userConfigError.message}). Trying /default_config.json...`
    );

    try {
      const defaultResponse = await fetch("default_config.json");
      if (!defaultResponse.ok) {
        throw new Error(
          `HTTP error ${defaultResponse.status}: Failed to fetch default_config.json`
        );
      }
      config = await defaultResponse.json();
      console.log(
        "Successfully loaded fallback config from /default_config.json"
      );
    } catch (defaultConfigError) {
      // 3. Se falliscono entrambi, l'app non può funzionare.
      console.error(
        `FATAL: Could not load default config. (${defaultConfigError.message}). Dedenne will not load correctly.`
      );
      // Imposta una config vuota per evitare errori runtime
      config = {
        bookmarkGroups: [],
        searchProviders: [],
        widgets: { weather: { enabled: false }, dateTime: { enabled: false } },
      };
    }
  }
}

/**
 * Dynamically generates and initializes bookmark groups based on the configuration.
 * Each bookmark's favicon is fetched automatically using the DuckDuckGo favicon API.
 * @param {Array} bookmarkGroups - Array of bookmark group objects.
 */
function initializeBookmarks(bookmarkGroups) {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.innerHTML = ""; // Clear any existing bookmarks

  // Add accessible heading for screen readers
  const h2 = document.createElement("h2");
  h2.classList.add("sr-only");
  h2.textContent = "Bookmarks";
  bookmarksContainer.appendChild(h2);

  if (!bookmarkGroups) return; // Aggiunto controllo di sicurezza

  bookmarkGroups.forEach((group, index) => {
    const groupId = `bookmark-group-${index + 1}`;
    const bookmarkGroup = document.createElement("div");
    bookmarkGroup.classList.add("bookmark-group");

    // Group header (toggle button)
    const button = document.createElement("button");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-controls", groupId);
    button.setAttribute("onclick", "toggleBookmarkGroup(this)");
    button.textContent = group.name;
    bookmarkGroup.appendChild(button);

    // Group links
    const ul = document.createElement("ul");
    ul.id = groupId;

    group.links.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.url;

      // Automatically fetch favicon using DuckDuckGo's API
      let faviconUrl = `https://icons.duckduckgo.com/ip3/${
        new URL(link.url).hostname
      }.ico`;

      // Special case for GitHub favicon while using dark mode
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (link.url.includes("github.com") && isDarkMode) {
        faviconUrl =
          "https://github.githubassets.com/favicons/favicon-dark.svg";
      }

      a.innerHTML = `<img src="${faviconUrl}" class="favicon" alt="${link.name} favicon">${link.name}`;

      li.appendChild(a);
      ul.appendChild(li);
    });

    bookmarkGroup.appendChild(ul);
    bookmarksContainer.appendChild(bookmarkGroup);
  });
}

/**
 * Dynamically generates and initializes search engine provider buttons based on the configuration.
 * The first provider in the list is set as the default.
 * @param {Array} providerIds - Array of search engine provider IDs.
 */
function initializeProviders(providerIds) {
  const providersContainer = document.getElementById("providers");
  providersContainer.innerHTML = ""; // Clear any existing providers

  if (!providerIds || providerIds.length === 0) {
    // Aggiunto controllo di sicurezza
    document.getElementById("search-form").style.display = "none"; // Nasconde la ricerca
    return;
  }

  providerIds.forEach((providerId) => {
    if (!providers[providerId]) {
      // Controlla se il provider esiste
      console.warn(`Search provider "${providerId}" is not defined.`);
      return;
    }
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.id = providerId;
    button.classList.add("search-option");
    button.title = providers[providerId].name;
    button.onclick = () => selectProvider(providerId);

    const img = document.createElement("img");
    img.src = `assets/${providerId}.svg`;
    img.alt = providerId;
    img.width = 24;
    img.height = 24;

    button.appendChild(img);
    li.appendChild(button);
    providersContainer.appendChild(li);
  });

  // Set the first provider as the default
  selectProvider(providerIds[0]);
}

/**
 * Initializes the widgets (weather and date-time) based on the configuration.
 */
function initializeWidgets() {
  if (config.widgets?.weather?.enabled) {
    initializeWeatherWidget(config.widgets.weather);
  }

  if (config.widgets?.dateTime?.enabled) {
    initializeDateTimeWidget(config.widgets.dateTime);
  }
}

/**
 * Initializes the weather widget with the provided settings.
 * Fetches and displays weather data using the OpenWeatherMap API.
 * @param {Object} weatherConfig - Weather widget settings from the configuration.
 */
function initializeWeatherWidget(weatherConfig) {
  const { apiKey, cityId, unit } = weatherConfig;
  const weatherSection = document.getElementById("weather");

  // Ensure the API key and city ID are provided
  if (!apiKey || apiKey === "API_KEY" || !cityId || cityId === "CITY_ID") {
    console.error(
      "Weather widget is enabled, but API key or City ID is missing or not configured."
    );
    weatherSection.innerText = "Weather widget needs configuration.";
    return;
  }

  // Fetch weather data from OpenWeather API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${unit}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const { weather, main, name } = data;
      const temperature = Math.round(main.temp);
      const temperatureIcon = unit === "metric" ? "°C" : "°F";
      const weatherDescription = weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      weatherSection.innerHTML = `
            <p id="location">${name}</p>
            <p id="details" title="${temperature}°C">
                <img src="${icon}" alt="${weatherDescription} icon">
                ${weatherDescription}
                <span class="separator">|</span>
                ${temperature}${temperatureIcon}
            </p>
        `;
    })
    .catch((error) => {
      console.error(error);
      weatherSection.innerText = "Unable to load weather information.";
    });
}

/**
 * Initializes the date-time widget with the provided settings.
 * Displays the current date and time based on the user's preferences.
 * @param {Object} dateTimeConfig - Date-time widget settings from the configuration.
 */
function initializeDateTimeWidget(dateTimeConfig) {
  const { format24Hour } = dateTimeConfig;
  const dateTimeSection = document.getElementById("date-time");

  // Helper function to format the time
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (!format24Hour) {
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`; // 24-hour format
  }

  // Update the widget every second
  function updateDateTime() {
    const now = new Date();
    const dateString = now.toDateString();
    const timeString = formatTime(now);

    dateTimeSection.innerHTML = `
          <p id="date">${dateString}</p>
          <p id="time">${timeString}</p>
      `;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second
}

/**
 * Toggles the visibility of a bookmark group.
 * @param {HTMLButtonElement} button - The button element triggering the toggle.
 */
function toggleBookmarkGroup(button) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", !isExpanded);
  const group = document.getElementById(button.getAttribute("aria-controls"));
  if (group) {
    group.hidden = isExpanded;
  }
}

/**
 * Handles search form submission.
 * @param {Event} event - The submit event from the search form.
 */
function handleSearch(event) {
  event.preventDefault(); // Prevent default form submission
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    performSearch(query);
    // Clear the search input after submission
    document.getElementById("search-input").value = "";
  }
}

/**
 * Performs a search using the currently selected provider.
 * Opens the search results in a new tab.
 * @param {string} query - The search query entered by the user.
 */
function performSearch(query) {
  const terms = query.split(" ");
  const provider = providers[currentProvider];
  if (!provider) {
    console.error(`No provider selected or "${currentProvider}" is invalid.`);
    return;
  }
  const url = provider.getQuery(terms);
  //window.open(url, "_blank"); // Open search results in a new tab
  window.location = url; // Open search results in the same tab
}

/**
 * Updates the current search provider when a new one is selected.
 * Updates the UI and internal state to reflect the change.
 * @param {string} providerId - The ID of the provider to select.
 */
function selectProvider(providerId) {
  if (!providers[providerId]) {
    console.warn(
      `Attempted to select invalid provider: "${providerId}". Defaulting to none.`
    );
    currentProvider = "";
    document.getElementById("search-input").placeholder =
      "No search provider configured...";
    return;
  }
  currentProvider = providerId;

  // Toggle the selected state for search buttons
  const buttons = document.querySelectorAll(".search-option");
  buttons.forEach((button) => button.classList.remove("selected"));
  const selectedButton = document.getElementById(providerId);
  if (selectedButton) {
    selectedButton.classList.add("selected");
  }

  // Update the search input placeholder
  const searchInput = document.getElementById("search-input");
  searchInput.placeholder = providers[providerId].placeholder;

  // Focus on the search input after selecting a provider
  searchInput.focus();
}
