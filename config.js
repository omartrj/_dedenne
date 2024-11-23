const config = {
  defaultProvider: "duckduckgo", // 'duckduckgo', 'google', 'wikipedia', 'reddit'

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
        { url: "https://unipg.esse3.cineca.it/auth/studente/HomePageStudente.do", name: "SOL-UniPG" },
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
