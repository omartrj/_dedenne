const config = {
  defaultProvider: "duckduckgo", // 'duckduckgo', 'google', 'wikipedia', 'reddit'

  // Settings for the Weather Widget
  weather: {
    enabled: true,
    apiKey: 'API_KEY', // API key for OpenWeatherMap
    cityId: '1850147', // City ID
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
      name: "General🏠",
      links: [
        { url: "https://www.gmail.com", name: "Gmail" },
        { url: "https://www.youtube.com", name: "YouTube" },
        { url: "https://www.reddit.com", name: "Reddit" }
      ],
    },
    {
      name: "Development💻",
      links: [
        { url: "https://www.github.com", name: "GitHub" },
        { url: "https://stackoverflow.com", name: "Stack Overflow" },
        { url: "https://www.codepen.io", name: "CodePen" },
        { url: "https://www.w3schools.com", name: "W3Schools" }
      ],
    },
    {
      name: "Entertainment🎮",
      links: [
        { url: "https://www.netflix.com", name: "Netflix" },
        { url: "https://www.spotify.com", name: "Spotify" },
        { url: "https://www.twitch.tv", name: "Twitch" },
        { url: "https://www.pinterest.com", name: "Pinterest" },
        { url: "https://www.instagram.com", name: "Instagram" }
      ],
    },
    {
      name: "Shopping🛍️",
      links: [
        { url: "https://www.amazon.com", name: "Amazon" },
        { url: "https://www.ebay.com", name: "eBay" },
        { url: "https://www.aliexpress.com", name: "AliExpress" }
      ],
    }
  ],
};
