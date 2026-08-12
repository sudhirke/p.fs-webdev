## Blogify App

#### What are we doing

- Created a simple blogging application
- User password is encrypted in the signup process.
- Used mongoose virtual to attach a static function with the User model

#### Key Learnings

- Encrypting user password and storing using salt.
- Generate a random text in vscode using node -e "console.log(Math.random().toString(36).slice(2, 20))"

### Setup

- Clone the repository
- Run npm -install to download the required node modules
- Create a config.json file in root folder with following keys
  {
  "DB_CONN_STRING": "mongo db connection string",
  "PORT": 8002,
  "JWTSECRET": "randon text used as secret"
  }
