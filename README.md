# Welcome to Dishcover!

Welcome to **Dishcover**, your go-to platform for culinary exploration and creativity! **Dishcover** is a web app designed to bring together food enthusiasts from around the world, allowing them to share, discover, and savor delightful homemade dishes.

:cherries: Have fun! :carrot:

## Screenshots

Enter App's landing page and any other screenshots of interest

## Technologies Used

JavaScript, CSS, HTML, GitHub, React, React Router, Vite, Tailwind/DaisyUI, Mongoose, Express, Crypto, SplideJS/React-Splide

localStorage to store token

## Getting Started

Web link: https://dishcoveries.onrender.com/

Repos:
Front End: https://github.com/xsijin/Dishcover
Back End: https://github.com/Haozhi415/GA_P3_backend 

[Miro Board](https://miro.com/app/board/uXjVN9wiZ8c=/)
[Figma Wireframe](https://www.figma.com/file/jmQyhu4rRCjEOahmJ2iO0Q/Project-3?type=design&mode=design&t=FHnU6fG21cagAsb2-0)
[Trello Board](https://trello.com/b/dccanYjz/project3-rox)

## User Types & Authorization

> [!IMPORTANT]
>| Authorization    | Public         | Logged in User | Logged in & Owner  | Admin          |
>| ----------------- | --------------| -------------- | -------------- | -------------- |
>| Read Recipes      | ✔             | ✔             | ✔              | ✔              |
>| Create Recipes    |               | ✔              | ✔             | ✔              |
>| Update Recipes    |               |                | ✔ (own)        | ✔ (all)        |
>| Delete Recipes    |               |                | ✔ (own)        | ✔ (all)        |
>| Read Reviews      | ✔             | ✔             | ✔              | ✔              |
>| Create Reviews    |               | ✔              | ✔              | ✔              |
>| Update Reviews    |               |                | ✔ (own)        | ✔ (all)        |
>| Delete Reviews    |               |                | ✔ (own)        | ✔ (all)        |

## Authentication Flow

## Entity-Relationship-Diagram

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

- @chunxtan 
- @Haozhi415 
- @xsijin

## Resources

- [Render](https://render.com/) - Deployment of Front End & Back End
- [Miro](https://miro.com) - Task and project management platform
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
