# Chrome Extensions

A collection of utility extensions for the Chrome browser, designed for productivity and ease of use.

## Extensions

### [Save Largest Image](./imagesave/)
Automatically identifies and downloads the largest image on the current page.

- **Key Feature**: One-click or shortcut-based image saving with smart filtering.
- **Shortcuts**: `Ctrl+Shift+S` (Win/Linux) / `Cmd+Shift+S` (Mac).
- **Customization**: Highly configurable filename patterns and size filters.
- **Version**: Manifest V3.

### [Incrementor (url-inc)](./incr_url/)
Increments the last number in the URL, making it easy to browse through paginated content.

- **Key Feature**: Seamless navigation through numbered URLs (e.g., changing `page/1` to `page/2`).
- **Shortcuts**: `Ctrl+Alt-Right` to increment, `Ctrl+Alt-Left` to decrement.
- **Customization**: Advanced regex support for matching specific parts of the URL.
- **Version**: Manifest V2 (Legacy).

## Installation

1. Download or clone this repository to your local machine.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top right.
4. Click the **Load unpacked** button.
5. Select the folder for the extension you want to install (`imagesave` or `incr_url`).

## Compatibility

These extensions are compatible with Google Chrome and other Chromium-based browsers (Edge, Brave, etc.). While `Incrementor` uses the legacy Manifest V2, `Save Largest Image` has been updated to Manifest V3.

## License

See the [LICENSE](LICENSE) file for details.
