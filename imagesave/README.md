# Save Largest Image

A Chrome extension that saves the largest image on a page with a keyboard shortcut.

## Features

- **Quick Save**: Automatically finds and saves the largest image on the current web page.
- **Keyboard Shortcut**: Use `Ctrl+Shift+S` (Windows/Linux) or `Command+Shift+S` (Mac) to trigger the save action.
- **Customizable Filtering**: Set minimum and maximum width/height constraints for images in the options.
- **Flexible Naming**: Customize the saved file name using placeholders:
  - `{host}`: Website host name
  - `{title}`: Website title
  - `{name}`: Original image file name
  - `{####}`: Sequential numbering (e.g., `####` for 4 digits)
- **Success Notifications**: Configure popups that can automatically close or require a click.
- **Audio Feedback**: Includes optional sound effects for successful or failed downloads.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `imagesave` directory.

## Configuration

Right-click the extension icon and select **Options** to customize:
- Image size thresholds.
- Filename formatting and numbering start/step.
- Popup behavior after a successful download.

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `storage`, `activeTab`, `downloads`, `scripting`.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
