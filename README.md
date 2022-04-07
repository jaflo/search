# Search

A simple search interface that uses Bing and OpenAI to provide results. Prefers certain sites (Wikipedia, GitHub, Reddit, the StackExchange network) and attempts to use GPT to answer questions.

![Alt text](/screenshot.png?raw=true)

## Setup

1. Register for a Microsoft Azure account.
1. [Create a Bing search resource](https://portal.azure.com/#create/Microsoft.BingSearch), go to Keys and Endpoint and copy the key value.
1. Set the environment variable `AZURE_SUBSCRIPTION_KEY` to the copied key value.
1. Register for an OpenAI account.
1. [Find your OpenAI API key](https://beta.openai.com/account/api-keys), and copy it.
1. Set the environment variable `OPENAI_SUBSCRIPTION_KEY` to the copied key value.
