# Chirper Project

Chirper is an app to post and reply to tweets. The front-end architecture was taken from another project: [go to initial project](https://github.com/hmisonne/UdacityReact/tree/master/00_reactnd-chirper-app-master). 
I decided to build the back-end of this app with Node.JS and TypeScript and to deploy this app on the cloud through AWS with microservices.

![Chirper Demo](demo/Chirper.gif)

## Getting started

### Pre-requisites for Local Development

- npm, run npm i under chirper-api-tweet to install all the dependencies
- Postgres
    -  Replace the config value with your own values on chirper-api-tweet/src/config/config.ts
```javascript
export const config = {
  'username': 'POSTGRES_USERNAME',
  'password': 'POSTGRES_PASSWORD',
  'database': 'POSTGRES_DB_NAME',
}
```

## About the stack

### Frontend Server

To run this app, on your terminal, cd to 00_reactnd-chirper-app-master :

* install all project dependencies with `npm install`
* start the development server with `npm start`

Open the localhost:3000 to view the App in development mode on the local server.

### Backend Server

#### Tweet API

The following endpoints are available:

| Endpoint       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /tweet` | Get all of the tweets | |
| `GET /tweet/:id` | Get the details of a single tweet | |
| `POST /tweet` | Create a new tweet | **text** - [String] <br> **author** - [String] |
| `POST /tweet/:id/comment` | Reply to a tweet with a comment | **text** - [String] <br> **author** - [String] |
| `PATCH /tweet/:id` | Edit Tweet Text, or add replies, likes | **text** (optional) - [String] TBD . |
| `DELETE /tweet/:id` | Remove a tweet from the database | |

Example Response: `GET /tweet/:id`

```json
{
    "success": true,
    "tweet": {
        "id": 1,
        "text": "Hello!",
        "author": "Angela22",
        "createdAt": "2020-07-07T17:33:59.880Z",
        "updatedAt": "2020-07-07T17:33:59.880Z",
        "comments": [
            {
                "id": 1,
                "text": "Welcome Angela!",
                "author": "Bobby",
                "createdAt": "2020-07-07T17:34:54.789Z",
                "updatedAt": "2020-07-07T17:34:54.789Z",
                "tweetId": 1
            }
        ]
    }
}
```
Example Response : `GET /tweet`

```json
{
    "success": true,
    "tweets": [
        {
            "id": 1,
            "text": "Hello!",
            "author": "Angela22",
            "createdAt": "2020-07-07T17:33:59.880Z",
            "updatedAt": "2020-07-07T17:33:59.880Z",
            "comments": [
                {
                    "id": 1,
                    "text": "Welcome Angela!",
                    "author": "Bobby",
                    "createdAt": "2020-07-07T17:34:54.789Z",
                    "updatedAt": "2020-07-07T17:34:54.789Z",
                    "tweetId": 1
                }
            ]
        },
        {
            "id": 2,
            "text": "Welcome",
            "author": "Patricia",
            "createdAt": "2020-07-08T00:57:49.863Z",
            "updatedAt": "2020-07-08T00:57:49.864Z"
        },
    ]
}
```

## Test

To add testing to my project I followed this great [tutorial](https://levelup.gitconnected.com/building-an-express-api-with-sequelize-cli-and-unit-testing-882c6875ed59)

## Acknowledgements

[Express Node tutorial](https://www.youtube.com/watch?v=G8uL0lFFoN0&t=5790s)

## Todo

Add authentification
