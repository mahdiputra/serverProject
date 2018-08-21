# API
Login



Users
  - GET `/users/` Get all users (√)
  - GET  `/users/:userID` Get one users (√)
  - POST `/users/` Add users (√)
  - POST `/users/:userID/update` Update users (√)
  - GET `/:userID/friends` Get all friend (√)
  - POST `/users/:userID/follow` Follow users (√)
  - POST `/users/:userID/unfollow` Unfolow users (√)

Acivity
  - GET `/` Get All Activity (√)
  - POST `/` Add Activity (√)
  - GET `/:activityID/view` Get one Activity by ID (√)
  - GET `/:activityID/comment` List coment base on activity ID (√)
  - POST `/:activityID/comment` Add coment in activity (√)
  - GET `/:activityID/like` List user like this activity (√)
  - POST `/:activityID/like` Add like in activity
  - POST `/:activityID/unlike` Remove user like in activty 