module.exports = {
    "port": "8082",
    "db": {
        "host": process.env.MONGO_URI || "mongodb://localhost:27017/",
        "user": "",
        "password": "",
        "db": "test"
    },
    "bcrypt": {
        "salt": 10
    },
    "jwt": {
        "secret": "$eCrEtK6y",
        "expiresIn": 3600
    },
    "apiUrl": "https://rickandmortyapi.com/api/character/",
    "INTERNAL_SERVER_URI": process.env.INTERNAL_SERVER_URI || "http://localhost:8082/api/"
};