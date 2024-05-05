## My Work

1. **Implement Persistent State Management**
    - Implementing state management was straightforward using Zustand, as recommended. I set up a store in src/component/todoBoard/store.js to manage the todoList and doneList, using persist middleware and localStorage. However, a simpler localStorage-only approach could have sufficed for just two lists.

2. **Develop Intelligent Functionality with AI Integration**
    - Integrating the OpenAI API posed some challenges. Initially, I discovered that access requires [credits](https://community.openai.com/t/didn-t-receive-any-free-trial-credits/693150/24), and the API itself has rate limits of 3 requests per minute and 200 per day, which are quite restrictive. This limitation means the API should be reserved for important tasks only.
    - For basic search capabilities, I implemented with [Fuze.js](https://www.fusejs.io/). While it doesn’t match the sophistication of the OpenAI API, it serves as an effective preliminary solution. Opting for this library over custom coding with algorithms like the Levenshtein distance was a choice in favor of safety, efficiency, and reliability.
    - Had the OpenAI API been fully operational without restrictions, I planned to develop a function to process user inputs and suggest relevant task switches. Since the current usage is confined to testing within a browser, it wasn’t necessary to deploy a server for managing the API key. In a production environment, I would implement server-side handling with endpoints like app.post('/openAi/:input') to manage OpenAI requests.
    - Nevertheless, I did create a function in src/components/smartBar/request.js intended for OpenAI API integration and the part for the server in case we want it to be secured. It remains unused in the current project but was designed to be activated if Fuse.js failed to identify a suitable match.
