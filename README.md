![_dedenne](assets/dedenne.png)

> **_dedenne,** _n_. A customizable and semantic start page for your browser, built with HTML, CSS, and a sprinkle of JavaScript.

**_dedenne's** offers users a customizable browser start page featuring organized bookmarks and configurable search options. The monospace font is ol' [Fira Code](https://fonts.google.com/specimen/Fira+Code) font loaded via [Google Fonts](https://fonts.google.com). Icons are [inline SVGs](https://css-tricks.com/pretty-good-svg-icon-system/), [DuckDuckGo's API](https://icons.duckduckgo.com/ip3/duckduckgo.com.ico) delivers the favicons, and [OpenWeather's API](https://openweathermap.org) provides the weather forecast and icons. Vanilla JavaScript and CSS handle all interactivity.

**Public Demo:** You can see a live (non-configurable) demo of _dedenne_  [here](https://omartrj.github.io/_dedenne/). This version will only load the default configuration.

### ✨ **Features in _dedenne**
- **Customizable Search Engines**: You can now choose between different search engines to use for your searches, including DuckDuckGo, Youtube, Pinterest, and more (full list [here](#supported-providers)).
- **Organized Bookmarks**: You can now organize your bookmarks into categories with collapsible sections.
- **Weather Information**: Get real-time weather updates for your location.
- **Date & Time Display**: View the current date and time in either 12-hour or 24-hour format.
- **Light and Dark Modes**: Switch between light and dark themes based on your preference or system settings.

### 🚀 **How to use (Self-Hosting with Docker)**
The primary installation method is via Docker Compose. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
1. Clone or download this repository:
    ```bash
    git clone https://github.com/omartrj/_dedenne.git
    cd _dedenne
   ```
2. Create your configuration file:
    ```bash
    # Copy the default configuration as a starting point
    cp default_config.json config.json
    ```
3. Edit the configuration file to your liking.
4. Launch with Docker Compose:
    ```bash
    docker-compose up -d
    ```
5. Open your browser and navigate to `http://localhost:8080` to see your new start page!

You can change both the configuration file path and the port by modifying the `DEDENNE_CONFIG_PATH` and `DEDENNE_PORT` variables in the `.env` file. 

```bash
# Copy the example environment file
cp .env.example .env
```

**Alternatively**, you can fork this repository and host the page on your own server or GitHub Pages.

### ⚙️ **Configuration overview**
The configuration file is a JSON object that allows you to customize the start page to your liking. Here's an overview of the available options:

**Weather:** displays the current weather in your location. You will need to generate your own OpenWeather API key and city ID. Available units are `metric` and `imperial`.

⚠️ **You will need to generate your own OpenWeather API key!**
1. [Register for an OpenWeather account](https://home.openweathermap.org/users/sign_up) (OpenWeather will generate a default API key)
2. Sign in and navigate to Username > API keys and copy the key
3. Paste the key into `apiKey` in the configuration file.

**How to update your city**
1. Find your city using [OpenWeather's search](https://openweathermap.org/find)
2. Copy the city ID from the end of the URL
    > `https://openweathermap.org/city/1850147` 🠆 `1850147`
3. Paste the city ID into `cityId` in the configuration file.

**Date & Time:** displays the current date and time. You can choose between 12-hour and 24-hour formats.

**Search Providers:** <a id=supported-providers></a>At the moment DuckDuckGo, Google, YouTube, Reddit, Wikipedia, Pinterest, Stack Overflow are the supported search engines. The first provider in the list will be the default search engine.
```json
"searchProviders": ["google", "duckduckgo", "youtube", "reddit", "wikipedia", "pinterest", "stackoverflow"]
```

**Bookmark Groups:** each group can have a title and a list of bookmarks. Each bookmark should have a `name` and a `url`.

### 🖼️ Previews

![_dedenne's dark mode](https://imgur.com/wJEOZPp.jpg)

![_dedenne's light mode](https://imgur.com/B1U6hEO.jpg)




 


