# Welcome to Dishcover!

Welcome to **Dishcover**, your go-to platform for culinary exploration and creativity! **Dishcover** is a web app designed to bring together food enthusiasts from around the world, allowing them to share, discover, and savor delightful homemade dishes.

:cherries: Have fun! :carrot:

## Screenshots

**Homepage**

<img src="/src/assets/images/homepage.png">

**Login Page**

<img src="/src/assets/images/login.png">

**Create a Recipe**

<img src="/src/assets/images/createrecipe.png">

**View Recipes**

<img src="/src/assets/images/recipe.png">

**View Reviews**

<img src="/src/assets/images/review.png">

## Technologies Used

**Frontend**: JavaScript, CSS, HTML, GitHub, Node.js, React, React Router, Vite, Tailwind CSS/DaisyUI, Splide, CryptoJS

**Backend**: Node.js, Express, Mongoose, MongoDB, JSON Web Token, Cors
    
**Client-Side Storage**: localStorage (for token storage)

## Getting Started

Web link: https://dishcoveries.onrender.com/

Repos:
* Frontend: https://github.com/xsijin/Dishcover
* Backend: https://github.com/Haozhi415/GA_P3_backend 

Planning:
* [Miro Board](https://miro.com/app/board/uXjVN9wiZ8c=/)
* [Figma Wireframe](https://www.figma.com/file/jmQyhu4rRCjEOahmJ2iO0Q/Project-3?type=design&mode=design&t=FHnU6fG21cagAsb2-0)
* [Trello Board](https://trello.com/b/dccanYjz/project3-rox)

## Authentication Flow

JSON Web Tokens (JWT) is used for user authentication. When a user successfully logs in, a JWT is issued, and subsequent requests include the JWT to authenticate the user.

Data flow diagram:

<img src="/src/assets/images/data_flow_diagram.png">

## User Types, Authorization & Backend Protection

> [!IMPORTANT]
> | Authorization     | Public         | Logged in User | Admin          | Backend Protection |
> | ----------------- | --------------| -------------- | -------------- | -------------- |
> | Read Recipes      | ✔             | ✔             | ✔              |                |
> | Create Recipes    |               | ✔              | ✔              | ✔              |
> | Update Recipes    |               | ✔ (own)        | ✔ (all)        | ✔             |
> | Delete Recipes    |               | ✔ (own)        | ✔ (all)        | ✔             |
> | Read Reviews      | ✔             | ✔             | ✔              |                |
> | Create Reviews    |               | ✔              | ✔              | ✔              |
> | Update Reviews    |               | ✔ (own)        | ✔ (all)        | ✔              |
> | Delete Reviews    |               | ✔ (own)        | ✔ (all)        | ✔              |
> | Read User Profile | ✔             | ✔             | ✔              |                |
> | Create User (Sign up) | ✔         |                |                |                 |
> | Update User Profile  |             | ✔ (own)       | ✔ (all)        | ✔             |
> | Delete User  |                     | ✔ (own)       | ✔ (all)        | ✔             |


Reason for protection: to prevent unauthorized users from meddling with API calls using tools like Postman or other API clients.

## Entity-Relationship-Diagram / DAOs

<img src="/src/assets/images/ERD.png">

## Next Steps

- [ ] Login-ed users can save a recipe to favourites
- [ ] Users can have a checklist of ingredients and add to grocery list
- [ ] Users can search for other users' profile
- [ ] Users can filter through search results (recipe name, tags, ingredients, etc)
- [ ] Users can see other related recipes for each recipe

## Code Sharing

**Mongoose Model: Get recipes**

<img src="/src/assets/images/model.png">

**Controller: Get recipes**

<img src="/src/assets/images/controller.png">

**Favorite React Component**

Our favourite component was the star rating feature which takes in the rating prop from fetched reviews to render as stars.

<img src="/src/assets/images/starcode.png">

Adding this code below now renders stars!

```
<StarRating star={review.rating} />
```

Sample:

<img src="/src/assets/images/starrating.png">

## Key Challenges / Learning / Takeaways

1. Authentication & JWT
2. Check git branch first before doing any work! This will save you headaches down the road trying to change commits to a different branch.
3. Git pull often to reduce the chances of a merge conflict.
4. Try to ensure all pull requests are approved first before making new changes to reduce the chances of a merge conflict.
5. Communicate with team members which file we are working on to reduce the chances of a merge conflict.

## Authors

- [@chunxtan](https://github.com/chunxtan)
- [@Haozhi415](https://github.com/Haozhi415)
- [@xsijin](https://github.com/xsijin)

## Resources

- [Render](https://render.com/) - Deployment of Frontend & Backend
- [DaisyUI](https://daisyui.com/) - Component library to style website
- [Miro](https://miro.com) - Task and project management platform
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
- [Mob](https://www.mob.co.uk/) - Web inspiration / recipe information to populate data
- [Allrecipes](https://www.allrecipes.com/) - Web inspiration / recipe information to populate data
