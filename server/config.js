module.exports = {
    "port": "8082",
    "db": {
        "host": process.env.MONGO_URI || "mongodb+srv://admin:Pa$$word2020@cluster0-owhwz.mongodb.net/",
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
    "INTERNAL_SERVER_URI": process.env.INTERNAL_SERVER_URI || "http://docker-env.eba-5w3hw2aw.ap-south-1.elasticbeanstalk.com/api/"
};