# Audio-Video-Converter
Simple Script NodeJs To Converts Audio or Video witH `ffmpeg`

## About

This script can converts Audio/Video Format to another Format,

- supportedFormats
  
```JavaScript
const supportedFormats = {
    "Video Formats": ["MP4", "AVI", "MKV", "MOV", "WMV", "FLV", "3GP", "WEBM", "MPEG", "VOB", "DAT", "TS"],
    "Audio Formats": ["MP3", "WAV", "AAC", "OGG", "FLAC", "AC3", "WMA"],
};
```
### Example
- VIDEO
  - MP4 To AVI
  - MP4 To WEBM
  - etc.
- AUDIO
  - MP3 To AAC
  - etc
- Video To Audio
  - MP4 To MP3
  - etc.

## HOW TO USE

### Install `ffmpeg` First
* MacOS with Brew
  ```bash
  brew install ffmpeg
  ```
* Installing FFmpeg on Linux
  
1\. **Update Package Lists:**

-   Ensure your package lists are up-to-date:

    Bash

    ```
    sudo apt update  # For Debian-based distros (Ubuntu, Mint, etc.)
    sudo dnf update  # For Fedora-based distros
    sudo pacman -Syu  # For Arch-based distros

    ```

 2\. **Install FFmpeg:**

-   Use your distribution's package manager to install FFmpeg:

    Bash

    ```
    sudo apt install ffmpeg  # For Debian-based distros
    sudo dnf install ffmpeg  # For Fedora-based distros
    sudo pacman -S ffmpeg  # For Arch-based distros

    ```
 3\. **Verify Installation:**

-   Check the FFmpeg version:

    Bash

    ```
    ffmpeg -version

    ```
-   If installed correctly, you'll see the FFmpeg version information.

 ### Download the Script with git

 ```bash
 git clone https://github.com/caturmahdialfurqon/Audio-Video-Converter.git
 ```
  * Install Requirements/Dependensis NodeJs
```bash
npm install readline child_process
```
 * Run the Script
<img src="Asset/CleanShot 2024-10-16 at 09.03.21.gif" width="600">
