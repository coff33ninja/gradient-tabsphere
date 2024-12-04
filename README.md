# WEBLIB - Your Self-Hosted Services Hub

A modern web application for managing and accessing your self-hosted services. WEBLIB provides a centralized dashboard for various services like Sonarr, Radarr, Prowlarr, and more.

## Features 🌟

- **Service Management**: 
  - Easily manage your self-hosted services
  - Integration with popular services:
    - Media Management: Sonarr, Radarr, Lidarr
    - Download Clients: qBittorrent, Transmission, Deluge
    - Indexers: Prowlarr, Jackett
    - Media Servers: Plex, Jellyfin, Emby
    - Subtitle Management: Bazarr
    - Request Management: Overseerr, Ombi
- **Custom Icons**: Support for custom service icons (authenticated users only)
- **Responsive Design**: 
  - Works seamlessly on desktop and mobile devices
  - Mobile-friendly navigation with hamburger menu
  - Adaptive category view with back navigation
- **Dark Mode**: Built-in dark mode support
- **Authentication**: 
  - Secure access to your services
  - Role-based access control:
    - Viewer: Basic access to view services
    - Moderator: Can add and manage content
    - Admin: Full system control
- **Category Management**: 
  - Organize links into categories
  - Add new categories on the fly
  - Mobile-optimized category navigation
- **Link Management**:
  - Add links directly within categories
  - Automatic metadata scraping
  - Custom icon support
  - Edit and update link details
- **Search Functionality**:
  - Quick search across all services
  - Filter by categories
  - Real-time search results
- **API Integration**:
  - Support for service APIs
  - Automatic service discovery
  - Secure credential storage
- **Home Page Customization**: Authenticated users can customize the home page content

## Authentication Features 🔐

The following features require authentication:
- Managing and configuring services
- Adding custom service icons
- Adding and editing categories
- Managing links within categories
- Editing home page content
- Accessing protected services

## Custom Icons 🎨

Authenticated users can add custom icons for their services by following these guidelines:

1. Create a folder named `custom-icons` in your project root
2. Name your icons using the service name: `{service-name}.png` (e.g., `sonarr.png`)
3. Recommended icon specifications:
   - Format: PNG or SVG
   - Size: 32x32px or 64x64px
   - Background: Transparent

## Home Page 🏠

The home page features:
- Responsive category navigation
- Mobile-friendly interface with back navigation
- Organized link display within categories
- Quick access to frequently used services
- Curated list of useful websites and tools for:
  - Developers
  - Designers
  - Self-hosting enthusiasts
  - Learning resources
  - Productivity tools

Note: Editing the home page content is restricted to authenticated users.

## Contribute 🚀

WEBLIB is an open community project!  
1. Suggest new websites by opening an [issue](https://github.com/coff33ninja/WEBLIB/issues)
2. Submit a pull request with your additions or improvements
3. Share your custom icons with the community
4. Contribute to category organization

## Getting Started 🏁

1. Clone the repository
2. Install dependencies: `npm install`
3. Create an account and authenticate
4. Configure your services in the dashboard
5. Add custom icons (optional)
6. Start using WEBLIB!

## Stay Updated 📰
Bookmark this page and check back regularly for new updates.  

---

Made with ❤️ by [coff33ninja](https://github.com/coff33ninja)