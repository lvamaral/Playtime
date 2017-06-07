* Dogs
  * dogId
    * name
    * breed
    * imgUrl
    * age
    * ownerName


* Parks
  * parkId
    * name
    * address
    * lat
    * lng
    * photoUrl
    * dogs
      * dogId
      * dogId
      * etc
    * users
      * uid
      * uid
      * etc



* Users
  * uid
    * name
    * dogs
      * dogId
      * dogId
      * etc
    * parks
      * parkId
      * parkId
      * etc
    * followedDogs
      * dogId
      * dogId
      * etc



* Playtimes
  * playId
    * dogId
    * parkId  
    * start
    * end
