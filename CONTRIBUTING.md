# Contributing

Here are some general guidelines you should know before making your first contribution to the project.

## About this repository

This repository is a monorepo, meaning multiple projects live under this single repository. Since this is fairly small project, there are only two areas in the repo you should be concerned about: the `api` and `client` folder.

### IMPORTANT NOTE

Although our project is using node.js, this is **NOT** a node.js project. We are using node.js only for package management and to run our scripts to help facilitate development. Our project uses the LAMP stack: Linux, Apache, MySQL, and PHP.

### API

The `api` folder should contain all the business and server-side logic of our application. This is also where we will be making calls to our database.

### Client

The `client` folder should all the client-side logic for our application. This will be all our HTML, CSS, JavaScript files, and any other static assets we may need.

## Tooling

To help facilitate development, we are using [pnpm](https://pnpm.io/) as our package manager, [Prettier](https://prettier.io/) as our code formatter, and [Tailwind CSS](https://tailwindcss.com/) to generate our CSS.

### Installing pnpm

If you have npm installed, you can install pnpm globally by running the following command:

```bash
npm install -g pnpm
```

If you don't have npm, you can install it by installing node.js [here](https://nodejs.org/en/download/).

You could also install pnpm through these [other methods](https://pnpm.io/installation).

### Using Tailwind

When using Tailwind, make sure you to run the following command:

```bash
pnpm tailwind:watch
```

This will actively scan changes in class names in your HTML and generate an optimized CSS file for you to use.

You can also run the following command to do this once:

```bash
pnpm tailwind:build
```

## Development

### Clone the repository

```bash
git clone https://github.com/POOSD-Team-21/contact_manager.git
```

### Navigate to the project directory

```bash
cd contact_manager
```

### Create a branch off main

```bash
git checkout -b <branch-name>
```

```

## Conventions

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

Ideally, we should all be thoroughly reviewing each other’s code, but since this a fairly small project, its okay to approve changes that aren’t ideally or may break things since we can quickly fix issues later on.

If you had any requested changes, please resolve them. Afterwards, you are free to merge your pull request. Make sure to double check your changes before merging. Once your pull request is merged, make sure to delete the branch and pull the latest changes from main on your machine.

```

```

```
