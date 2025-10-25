# Video Platform Backend API

This project provides backend APIs for user profile management and video platform functionalities, including uploading videos, liking, commenting, reporting, and subscriptions.

## Features

### User Profile

- Update user profile details (fullName)
- Upload user avatar and cover images (Cloudinary integration)
- Authentication required for profile updates

### Videos

- Upload videos and thumbnails
- Search videos with filters
- Get videos for home feed
- View individual videos
- Edit video details
- Delete videos
- Like/unlike videos
- Add comments and replies on videos
- Report inappropriate videos
- Subscribe/unsubscribe to channels

## Authentication

All protected routes require JWT-based authentication, enforced by the `verifyToken` middleware.

## File Uploads

File uploads are handled using `multer` with disk storage:

- User avatars and cover images
- Video files and thumbnails

Uploaded files are processed and stored on Cloudinary for media delivery.

## API Routes

### User Routes

- `PATCH /profile/update` — Update user profile with optional avatar and cover image upload

### Video Routes

- `GET /search` — Search videos (authenticated)
- `POST /upload` — Upload a video and thumbnail
- `GET /home` — Get videos for the home feed
- `GET /:id` — Get video details by ID
- `PUT /:id/edit` — Edit video details
- `DELETE /:id/delete-video` — Delete a video
- `POST /:videoId/like` — Like or unlike a video
- `POST /:videoId/comment` — Add a comment to a video
- `POST /comment/:commentId/reply` — Reply to a comment
- `POST /:videoId/report` — Report a video
- `POST /subscriber/:channelId` — Subscribe or unsubscribe from a channel

## Usage

1. Clone the repo
2. Install dependencies: `npm install`
3. Setup environment variables (Cloudinary keys, JWT secret, etc.)
4. Run the server: `npm start` or `nodemon src/index.js`

---

For detailed API specs and request formats, please refer to the API documentation (to be added).
