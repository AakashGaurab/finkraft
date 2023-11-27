# File Saviour
- File Saviour is an application using which log in and signup and can upload his/her files on s3 on aws as well as delete file from s3 whenever needed

# warning : Do not run on Microsoft Edge as Edge doesnot support session storage


# Tech-Stacks:
- Node.js
- Express.js
- MySQL
- React.js
- GitHub
- Postman
- AWS EC2 Instance link
[http://65.0.106.33:3501](http://65.0.106.33:3501)
- Deployed Link frontend link :
- [https://finkraft-mu.vercel.app//](https://finkraft-mu.vercel.app))

# finkraftbackend repo link
[https://github.com/AakashGaurab/finkraft](https://github.com/AakashGaurab/finkraft)

#Entities
User
- userId(Primary key)
- name
- email(unique)
- password(hashed)

# logging
- id(primary key)
- userid(foreign key)
- filename
- uploadDate

# Routes
User Routes
Registration
POST /user/signup
```
{
"name":"Aakash",
"email":"aakash@gmail.com",
"password":"1234"
}
```
 Response: User Created
                  
Login
POST /user/login
```
              Request:{
                  "email":example@gmail.com,
                  "password":"example123"
              }
```
  Response:{
  {msg:"Login Succesfull",id:results[0].id}


File Routes
# upload a file
POST /files/upload
headers token (jwtToken)


# Get All files
GET /files
header token:{jwtToken from login}


Delete file
DELETE /files/delete/:filename


