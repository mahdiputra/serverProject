ALTER TABLE Activity_People DROP FOREIGN KEY FKActivity_P728017;
ALTER TABLE Activity_People DROP FOREIGN KEY FKActivity_P412206;
ALTER TABLE Friends DROP FOREIGN KEY FKFriends685562;
ALTER TABLE Friends DROP FOREIGN KEY FKFriends329311;
ALTER TABLE Comment DROP FOREIGN KEY FKComment165113;
ALTER TABLE Activity DROP FOREIGN KEY FKActivity757825;
ALTER TABLE Comment DROP FOREIGN KEY FKComment849301;
DROP TABLE IF EXISTS Activity;
DROP TABLE IF EXISTS Activity_People;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Friends;
DROP TABLE IF EXISTS People;

