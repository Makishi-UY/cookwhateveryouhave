# Cook Whatever You Have!!

Add the ingredients you have there in your fridge, table, bed, or wherever you have them. And let the app tell you what you can cook with them.

## Tools used

Built with [Nuxt 3](https://nuxt.com), and using OpenAI, it just request for a recipe asuming it is an experienced chef explaining a recipe to amateur audience.
[nvm](https://github.com/nvm-sh/nvm) is suggested to manage Node versions. We are using LTS (actually experiencing problems with Nuxt 3 and latest Node version).

## Setup project

1. Create an account on openai and get an [API key](https://platform.openai.com/account/api-keys).
1. Create an .env file in the root folder of the project and add this line: OPENAI_API_KEY=new_api_key

## Run

### The long way
```bash
# Intall dependences
npm install

# Run the project
npm run dev
```

### The short way
```bash
# Intall dependences and run the project (ideal at least for the first time)
npm run start
```

### Browsing the application.

When the app is running, just browse `http://localhost:3000`.