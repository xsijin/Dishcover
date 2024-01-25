# Welcome to Dishcover!

Welcome to **Dishcover**, your go-to platform for culinary exploration and creativity! **Dishcover** is a web app designed to bring together food enthusiasts from around the world, allowing them to share, discover, and savor delightful homemade dishes.

:cherries: Have fun! :carrot:

## Screenshots

Enter App's landing page and any other screenshots of interest

## Technologies Used

JavaScript, CSS, HTML, GitHub, React, React Router, Vite, Tailwind/[DaisyUI](https://daisyui.com/), Mongoose, Express, Crypto, SplideJS/React-Splide

localStorage to store token

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

Data flow diagram:

<img src="/assets/images/data_flow_diagram.png">

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
> | Create User Profile (Sign up) | ✔ |                |                |                 |
> | Update User Profile  |             | ✔ (own)       | ✔ (all)        | ✔             |
> | Delete User Profile  |             | ✔ (own)       | ✔ (all)        | ✔             |


Reason for protection: to prevent unauthorized users from meddling with API calls using tools like Postman or other API clients.

## Entity-Relationship-Diagram

<img src="/assets/images/ERD.png">

## Next Steps

- [ ] Login-ed users can save a recipe to favourites
- [ ] Users can have a checklist of ingredients and add to grocery list
- [ ] Users can search for other users' profile
- [ ] Users can filter through search results (recipe name, tags, ingredients, etc)
- [ ] Users can see other related recipes for each recipe

## Showed the code for the "main" Mongoose Model, its controller & favorite React Component

Our favourite component was the star rating feature which takes in the rating prop from fetched reviews to render as stars.

```
const StarRating = ({ star }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= star ? 'gold' : 'gray', fontSize: '1.5em' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <span>{renderStars()}</span>;
};
```

```
<StarRating star={review.rating} />
```

## Key Challenges / Learning / Takeaways

1. Check git branch first before doing any work! This will save you headaches down the road trying to change commits to a different branch.
2. Git pull often to reduce the chances of a merge conflict.
3. Try to ensure all pull requests are approved first before making new changes to reduce the chances of a merge conflict.
4. Communicate with team members which file we are working on to reduce the chances of a merge conflict.

## Authors

- [@chunxtan](https://github.com/chunxtan)
- [@Haozhi415](https://github.com/Haozhi415)
- [@xsijin](https://github.com/xsijin)

## Resources

- [Render](https://render.com/) - Deployment of Frontend & Backend
- [Miro](https://miro.com) - Task and project management platform
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
- [Mob](https://www.mob.co.uk/) - Web inspiration / recipe information to populate data
- [Allrecipes](https://www.allrecipes.com/) - Web inspiration / recipe information to populate data