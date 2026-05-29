## Objective

Build a full stack student management system using the mern stack mongodb express react and node i am looking for a solid app with modular secure code the main goal here is an admin dashboard where the admin can manage student records basically full crud operations to create ,view ,update, search ,filter and delete students easily on a responsive ui.

## Core Functional Requirements

i want a complete crud functionality for student management the admin should be able to view ,save and update all the following specific details

# Personal Information

- full name
- email address
- date of birth
- gender
- student photograph
- mobile number
- alternate mobile number

# Parent Guardian Information

- father name
- mother name
- father mobile number
- mother mobile number
- guardian name
- guardian contact number

# Academic Information

- 10th percentage
- 12th percentage
- board of education
- current course class
- roll number
- admission number
- passing year

# Additional Information

- caste
- category
- blood group
- address
- city
- state
- country
- pincode

## Technology Stack Requirements

# Frontend

- react js for fast component driven ui that scales well
- react router for client side routing to ignore full page reloads every time you click a link
- axios to handle backend api calls cleanly
- tailwind css to ensure modern responsive styling and maintain realibility
- react hook form keeps the form states clean and stops unnecessary re renders
- zod we need rock solid schema validation for both the frontend forms and api payloads

# Backend

- node js the standard scalable js runtime for the server side
- express js keeps the routing and middleware setup clean and simple
- mongodb a perfect non-relational choice for dumping all this structured student data
- mongoose gives us schema models and an extra layer of database validation
- jwt authentication to securely lock down the admin api endpoints
- bcrypt to hash passwords and to secure them
- multer to handle actual file upload
- dotenv keep the secrets like jwt keys and mongo uris completely out of the codebase

## Authentication and Authorization

we need to lock this down with secure admin auth make sure you implement

- a working login system
- jwt based auth tokens
- protected routes for the admin area
- passwords securely hashed with bcrypt
- middleware that actually verifies the tokens
- keeping the session alive persistently
- basically if someone isnt a logged in admin they shouldnt even be allowed to see the dashboard or hit the student endpoints

## Validation Requirements

i want zod handling validation on both sides of the stack
Frontend Validation

- block empty required fields
- check that emails are actually formatted correctly
- make sure mobile numbers are exactly 10 digits in length
- percentages shouldnt go outside the 0 to 100 range
- check that the dates make sense
- validate the type of file and sizes of images
- catch ridiculous string lengths

# Backend Validation

- run every single incoming request body through zod schemas
- if the payload is trash bounce it before it even touches the database
- sanitize everything you can
- block weird or malicious data injections
- when validation fails send back a clear structured error
- example
  - email format is invalid
  - mobile number must contain 10 digits
  - 12th percentage cannot exceed 100

## Error Handling Requirements

i dont want scattered try catch blocks everywhere set up centralized error handling for the whole app it needs to catch

- bad api calls
- database crashes
- failed logins
- permission blocks
- upload failures
- validation drops
- missing data or resources
- complete server meltdowns
- stick to the standard http codes

- 200 success
- 201 resource created
- 400 bad request
- 401 unauthorized
- 403 forbidden
- 404 not found
- 500 internal server error
- every single error response needs to follow the exact same json shape
- example
  - success false
  - message student record not found

## API Requirements

set up clean restful endpoints for

- admin login
- create student
- update student
- delete student
- get single student
- get all students
- search students
- filter students
- also make sure the api natively supports
  - pagination
  - sorting
  - searching specifically by name email or roll number

## Database Design Requirements

build a solid mongodb schema for the students be sure to apply

- strict required field constraints
- sensible default values
- mongoose schema validation
- indexes on whatever fields were going to search a lot
- for the photos just upload them securely and save the file url or reference in the database dont store massive files directly in mongo

## Frontend Requirements

the admin dashboard needs to be super clean and responsive it should include

- a persistent sidebar navigation
- a main data table for listing students
- built in search and filter tools
- forms for adding and editing records
- a dedicated page to view all details for a single student
- an are you sure confirmation modal before letting anyone delete a record
- visual states for loading errors and successful actions
- it absolutely has to look good and work smoothly on desktop tablet and mobile devices

## Code Quality Requirements

i care a lot about maintainability so follow clean architecture
requirements

- keep react components modular and reusable
- use a logical clean folder structure
- strictly separate your concerns routes controllers models
- stick to standard naming conventions
- keep configurations in environment files
- use modern async await syntax
- handle api calls securely
- leave good comments explaining the trickier logic blocks

## Security Requirements

dont cut corners here implement

- password hashing
- jwt based auth
- locked down api endpoints
- strict input sanitization
- bulletproof validation on file uploads
- hidden environment variables
- solid blocks to prevent unauthorized api access

## Expected Output

Now i need you to generate the following

- the full frontend source code
- the complete backend code
- all the mongodb schemas
- the zod validation files
- all api routes and controllers
- the middleware for auth and error catching
- the file upload logic
- the entire responsive ui for the dashboard
- folder structure should be clean and structured
- step by step setup instructions
- a env example file
- some sample request response blocks to test the apis
  ensure that the whole web application scales well secure and follows standard mern best practices
