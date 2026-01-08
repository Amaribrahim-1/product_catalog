# Product Catalog (React Training Project)

This repository is a small training project to practice React fundamentals. It is intentionally simple and focuses on building a small product catalog UI using core React concepts.

## Learning Goals

- Components, props, and JSX: Build reusable UI components and pass data via props.
- State management with `useState`: Manage local component state and UI interactions.
- Side effects and data fetching with `useEffect`: Load data from APIs and handle loading/error states.
- Organizing logic into custom hooks: (Suggested) extract fetch logic into a `useFetch` or `useProducts` hook.

## Project Overview

- Simple product listing UI with components like `NavBar`, `Search`, `Filter`, `Products`, and `Product`.
- Uses the Fake Store API (`https://fakestoreapi.com`) to fetch sample product data.
- Demonstrates loading and error states.

## Run locally

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Git & GitHub

Suggested repository name: `product-catalog-react-training`

Suggested initial commit message:

```
chore: initial commit — add product_catalog React training project
```

If you already have a local git repo, push to GitHub with these commands (replace `<your-username>` and `<repo-name>`):

```bash
# initialize (only if not already a git repo)
git init

git add .

git commit -m "chore: initial commit — add product_catalog React training project"

git branch -M main

git remote add origin https://github.com/<your-username>/<repo-name>.git

git push -u origin main
```

Alternatively, create the repo on GitHub first and follow the provided push commands.

## Pull Request / Repository Description (example)

Title: "Initial commit — Product Catalog React training project"

Description:

This is a small training project built to practice React fundamentals. It demonstrates:

- Components, props, and JSX
- `useState` for local state management
- `useEffect` for data fetching and side effects
- Suggestion to refactor data fetching into custom hooks (e.g. `useFetch`)

The UI uses the Fake Store API for sample product data. This project is intended for learning and experimentation.

---

If you want, I can also create the GitHub repo for you (you will need to provide authentication), or I can run git commands here if you give permission and credentials. Otherwise follow the steps above to push.
