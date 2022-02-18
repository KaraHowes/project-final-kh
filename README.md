# Final Project

This project was built for the Final project of the Technigo Frontend Development Bootcamp. It was built during 4 weeks, by Kara Howes.

MODELS:

- Member
- Bag
- Inspiration


(REST-Ful) ENDPOINTS:

 For members: 
- /signup - POST request to allow a user to register
- /signin - POST request allows a member to sign in, with an access token as Header
- /members - GET request allows access to all members. Authentication required.
- /member/:memberId - GET request - necessary for profile page. Authentication required.

For bags:

- /bags - GET and POST request, allows members to receive and send data. Authentication required.
- /bag/:_id GET request - to access information on one bag
- /deleteBag/:_id - DELETE request, autenticated user can delete a bag
- /searchBags - a GET request, authenticated user can search the bags database using queries, to return a particular coloured-bag from a partilcular Location.
- /bags/:memberId - GET request, a member can view the bag they have added to the system
- /reserveBag - POST request, an aunthenticated member can reserve a bag. This is confirmed by email to the recipient

For affirmations:

- /inspiration - GET request which returns one random affirmation.

## The problem

The idea was to create a resource whereby authenticated users could access the bags in the database, or indeed add to the bags collection. Therefore it is necessary for the User to create an account and therefore become a Thek-Friend. Depending on the users Status (donor or recipient), their profile page (and therefore what they can access) differs:

 - A donor can add a bag to the collection, view any bags they have added and view all of the bags in the collection.
 - A recipient can pick their bag from the collection and view all bags. 

 In addition, I wanted to build a child-appropriate affirmation generator. I hard-coded the json data, seeded the database and built a function for any user (authentication not required) to access the affirmations.
 
 The Thek-Friends website includes and Introduction page, About section, Register/Log-in page and an Inspiration/Affirmation page. Navigation to these pages is by useNavigate from the React-Router-Dom package.

 The BE of this project was built using Node.js, Mongoose and a few libraries (Nodemailer, crypto) The Database was built using MongoDB.
 The FE was built using React, Redux and various libraries (StyledComponents, Lottie Animations, Sweetalert, Moment). 

The accessibility of the website was checked using the WAVE Chrome extension, which checked the HTML of the website.

I would like to thank Amanda Tilly for allowing me too use her Hamburger/Menu reuseable component, Linnea Isebrink for introducing me to the SweetAlert library and to all of my fellow Hippos for their help, advice and support throughout the Bootcamp.

NB: I have just realised that occassionally the email function doesn't fully work because my email provider thinks I am spamming people. The code and the logic are correct, it's just an issue with the email provider I am using.


## View it live

https://kh-thek-friends.herokuapp.com/

https://thek-friends.netlify.app/




