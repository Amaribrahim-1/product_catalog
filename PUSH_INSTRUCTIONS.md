Push instructions (HTTPS):

1. Create a new repository on GitHub named `product-catalog-react-training` (or your preferred name).

2. Run these commands locally from the project root:

```bash
git init
git add .
git commit -m "chore: initial commit — add product_catalog React training project"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Using GitHub CLI (`gh`):

```bash
gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push
```

If you prefer SSH, set the remote to the SSH URL instead of HTTPS.
