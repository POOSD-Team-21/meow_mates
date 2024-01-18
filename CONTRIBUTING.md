Here are some general guidelines you should know before making your first contribution to the project.

# About this repository

This repository is a monorepo, meaning multiple projects live under this single repository. Since this is fairly small project, there are only two areas in the repo you should be concerned about: the `api` and `client` folder.

## API

The `api` folder should contain all the business and server-side logic of our application. This is also where we will be making calls to our database.

## Client

The `client` folder should all the client-side logic for our application. This will be all our HTML, CSS, JavaScript files, and any other static assets we may need.

# Setting up your development environment

## Clone the repository

```bash
git clone https://github.com/POOSD-Team-21/contact_manager.git
```

## Navigate to the project directory

```bash
cd contact_manager
```

## Create a branch off main

```bash
git checkout -b project-name/feature-name
```

# Conventions

Although its not a big deal if you break any of these conventions, it helps to all be on the same page following the same set of rules.

## First Steps

Create an issue first. This lets people know what you are working on (assign yourself to the issue), they can see what branches are linked to the issue, and what it is you accomplished. 

This issue does not have to be an issue like a bug, but it can be a feature, bugs, or anything you are adding to the project in your code. It should be kept somewhat small and specific but not the the point of it being just one commit.

Make sure you have a good title and description of the feature or issue you are working on. For example, issue #3 is the one in regards to creating this contribution document. There I had a title saying what needs to be done, and then describe why and how it can be done. 

## Branch names

Once you have the issue created you can click create a branch on github and it will create the branch and link it to the issue for you (you can also use the command line as well, but it won't auto link).

- Names should be in the following format like below where # is the number of the issue
    - A good example is `issue/#-implement-authentication`
- Use lowercase
- Use hyphens to separate words
- Keep it short and meaningful

## Commits

- Briefly explain your contribution in good detail
- Use present tense
- Capitalize the first word in the message
- Do not end the message with punctuation

## Pull requests

- Titles should be treated similarly to commit messages
- Use present tense
- Capitalize the first word in the title
- Keep it short and meaningful

## Code review

Ideally, we should all be thoroughly reviewing each other’s code, but since this a fairly small project, its okay to approve changes aren’t ideally or may break things since we can quickly fix issues later on.

## After Code Review

If you had any requested changes fix them. Then you are free to push but it does not hurt to get another look over based on the changes. Once you push merge the branch into main, or if it was accepted your changes are now on the main branch to be used and viewed.
