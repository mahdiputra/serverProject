CREATE TABLE Activity (
  ID         int(10) NOT NULL, 
  PeopleID   int(10) NOT NULL, 
  text       varchar(255), 
  created_at timestamp NULL, 
  created_by int(10), 
  updated_at timestamp NULL, 
  updated_by int(10), 
  is_active  int(1), 
  likes      longtext, 
  PRIMARY KEY (ID));
CREATE TABLE Activity_People (
  ActivityID int(10) NOT NULL, 
  PeopleID   int(10) NOT NULL, 
  PRIMARY KEY (ActivityID, 
  PeopleID));
CREATE TABLE Comment (
  ID         int(10) NOT NULL, 
  ActivityID int(10) NOT NULL, 
  PeopleID   int(10) NOT NULL, 
  text       varchar(255), 
  is_active  int(1), 
  created_at timestamp NULL, 
  created_by int(10), 
  updated_at timestamp NULL, 
  updated_by int(10), 
  PRIMARY KEY (ID));
CREATE TABLE Friends (
  PeopleID  int(10) NOT NULL, 
  PeopleID2 int(10) NOT NULL, 
  PRIMARY KEY (PeopleID, 
  PeopleID2));
CREATE TABLE People (
  ID               int(10) NOT NULL CHECK(ID), 
  first_name       varchar(20), 
  last_name        varchar(20), 
  birth_date       date, 
  address          varchar(50), 
  email            varchar(50), 
  password         varchar(255), 
  created_at       timestamp NULL, 
  created_by       int(10), 
  updated_at       timestamp NULL, 
  updated_by       int(10), 
  is_active        int(1), 
  image_profile    varchar(255) DEFAULT 'default_profile.png', 
  image_background varchar(255) DEFAULT 'default_background.png', 
  PRIMARY KEY (ID));
ALTER TABLE People MODIFY ID INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE Activity MODIFY ID INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE Comment MODIFY ID INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE Activity_People ADD CONSTRAINT FKActivity_P728017 FOREIGN KEY (PeopleID) REFERENCES People (ID);
ALTER TABLE Activity_People ADD CONSTRAINT FKActivity_P412206 FOREIGN KEY (ActivityID) REFERENCES Activity (ID);
ALTER TABLE Friends ADD CONSTRAINT FKFriends685562 FOREIGN KEY (PeopleID2) REFERENCES People (ID);
ALTER TABLE Friends ADD CONSTRAINT FKFriends329311 FOREIGN KEY (PeopleID) REFERENCES People (ID);
ALTER TABLE Comment ADD CONSTRAINT FKComment165113 FOREIGN KEY (PeopleID) REFERENCES People (ID);
ALTER TABLE Activity ADD CONSTRAINT FKActivity757825 FOREIGN KEY (PeopleID) REFERENCES People (ID);
ALTER TABLE Comment ADD CONSTRAINT FKComment849301 FOREIGN KEY (ActivityID) REFERENCES Activity (ID);

