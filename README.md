# Introduction
The following repository reflects the work created by Joey Hou ([runchen3](mailto:runchen3@illinois.edu)), Prakhar Agarwal ([pa19](mailto:pa19@illinois.edu)), and Jovani Trejo ([jtrej7](mailto:jtrej7@illinois.edu)) for the final project for [CS 498: Data Management in The Cloud](https://alawini.web.illinois.edu/teaching/cs-498-data-management-in-the-cloud/) for the Spring 2026 semester.
## Overview
The following project contains a [FastAPI](https://fastapi.tiangolo.com) backend which serves REST API endpoints for the frontend webapp to call. FastAPI uses [PyMongo](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/) as a driver to connect to our MongoDB cluster instance, which we provisioned ourselves using the [Google Cloud Platform](https://cloud.google.com/) to deploy 3 virtual machines across three different regions (us-east4, us-west1, and us-central1).

In addition the following project also contains a [Vite with React + TypeScript](https://vite.dev) front-end, which uses [react-router](https://reactrouter.com) for client-side routing between different endpoints, and [React Bootstrap](https://react-bootstrap.netlify.app) for component styling. 
## Info
For more information regarding each project, and how to set them up, please navigate to either the `frontend/` or `backend/` directories and view their `README.md` files.

## Images
![Project Home Page](/readme_images/Screenshot%202026-05-04%20at%202.43.04 PM.png)
![Overview of Query 1](/readme_images/Screenshot%202026-05-04%20at%202.43.08 PM.png)
![Ability to read tweets by user](/readme_images/Screenshot%202026-05-04%20at%202.43.13 PM.png)
![Overview of Query 2](/readme_images/Screenshot%202026-05-04%20at%202.43.16 PM.png)
![Overview of Query 3](/readme_images/Screenshot%202026-05-04%20at%202.43.18 PM.png)
![Overview of Query 4](/readme_images/Screenshot%202026-05-04%20at%202.43.28 PM.png)