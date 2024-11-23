const config = {
  // Settings for the Weather Widget
  weather: {
    enabled: true,
    apiKey: '738ec4e4407ec72b9e52b171922877eb', // API key for OpenWeatherMap
    cityId: '6542125', // City ID
    unit: 'metric', // 'metric' (Celsius), 'imperial' (Fahrenheit)
  },

  // Settings for the Date-Time Widget
  dateTime: {
    enabled: true,
    format24Hour: true, // Use 24-hour format (true) or 12-hour format (false)
  },

  // List of search engine providers
  // Available providers: 'duckduckgo', 'google', 'wikipedia', 'reddit', 'pinterest', 'stackoverflow', 'youtube'
  // The first provider in the list will be used as the default search engine
  providers: [
    'duckduckgo',
    'reddit',
    'pinterest',
    'youtube',
    // 'google',
    // 'wikipedia',
    // 'stackoverflow
  ],

  // Bookmark groups with their respective links.
  bookmarks: [
    {
      name: "Personal🏠",
      links: [
        { url: "https://www.gmail.com", name: "Gmail" },
        { url: "https://www.youtube.com", name: "YouTube" },
        { url: "https://www.amazon.com", name: "Amazon" },
        { url: "https://chatgpt.com/", name: "ChatGPT" }
      ],
    },
    {
      name: "University🎓",
      links: [
        { url: "https://unistudium.unipg.it/unistudium/login/index.php", name: "Unistudium" },
        { url: "https://outlook.office.com/mail/?actSwt=true", name: "Outlook" },
        { url: "https://unipg.esse3.cineca.it/", name: "SOL-UniPG" },
      ],
    },
    {
      name: "Piracy🏴‍☠️",
      links: [
        { url: "https://sci-hub.se/", name: "Sci-Hub" },
        { url: "https://www.libgen.is/", name: "LibGen" },
        { url: "https://thepiratebay.org/", name: "ThePirateBay" },
        { url: "https://totalsportek.io/", name: "TotalSportek" }
      ],
    },
    {
      name: "Development💻",
      links: [
        { url: "https://www.github.com", name: "GitHub" },
        { url: "https://www.npmjs.com", name: "npm" },
        { url: "https://wiki.archlinux.org/", name: "ArchWiki" },
      ],
    },
  ],
};
