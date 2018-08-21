DELETE FROM Activity 
  WHERE ID = ?;
DELETE FROM Activity_People 
  WHERE ActivityID = ? AND PeopleID = ?;
DELETE FROM Comment 
  WHERE ID = ?;
DELETE FROM Friends 
  WHERE PeopleID = ? AND PeopleID2 = ?;
DELETE FROM People 
  WHERE ID = ?;

