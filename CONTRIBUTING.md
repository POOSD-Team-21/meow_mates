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

## Branch names

- Names should begin with the project name followed by a feature description
    - A good example is `api/implement-authentication`
- Use lowercase
- Use hyphens to seperate words
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

Ideally, we should all be thoroughly reviewing each other’s code, but since this a fairly small project, its okay to approve changes aren’t ideally or may break things since we can’t quickly fix issues later on.
