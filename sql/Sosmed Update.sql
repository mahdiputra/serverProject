UPDATE Activity SET 
  PeopleID = ?, 
  text = ?, 
  created_at = ?, 
  created_by = ?, 
  updated_at = ?, 
  updated_by = ?, 
  is_active = ?, 
  likes = ? 
WHERE
  ID = ?;
UPDATE Activity_People SET 
   
WHERE
  ActivityID = ? AND PeopleID = ?;
UPDATE Comment SET 
  ActivityID = ?, 
  PeopleID = ?, 
  text = ?, 
  is_active = ?, 
  created_at = ?, 
  created_by = ?, 
  updated_at = ?, 
  updated_by = ? 
WHERE
  ID = ?;
UPDATE Friends SET 
   
WHERE
  PeopleID = ? AND PeopleID2 = ?;
UPDATE People SET 
  first_name = ?, 
  last_name = ?, 
  birth_date = ?, 
  address = ?, 
  email = ?, 
  password = ?, 
  created_at = ?, 
  created_by = ?, 
  updated_at = ?, 
  updated_by = ?, 
  is_active = ?, 
  image_profile = ?, 
  image_background = ? 
WHERE
  ID = ?;

