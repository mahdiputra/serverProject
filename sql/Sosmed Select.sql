SELECT ID, PeopleID, text, created_at, created_by, updated_at, updated_by, is_active, likes 
  FROM Activity;
SELECT ActivityID, PeopleID 
  FROM Activity_People;
SELECT ID, ActivityID, PeopleID, text, is_active, created_at, created_by, updated_at, updated_by 
  FROM Comment;
SELECT PeopleID, PeopleID2 
  FROM Friends;
SELECT ID, first_name, last_name, birth_date, address, email, password, created_at, created_by, updated_at, updated_by, is_active, image_profile, image_background 
  FROM People;

