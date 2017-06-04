# Playtime

## Background
 
Every dog owner knows that the best way to tire his dog out is to let it play with other dogs. A tired dog is a happy dog. Playtime attempts to make it easier to coordinate playtimes by allowing users to follow each other's dogs. When taking your dog out, let the app know and it will automatically alert all your dog's friends, so they can meet up and hang out. Its Playtime, all the time.

## Functionality & MVP

With this application, users will be able to:

* Sign up and log in with Facebook and Google accounts
* Create, modify and destroy profiles for their dogs
* Accept and deny friend requests sent to their dogs from other dogs
* Search for, view and join parks to view which dogs play there
* Let their followers know when they will be taking their dog(s) to a park (this will include sending push notifications)

## Wireframes

[Loading View](./Docs/Wireframes/LoadingScreen.png)
[Login View](./Docs/Wireframes/Login.png)
[Dashboard View](./Docs/Wireframes/Dashboard.png)
[Create Playtime](./Docs/Wireframes/AddPlaytime.png)
[Parks View](./Docs/Wireframes/ParkView.png)
[Park Show View](./Docs/Wireframes/ParkShowView.png)
[Dog Show View](./Docs/Wireframes/DogShowView.png)
[User Profile](./Docs/Wireframes/UserProfileView.png)
[Add Dog Form](./Docs/Wireframes/AddDogView.png)
[Notifications View](./Docs/Wireframes/NotificationsView.png)

## Technologies & Technical Challenges

*Playtime* will be implemented in React-Native using the Expo SDK and Expo XDE for bundling and simulation. Our backend will use Firebase, and we will use Redux to manage state.

Although *Playtime* is in many ways an ambitious project - it includes several different tables within the [schema](./Docs/Schema.md), for example - we think that Expo will be an invaluable tool for both rapid development (it include useful extensions to the already comprehensive React-Native library) and for managing deployment and simulation (it allows for rapid app bundling for submission to the Apple Store, bypassing XCode completely).

The primary technical challenges will be:
 * Smooth ingtegration between React-Native and Firebase
 * Caching and loading dog images without slowing down page rendering substantially
 * Push notifications to alert users when a playtime will occur
 * Managing the sheer number of models - dogs, parks, playtimes, users, and joins tables between them - in a framework we're still not so used to (React-Native).

Luckily, there are countless tutorials on integrating React-Native with Expo and Firebase, and Expo has a thriving community on Slack and their forums which we can turn to should we need it.

## Things We Accomplished This Weekend

1. Studied React-Native, Expo and Firebase
2. Studied how to integrate React-Native, Expo and Firebase with Facebook and Google auth
3. Investigated alternative technologies, trying out and rejecting several (`react-native-fbsdk`, for example).
4. Create a basic skeleton of the project and map out workflow for the coming week.

## Group Members & Work Breakdown

Our group consists of two members, Lucas Amaral and Ian Hoffman.

Lucas' primary responsibilities will be:
* Facebook Auth
* Dogs CRUD
* DogFollows
* Push Notifications
* Splash Page

Ian's primary responsibilites will be:
* Google Auth
* Parks Search / Seeds
* ParkFollows
* CRUD for Walks
* Production Readme

## Implementation Timeline

**Day 1** Set up basic dashboard and facebook/google authentication using firebase and expo's facebook and google auth components. By the end of the day, we will have:
* An app that we can log into from the simulator

**Day 2** Create user profile and allow users to create and edit their dogs. By the end of the day, we will have:
* The ability to CRUD dogs on our app.
* Basic show pages for dogs.

**Day 3** Create parks search page and parks index. Write a basic script to seed the database with parks from the google API. By the end of the day, we will have:
* Working search functionality for parks.
* A database at least partially seeded with parks.
* Users that can follow parks.

**Day 4** Enable users to follow parks and dogs. Create show page for parks with all the dogs that go to them. By the end of the day, we will have:
* Show pages for parks
* Working follow/unfollow functionality for parks and dogs

**Day 5** CRUD for walks and push notifications. Create notifications page. By the end of the day, we will have:
* A working notifications page where users can approve and deny follows requests
* Functional push notifications

**Day 6** Create loading screen. Preload cached assets. Put finishing touches on app. Deploy. By the end of the day, we will have:
* An app we could use on our phones.

**Day 7** Write production Readme and create website. By the end of the day, we will have:
* A website showing off our pretty app.

## Plan for Getting Users and Reviews

We will go to dog parks and put up flyers; we will also convince our friends who are dog-owners to try our app.
