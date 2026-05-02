# Introduction
The following backend project contains a FastAPI backend which is used to serve information from our MongoDB GCP cluster instance.

## Setup Instructions
In order to get the backend running locally on your personal machine, you will need to ensure you have the following packages:

1. `Python3`
2. The `pip` package manager
3. The `.env` file which has been securely sent via another developer.

Then, you will need to create a virtual environment and activate it using the following steps:

1. Ensure you are in the `backend/` project directory, and then run the following command. This will create a virtual environment which you will use to run the project:
    ``` Terminal
    python3 -m venv .venv
    ```
2. Activate the newly created environment using the following command depending on if you're using macOS/Linux or Windows
    ``` macOS/Linux
    source .venv/bin/activate
    ```
    ``` Windows
    .\.venv\Scripts\activate 
    ```
3. Run the following command to install all project dependendies:
    ``` Terminal
    pip install -r requirements.txt
    ```
4. Then, run the following command to ensure the connection between the GCP instance and your backend works:
    ``` Terminal
    python3 utils/test_mongodb_connection.py
    ```

## Start Project
To run the FastAPI backend, run `fastapi dev`.