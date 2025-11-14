# loopX Video sharing platform

LoopX is a full-stack video sharing platform built with the MERN stack. Users can sign up, log in, watch, like, comment, report videos, and subscribe to channels. Admins can monitor reported videos, manage users, and maintain platform integrity.


## Features
  ### User Features
    - Sign up and login with email
    - Update profile details (fullName, avatar, coverImage)
    - Uplaod avatar and cover Image(Cloudinary Integration)
    - Watch videos and view home feed
    - Like/Unlike videos
    - Comment and reply on vidoes
    - Report inapproiate videos
    - Subscibe/unSubscibe to channels
    - View Likes and commented Videos

   ### Admin Feataures
   - View total count of videos, users and search users
   - View reported videos with report count
   - See who reported videos ad reasons
   - Delete inappropriate videsos
   - Block or delete users

## Tech Stack uses:

  ### backend

      - BCRYPT for password hashed
      - CLOUDINARY for files
      - COOKIE-PARSER for tokens
      - CORS
      - DOTENV
      - EXPRESS
      - JSONWEBTOKEN
      - MONGOOSE & Mongoose
      - MONGOOSE-AGGREGATE-PAGINATE-V2
      - NODEJS
      - MULTER

### frontend

      - REACT with Vite
      - REACT-ROUTER-DOM
      - AXIOS
      - REACT-ICONS
      - REACT-TOASTIFY
      - TAILWINDCSS for styling

Backend API Routes
User Routes

PATCH /profile/update — Update user profile (avatar & cover optional)

Video Routes

GET /search — Search videos (authenticated)

POST /upload — Upload a video and thumbnail

GET /home — Get videos for home feed

GET /:id — Get video details by ID

PUT /:id/edit — Edit video details

DELETE /:id/delete-video — Delete a video

POST /:videoId/like — Like or unlike a video

POST /:videoId/comment — Add a comment

POST /comment/:commentId/reply — Reply to a comment

POST /:videoId/report — Report a video

POST /subscriber/:channelId — Subscribe/unsubscribe to a channel

![Login Page](../Screenshot%202025-11-14%20103838.png)
![Home Page](../Screenshot%202025-11-14%20182151.png)
![Watch Page](../Screenshot%202025-11-14%20103921.png)
![Like Videos](../Screenshot%202025-11-14%20105059.png)
![Comment Videos](../Screenshot%202025-11-14%20105116.png)
![My Profile Page](../Screenshot%202025-11-14%20104741.png)
![Upload video Page](../Screenshot%202025-11-14%20105041.png)
![Subscibed Creators](../Screenshot%202025-11-14%20105200.png)
![My Subscribers](../Screenshot%202025-11-14%20105217.png)
