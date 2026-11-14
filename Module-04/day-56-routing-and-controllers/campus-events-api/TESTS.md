#### Requests and responses

baseUrl = http://localhost:3000/api/v1

- Request 1

GET {{baseUrl}}/events

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 1248\
ETag: W/"4e0-7AnxtYuePWuBJuChloSWfWfQ+yg"\
Date: Sat, 14 Nov 2026 14:54:27 GMT\
Connection: close

{\
"items": [\
{\
"id": "evt-101",\
"title": "Intro to Cloud Computing",\
"description": "A beginner-friendly campus workshop.",\
"location": "Engineering Block, Room 2",\
"eventDate": "2026-11-05T09:00:00.000Z",\
"category": "technology",\
"isPublished": true\
},\
{\
"id": "evt-102",\
"title": "Web Development Bootcamp",\
"description": "Learn the fundamentals of modern web \development.",\
"location": "Computer Science Lab 1",\
"eventDate": "2026-11-09T08:30:00.000Z",\
"category": "technology",\
"isPublished": false
},\
{\
"id": "evt-103",\
"title": "Entrepreneurship and Innovation",\
"description": "Explore how to turn creative ideas into \successful businesses.",\
"location": "Business Block, Hall 3",\
"eventDate": "2026-11-11T10:00:00.000Z",\
"category": "business",\
"isPublished": true\
},\
{\
"id": "evt-104",\
"title": "Campus Football Tournament",\
"description": "An exciting interdepartmental football \competition.",\
"location": "University Sports Field",\
"eventDate": "2026-11-16T13:00:00.000Z",\
"category": "sports",\
"isPublished": true\
},\
{\
"id": "evt-105",\
"title": "AI and the Future",\
"description": "A discussion on artificial intelligence and \its impact on society.",\
"location": "Main Auditorium",\
"eventDate": "2026-11-20T09:30:00.000Z",\
"category": "technology",\
"isPublished": true\
}\
],\
"total": 6,\
"page": 1,\
"limit": 5,\
"totalPages": 2\
}

- Request 2

GET {{baseUrl}}/events?category=technology

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 757\
ETag: W/"2f5-jYZCEcc7uAQ/mWt1MLteQQHODnw"\
Date: Sat, 14 Nov 2026 15:04:41 GMT\
Connection: close

{\
"items": [\
{\
"id": "evt-101",\
"title": "Intro to Cloud Computing",\
"description": "A beginner-friendly campus workshop.",\
"location": "Engineering Block, Room 2",\
"eventDate": "2026-11-05T09:00:00.000Z",\
"category": "technology",\
"isPublished": true\
},\
{\
"id": "evt-102",\
"title": "Web Development Bootcamp",\
"description": "Learn the fundamentals of modern web \development.",\
"location": "Computer Science Lab 1",\
"eventDate": "2026-11-09T08:30:00.000Z",\
"category": "technology",\
"isPublished": false\
},\
{\
"id": "evt-105",\
"title": "AI and the Future",\
"description": "A discussion on artificial intelligence and\ its impact on society.",\
"location": "Main Auditorium",\
"eventDate": "2026-11-20T09:30:00.000Z",\
"category": "technology",\
"isPublished": true\
}\
],\
"total": 3,\
"page": 1,\
"limit": 5,\
"totalPages": 1\
}

- Request 3

GET {{baseUrl}}/events?isPublished=true

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 1011\
ETag: W/"3f3-0xcgNklAHbKVuDykSWJATpRIqMk"\
Date: Sat, 14 Nov 2026 15:05:31 GMT\
Connection: close

{\
"items": [\
{\
"id": "evt-101",\
"title": "Intro to Cloud Computing",\
"description": "A beginner-friendly campus workshop.",\
"location": "Engineering Block, Room 2",\
"eventDate": "2026-11-05T09:00:00.000Z",\
"category": "technology",\
"isPublished": true\
},\
{\
"id": "evt-103",\
"title": "Entrepreneurship and Innovation",\
"description": "Explore how to turn creative ideas into \successful businesses.",\
"location": "Business Block, Hall 3",\
"eventDate": "2026-11-11T10:00:00.000Z",\
"category": "business",\
"isPublished": true\
},\
{\
"id": "evt-104",\
"title": "Campus Football Tournament",\
"description": "An exciting interdepartmental football \competition.",\
"location": "University Sports Field",\
"eventDate": "2026-11-16T13:00:00.000Z",\
"category": "sports",\
"isPublished": true\
},\
{\
"id": "evt-105",\
"title": "AI and the Future",\
"description": "A discussion on artificial intelligence and\ its impact on society.",\
"location": "Main Auditorium",\
"eventDate": "2026-11-20T09:30:00.000Z",\
"category": "technology",\
"isPublished": true\
}\
],\
"total": 4,\
"page": 1,\
"limit": 5,\
"totalPages": 1\
}

- Request 4

GET {{baseUrl}}/events?sortBy=eventDate&order=asc&page=2&limit=2

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 546\
ETag: W/"222-w6KScc0nJkyDNlj41twhOALmH2c"\
Date: Sat, 14 Nov 2026 15:07:58 GMT\
Connection: close

{\
"items": [\
{\
"id": "evt-103",\
"title": "Entrepreneurship and Innovation",\
"description": "Explore how to turn creative ideas into \successful businesses.",\
"location": "Business Block, Hall 3",\
"eventDate": "2026-11-11T10:00:00.000Z",\
"category": "business",\
"isPublished": true\
},\
{\
"id": "evt-104",\
"title": "Campus Football Tournament",\
"description": "An exciting interdepartmental football \competition.",\
"location": "University Sports Field",\
"eventDate": "2026-11-16T13:00:00.000Z",\
"category": "sports",\
"isPublished": true\
}\
],\
"total": 6,\
"page": 2,\
"limit": 2,\
"totalPages": 3\
}

- Request 5

GET {{baseUrl}}/events/upcoming

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Content-Type: application/json; charset=utf-8\
Content-Length: 791\
ETag: W/"317-H6MAdfwa/oFdqGwspnBlTus7v4c"\
Date: Sat, 14 Nov 2026 15:09:23 GMT\
Connection: close

{\
"items": [\
{\
"id": "evt-104",\
"title": "Campus Football Tournament",\
"description": "An exciting interdepartmental football \competition.",\
"location": "University Sports Field",\
"eventDate": "2026-11-16T13:00:00.000Z",\
"category": "sports",\
"isPublished": true\
},\
{\
"id": "evt-105",\
"title": "AI and the Future",\
"description": "A discussion on artificial intelligence and \its impact on society.",\
"location": "Main Auditorium",\
"eventDate": "2026-11-20T09:30:00.000Z",\
"category": "technology",\
"isPublished": true\
},\
{\
"id": "evt-106",\
"title": "Environmental Awareness Day",\
"description": "Promoting sustainable living and \environmental responsibility.",\
"location": "University Conference Center",\
"eventDate": "2026-11-27T08:00:00.000Z",\
"category": "environment",\
"isPublished": false\
}\
],\
"total": 3,\
"page": 1,\
"limit": 3,\
"totalPages": 1\
}

- Request 6

GET {{baseUrl}}/events/evt-101

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 225\
ETag: W/"e1-3sp8b7JiCbZTmcP+sOsIDJ8hP20"\
Date: Sat, 14 Nov 2026 15:10:48 GMT\
Connection: close

{\
"id": "evt-101",\
"title": "Intro to Cloud Computing",\
"description": "A beginner-friendly campus workshop.",\
"location": "Engineering Block, Room 2",\
"eventDate": "2026-11-05T09:00:00.000Z",\
"category": "technology",\
"isPublished": true\
}

- Request 7

GET {{baseUrl}}/events/evt-109

- Response

HTTP/1.1 404 Not Found\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 87\
ETag: W/"57-NlG+TMtPXQKO2IPqeGEu2+bpaFk"\
Date: Sat, 14 Nov 2026 15:11:44 GMT\
Connection: close

{\
"message": "Event with id evt-109 was not found.",\
"error": "Not Found",\
"statusCode": 404\
}

- Request 8

GET {{baseUrl}}/events/evt-101/sessions

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 556\
ETag: W/"22c-cI+0FYAeAKN3WUfi+4NCLW3kkCg"\
Date: Sat, 14 Nov 2026 15:12:30 GMT\
Connection: close

{\
"items": [\
{\
"id": "ses-101",\
"eventId": "evt-101",\
"title": "Introduction to Cloud Fundamentals",\
"startsAt": "2026-11-05T09:00:00.000Z",\
"endsAt": "2026-11-05T10:00:00.000Z",\
"room": "Room 2"\
},\
{\
"id": "ses-102",\
"eventId": "evt-101",\
"title": "Cloud Service Models",\
"startsAt": "2026-11-05T10:15:00.000Z",\
"endsAt": "2026-11-05T11:15:00.000Z",\
"room": "Room 2"\
},\
{\
"id": "ses-103",\
"eventId": "evt-101",\
"title": "Hands-on Cloud Deployment",\
"startsAt": "2026-11-05T11:30:00.000Z",\
"endsAt": "2026-11-05T12:30:00.000Z",\
"room": "Computer Lab 1"\
}\
],\
"total": 3,\
"page": 1,\
"limit": 3,\
"totalPages": 1\
}

- Request 9

GET {{baseUrl}}/events/evt-101/sessions/ses-102

- Response

HTTP/1.1 200 OK\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: public, max-age=60\
Content-Type: application/json; charset=utf-8\
Content-Length: 157\
ETag: W/"9d-4FfZTqStlpqmbMT8gb4w+Est7eM"\
Date: Sat, 14 Nov 2026 15:13:19 GMT\
Connection: close

{\
"id": "ses-102",\
"eventId": "evt-101",\
"title": "Cloud Service Models",\
"startsAt": "2026-11-05T10:15:00.000Z",\
"endsAt": "2026-11-05T11:15:00.000Z",\
"room": "Room 2"\
}

- Request 10

POST {{baseUrl}}/events HTTP/1.1\
Content-Type: application/json

{
"title": "Photography Workshop",\
"description": "Learn basic photography techniques and \creative composition.",
"location": "Arts Building, Studio 2",\
"eventDate": "2026-12-08T11:00:00.000Z",\
"category": "arts",\
"isPublished": false\
}

- Response

HTTP/1.1 201 Created\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: no-store\
Content-Type: application/json; charset=utf-8\
Content-Length: 238\
ETag: W/"ee-iKg0dzRt9KQ6QMfytYGkQXEKmI8"\
Date: Sat, 14 Nov 2026 15:14:21 GMT\
Connection: close

{\
"id": "evt-107",\
"title": "Photography Workshop",\
"description": "Learn basic photography techniques and \creative composition.",
"location": "Arts Building, Studio 2",\
"eventDate": "2026-12-08T11:00:00.000Z",\
"category": "arts",\
"isPublished": false\
}

- Request 11

POST {{baseUrl}}/events HTTP/1.1\
Content-Type: application/json

{\
"description":\
"Practical advice on CV writing, interviews, and career \planning.",
"location": "Engineering Block, Room 5",\
"eventDate": "2026-12-19T09:00:00.000Z",\
"category": "education",\
"isPublished": true\
}

- Response

HTTP/1.1 400 Bad Request\
X-Powered-By: Express\
Vary: Origin\
Access-Control-Allow-Credentials: true\
Cache-Control: no-store\
Content-Type: application/json; charset=utf-8\
Content-Length: 130\
ETag: W/"82-zFI/VCHdq2IEFktdPKFVAuvUI9Q"\
Date: Sat, 14 Nov 2026 15:15:35 GMT\
Connection: close

{\
"message": [\
"title must be longer than or equal to 1 characters",\
"title must be a string"\
],\
"error": "Bad Request",\
"statusCode": 400\
}
