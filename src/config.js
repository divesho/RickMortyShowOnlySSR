const CONFIG = {
    "apiUrl": "http://docker-env.eba-5w3hw2aw.ap-south-1.elasticbeanstalk.com/api/",
    "cookie": {
        "tokenName": "jwtToken",
        "userPref": "userPreferences",
        "maxAge": 3600,
        "path": "/"
    },
    "messages": {
        "enterDetails": "Please enter the details",
        "regstrationSuccess": "User regstered successfully!! Please login",
        "unknownError": "some error occurred while fetching server data",
        "sessionExpiry": "Session expired! Please login again"
    }
};

export default CONFIG;