# Building Your Own Web AI Assistant: A Complete Hands-On Guide with CodeIgniter4, Next.js, and OpenRouter

![Cover](./1.jpg)

A fully functional AI-powered chat application built with CodeIgniter 4 on the backend and Next.js 16 on the frontend. This project connects to OpenRouter's AI API to provide intelligent conversations through a modern, responsive interface.

1. 📢 **LinkedIn announcement**: https://www.linkedin.com/posts/carlos-baeza-negroni_technology-tech-innovation-activity-7433183610213560320-8oQI
2. 📖 **Read the article directly on LinkedIn**: https://www.linkedin.com/pulse/building-your-own-web-ai-assistant-complete-hands-on-baeza-negroni-bcp4f
3. 🐦 **X/Twitter Announcement**: https://x.com/cjbaezilla/status/2027435454895710330

![Chat](./chat.jpg)

## What You Can Build With This

This project gives you a solid foundation for building AI-powered features into web applications. The architecture demonstrates how to securely connect a frontend to external AI services while keeping your API keys protected on the server side. You will have a working chat interface where users can send messages and receive responses from AI models, and everything runs locally on your machine for development before you deploy it to production.

The beauty of this setup is that you can extend it in countless directions. Want to add user authentication to track conversation history? The backend is ready for that. Want to switch to a different AI model? Just change a few lines in the controller. Want to add streaming responses for a more interactive feel? The foundation is there. This project grows with your ambitions.

![Usage](./usage.jpg)

## Technology Overview

The backend uses CodeIgniter 4, a PHP framework that has been powering web applications since 2006. It provides excellent performance with a small footprint, and the latest version brings modern PHP practices including strong typing and proper namespacing. The framework handles HTTP requests elegantly, manages your API endpoints, and communicates with external services without requiring you to write low-level network code.

The frontend uses Next.js 16 with the App Router architecture. This gives you server-side rendering for fast initial page loads, automatic code splitting so users only download what they need, and a smooth development experience with hot reloading. The chat interface uses React Markdown to render AI responses with proper formatting, so code blocks and structured text display beautifully.

OpenRouter serves as the gateway to AI models. It provides access to hundreds of models from various providers through a unified API, and this project is configured to use the nvidia/nemotron-3-nano-30b-a3b:free model which gives you plenty of capability at no cost while you learn and experiment.

## Prerequisites

Before you begin, make sure your development machine has the necessary tools installed. Having everything ready before you start makes the setup process much smoother and lets you focus on building rather than troubleshooting environment issues.

### Backend Requirements

The backend requires PHP 8.2 or higher with several extensions. The mbstring extension handles string operations, the intl extension provides internationalization support, and the pdo extension enables database connectivity. You will also need Composer, which is PHP's dependency manager, to install CodeIgniter and its packages.

If you want to store conversation history or user data, you will need a MySQL database. For local development on Windows, tools like XAMPP or WAMP work excellently and give you everything you need in one package. On macOS, MAMP is a popular choice, and Linux users typically have MySQL available through their package manager or can use Docker to run a database container.

### Frontend Requirements

The frontend requires Node.js 18.17 or later. This comes with npm, which manages your JavaScript dependencies. If you have built any web projects before, you probably already have these installed. If not, the installation is straightforward and works the same on Windows, macOS, and Linux.

## Project Structure

The repository contains two main directories that work together as a complete application. Understanding this structure helps you navigate the code and find what you need as you work on the project.

The server directory holds the CodeIgniter 4 backend application. The app folder within it contains your application code, including controllers that handle API requests, filters that process requests and responses, and configuration files that control how the application behaves. The system folder contains the framework's core files, and you should not need to modify anything there. The public folder serves as the web root, meaning this is what gets exposed to the internet when you deploy.

The client directory contains the Next.js frontend application. The app folder uses file-based routing, so each file or folder inside it defines a route in your application. The lib folder holds utility code and API helpers that your components use. The public folder contains static assets like images and fonts. Configuration files like package.json, tsconfig.json, and next.config.ts live in the root of this directory.

## Installation Steps

Setting up both the backend and frontend takes about fifteen minutes if everything goes smoothly. Take your time with each step and verify that each part works before moving to the next.

### Setting Up the Backend

Navigate to the server directory in your terminal. The exact command depends on your operating system and terminal, but on Windows with Command Prompt or Power Shell it would look like this.

```
cd server
```

Once you are in the server directory, install the PHP dependencies using Composer. This command reads the composer.json file and downloads CodeIgniter framework files along with Guzzle, which is the HTTP client the application uses to communicate with OpenRouter.

```
composer install
```

Composer will download all required packages and set up the autoloader. This typically takes a minute or two depending on your internet connection. When it completes, you will see a message indicating that the dependencies were installed successfully.

Now you need to configure your environment. The project includes a .env file with default settings, but you must update it with your OpenRouter API key. Open the .env file in a text editor and look for the line that starts with OPENROUTER_API_KEY. Replace the example key with your actual API key.

To get an API key, visit openrouter.ai and create an account if you do not already have one. The signup process is quick and supports authentication through Google or GitHub. After logging in, navigate to your dashboard and generate a new API key. Copy this key and paste it into the .env file, replacing the placeholder value.

Your .env file should now have a line that looks something like this, with your actual key instead of the placeholder.

```
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

The database configuration in the .env file is optional for now. The chat functionality works without a database because it does not store conversation history. You can configure MySQL later if you want to add that capability. The default settings assume a MySQL server running on localhost with standard credentials, but you can adjust these if your setup differs.

### Setting Up the Frontend

Navigate to the client directory and install the Node.js dependencies. This reads the package.json file and installs Next.js, React, TypeScript, Tailwind CSS, and all the other packages the frontend needs.

```
cd client
npm install
```

The installation process takes a few minutes as it downloads packages from the npm registry. You will see progress bars and status messages as each package installs. When it completes, your client directory is ready for development.

You may need to verify that the NEXT_PUBLIC_API_URL environment variable is set correctly. Check the .env.local file in the client directory and ensure it points to your backend server. The default value should work if you run the backend on the default port.

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

This tells the frontend where to find the backend API. The NEXT_PUBLIC_ prefix exposes this variable to the browser, which is necessary because the frontend runs in the browser while the backend runs on your local server.

## Running the Application

With both installations complete, you can now run the full application. You will need two terminal windows open, one for the backend and one for the frontend. Running them simultaneously is the standard development workflow.

### Starting the Backend

In your first terminal, navigate to the server directory and start PHP's built-in development server using the CodeIgniter Spark command.

```
cd server
php spark serve
```

This starts the development server on port 8080 by default. You should see output indicating that the server is running, typically showing a message like "CodeIgniter Development Server started on http://localhost:8080". Keep this terminal window open as long as you want to use the application. When you are done, you can stop the server by pressing Ctrl+C in the terminal.

### Starting the Frontend

In your second terminal, navigate to the client directory and start the Next.js development server.

```
cd client
npm run dev
```

This starts the development server on port 3000. You will see compilation progress, and once it completes you will see a "Ready" message. The first build takes a moment, but subsequent startups are much faster thanks to Next.js caching.

### Testing the Chat Interface

Open your browser and navigate to http://localhost:3000/chat. You should see a clean chat interface with an input field and a send button. The design is simple but polished, with messages displayed in a conversation-style layout.

Type a message like "Hello, how are you?" and press the Send button or hit Enter. After a brief moment, you should see your message appear on the right side of the chat, followed by the AI's response on the left side. The response renders with Markdown formatting, so if the AI includes code blocks, lists, or other formatting, it displays properly.

If you encounter any errors, check both terminal windows for error messages. Common issues include the backend not running, an invalid API key, or network connectivity problems. The error messages are generally helpful and guide you toward the solution.

## How the Pieces Connect

Understanding how the frontend and backend communicate helps you troubleshoot issues and customize the application. Here is the complete flow from user input to AI response.

### The User Interaction

When a user types a message and clicks send, the React component captures the input through the onChange handler and stores it in the prompt state variable. When the form submits, the handleSubmit function prevents the default browser behavior and initiates the API call without reloading the page.

The sendChatMessage function from lib/api.ts is called with the prompt. This function uses the native Fetch API to POST to /api/chat, which is the local Next.js API route. The request includes a JSON body containing the prompt string.

### The Frontend Proxy

The Next.js API route in app/api/chat/route.ts receives this request. It extracts the body, reads the backend URL from environment variables, and makes its own fetch call to http://localhost:8080/api/chat, forwarding the exact same JSON payload.

This proxy architecture provides several real benefits. The backend URL stays hidden from users, which is cleaner and more secure. You can implement caching, authentication, or rate limiting in this proxy layer without changing any frontend components. Additionally, the frontend remains completely decoupled from the specific AI provider, so you could switch to a different AI service later without touching the React code.

### The Backend Processing

On the backend, the CodeIgniter routing system directs the request to the OpenRouter controller based on the route definition in Routes.php. The chat method in this controller first sets CORS headers on the response, which is essential for the browser to accept responses from a different origin.

The controller retrieves the API key from environment variables using getenv. If no API key is configured, it returns an error response with a 500 status code. The prompt comes from the request body via getVar, defaulting to "Hello" if nothing is provided.

The controller constructs the OpenRouter API payload, specifying the model and wrapping the user's prompt in the expected format. It then uses Guzzle to send the request to OpenRouter's servers with appropriate headers including the Bearer token for authentication. The request includes a 120-second timeout to handle slower models.

When the response arrives, the controller parses it as JSON and passes it back to the frontend using setJSON. Any exceptions during the request are caught and returned as error responses with helpful messages.

### The Response Journey Back

The Next.js API route receives the response from CodeIgniter and forwards it to the original caller using NextResponse.json. This preserves the response status code, so errors from OpenRouter propagate correctly.

The sendChatMessage function receives this response, checks if it was successful, parses the JSON, and returns it to the component. If there was an error, it throws an exception with a descriptive message.

The chat component receives the response data and extracts the text content. The code handles two possible response formats, both the older output_text field and the newer nested output array that OpenRouter uses. The assistant's message gets added to the message history, React re-renders the component automatically, and the user sees the complete conversation flow.

## Key Files and Their Purposes

Understanding which files handle what helps you find your way around the codebase and make targeted changes when you need to.

### Backend Files

The OpenRouter.php controller in app/Controllers is the heart of the backend. It handles all communication with the AI service, from receiving user prompts to forwarding them to OpenRouter and returning the responses. This is where you would make changes to use a different model, adjust timeout settings, or add request logging.

The Routes.php file in app/Config defines which controller methods respond to which URLs. The current configuration creates three routes: the home page at /, the chat API at /api/chat, and an OPTIONS endpoint for CORS preflight requests. Adding new endpoints is as simple as adding new lines to this file.

The Cors.php filter in app/Filters runs on every request before it reaches your controllers. It sets the headers that tell browsers "it is okay for code from other domains to talk to me." This filter is registered globally in Filters.php, ensuring all endpoints support cross-origin requests.

The .env file in the server root holds your configuration. The most important setting is OPENROUTER_API_KEY, which authenticates your requests to OpenRouter. Never share this file or commit it to version control, as it contains secrets that would let others use your API quota.

### Frontend Files

The chat/page.tsx file in app/chat contains the main chat interface. It manages the message state, handles form submissions, and renders the conversation. This is where you would customize the chat UI, add new features like typing indicators, or implement conversation history.

The lib/api.ts file provides a clean, typed interface for making API calls. It exports the sendChatMessage function and TypeScript interfaces for request and response shapes. Using this library in your components keeps your code clean and ensures type safety throughout the application.

The app/api/chat/route.ts file implements the Next.js API route that acts as a proxy to the backend. It receives requests from the frontend and forwards them to CodeIgniter. This is the place to add caching, authentication, or other proxy-layer features.

The globals.css file imports Tailwind CSS and configures the theme. It sets up CSS variables for styling and imports the typography plugin for nice Markdown rendering. Tailwind utility classes throughout the components handle all styling needs.

## Customization Guide

Once you have the basic application running, you will likely want to customize it to fit your needs. Here are some common modifications and where to make them.

### Changing the AI Model

To use a different AI model, open the OpenRouter.php controller in app/Controllers. Find the line that specifies the model in the payload array and change it to the model you want to use. The OpenRouter documentation lists all available models, and you can switch to any of them by simply changing this string.

Keep in mind that different models have different pricing and capabilities. Some models are faster, some are better at reasoning, and some are free while others require payment. The free tier gives you plenty of room to learn and experiment before you need to spend money.

### Adding More Routes

To add new API endpoints on the backend, create a new controller in app/Controllers and define the methods you need. Then add the routes in Routes.php to connect URLs to your controller methods. CodeIgniter makes this straightforward, and you can follow the existing pattern for the chat endpoint.

On the frontend, create new pages by adding files to the app directory. Next.js uses file-based routing, so creating app/about/page.tsx automatically creates an /about route. You can also add API routes in the app/api directory following the pattern used for the chat endpoint.

### Styling Changes

To modify the appearance of the chat interface, edit the Tailwind CSS classes in chat/page.tsx. The utility classes control colors, spacing, typography, and layout. You can also add custom styles in globals.css if you need something beyond what Tailwind provides.

The project uses the @tailwindcss/typography plugin for rendering Markdown content nicely. This gives you professional-looking typography automatically, including proper spacing for paragraphs, styled code blocks, and well-formatted lists.

### Adding Database Features

If you want to store conversation history or user data, you will need to set up database connectivity. Configure your database credentials in the server/.env file, then use CodeIgniter's database features to create tables and query data. The framework provides a powerful query builder and ORM-like features that make database operations straightforward.

## Security Considerations

Protecting your application and your API keys is essential, especially when dealing with external services that cost money to use.

Never commit your .env files to version control. The project includes .env in .gitignore for exactly this reason, but double-check that it is working before you push anywhere. If you accidentally commit secrets, you should rotate them immediately.

In production, set environment variables through your hosting provider rather than using .env files. Most hosting platforms provide a secure way to configure environment variables that will not be accidentally committed. Vercel, Heroku, and AWS all handle this elegantly.

When deploying the frontend, you might want to restrict the CORS origin from the wildcard to your specific domain. Find the places where Access-Control-Allow-Origin is set to * and replace it with your actual frontend domain. This prevents other sites from making requests to your backend.

Rotate your API keys periodically and use the key with minimum required permissions. These small security habits pay off in the long run and keep your application safe.

## Troubleshooting Common Issues

Even with a well-designed project, you will occasionally run into issues during development. Here are solutions to the most common problems.

If you see "Network error: Unable to connect to the server" in the chat interface, the frontend cannot reach the backend. Verify that the CodeIgniter server is running on port 8080. Check that the NEXT_PUBLIC_API_URL in your client/.env.local matches the backend address.

If you see "API key not configured" in the response, the backend is running but cannot find your OpenRouter API key. Verify that the OPENROUTER_API_KEY is set correctly in server/.env and that you restarted the backend after making changes to the .env file.

If you see CORS errors in your browser console, the backend is not sending proper headers. Verify that the CORS filter is registered in app/Config/Filters.php and that the controller also sets CORS headers on responses.

If the AI responses are slow or timeout, try using a faster model or increase the timeout value in the OpenRouter controller. The current timeout of 120 seconds should handle most requests, but some models and complex prompts take longer.

## Moving to Production

When you are ready to share your application with the world, you will need to deploy it to production servers. The approach differs depending on your hosting provider, but the general principles remain the same.

For the backend, you need a PHP hosting environment that supports PHP 8.2 or higher. Most shared hosting providers, VPS services, or platform-as-a-service options work well. Upload your server directory to your hosting account, making sure the public-facing files are in the directory your host designates as the web root, which is typically public_html or htbdocs.

For the frontend, you can deploy to Vercel, which is the creators of Next.js and provides excellent support for Next.js applications. Simply connect your GitHub repository to Vercel, and it will automatically build and deploy your frontend. You can also use other hosting providers that support Node.js applications.

Update your environment variables in your production environment to point to your deployed backend URL instead of localhost. This is typically done through your hosting provider's dashboard rather than editing .env files directly.

Remember to restrict the CORS origin in production to your actual frontend domain rather than using the wildcard. This is one of the first security improvements you should make when moving from development to production.

## Continuing Your Journey

This project gives you a working foundation, but it is just the beginning of what you can build. Consider adding user authentication to create personalized experiences, implementing conversation history so users can continue discussions across sessions, or exploring streaming responses for a more interactive feel.

The technologies in this stack are all well-documented and have passionate communities. CodeIgniter has excellent documentation and an active forum where you can find answers to almost any question. Next.js provides comprehensive guides and API references on their website. OpenRouter's documentation explains all the models available and how to use them.

As you extend this application, you will find that the architecture supports growth well. The clean separation between frontend and backend means you can iterate on each side independently. The API-based communication means you can add new features without breaking existing ones. And the foundation of modern, well-supported technologies means you will not hit walls caused by outdated tools.

Enjoy building, and have fun exploring what you can create with AI-powered features.
