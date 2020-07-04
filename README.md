# Chirper Project

This project was created by Udacity and is part of the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).
This is a react app where users can post see all the tweets and can also write new tweets, reply to other tweets, and "like" ! 
This react app is using redux to manage the state of the tweets, users, and user authentificated of the application.

Most of the commits in this repository correspond to videos in the program however I decided to implement other features:
- A delete button
- An update button 

To develop these features I created actions to be dispatched to reducers to update the store as well as asyncronous calls to update the database through redux thank.

![Chirper Demo](demo/Chirper.gif)

## Getting started

### Pre-requisites and Local Development

Developers using this project should already have node installed on their local machines.

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
| `GET /tweet` | Get all of the tweets | &nbsp |

Example Response:

```json
[
	{
        "id": "98f9331d-459d-4f13-8d6a-4be5528bf423",
        "text": "Hello, this is my first Tweet",
        "author": "Angela123",
        "likes": ["Mickael22"],
        "replies": ["46ab8e66-f3a4-48ae-a9e4-040ca0b29186"],
        "replyingTo": null,
        "createdAt": "2020-07-04T17:43:37.237Z",
        "updatedAt": "2020-07-04T17:43:37.237Z"
    },
    {
        "id": "46ab8e66-f3a4-48ae-a9e4-040ca0b29186",
        "text": "Welcome Angela!",
        "author": "Mickael22",
        "likes": [],
        "replies": [],
        "replyingTo": "98f9331d-459d-4f13-8d6a-4be5528bf423",
        "createdAt": "2020-07-04T17:44:35.473Z",
        "updatedAt": "2020-07-04T17:44:35.473Z"
    }
]
```
| Endpoint       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /tweet/:id` | Get the details of a single tweet | &nbsp |

Example Response:

```json
{
    "msg": "Success",
    "tweet": {
        "id": "46ab8e66-f3a4-48ae-a9e4-040ca0b29186",
        "text": "Welcome Angela!",
        "author": "Mickael22",
        "likes": [],
        "replies": [],
        "replyingTo": "98f9331d-459d-4f13-8d6a-4be5528bf423",
        "createdAt": "2020-07-04T17:44:35.473Z",
        "updatedAt": "2020-07-04T17:44:35.473Z"
    }
}
```
| Endpoint       | Usage          | Params         |
|-----------------|----------------|----------------|
| `POST /tweet` | Create a new tweet | **text** - [String] <br> **author** - [String] <br> **replyingTo** (optional) - Should match a tweet id in the database. &nbsp |

| Endpoint       | Usage          | Params         |
|-----------------|----------------|----------------|
| `DELETE /tweet/:id` | Remove a tweet from the database | &nbsp |

| Endpoint       | Usage          | Params         |
|-----------------|----------------|----------------|
| `PATCH /tweet/:id` | Edit Tweet Text, or add replies, likes | **text** (optional) - [String] TBD . &nbsp |

## Acknowledgements

I want to thank Udacity for providing the framework and guidelines for this great project.

