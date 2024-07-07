# Login Verification & Cookie Storage Process

Process adapted from [This Stack Overflow Article](https://stackoverflow.com/questions/4773609/what-is-a-relatively-secure-way-of-using-a-login-cookie)

## Login Creation

1. On a page, a user will enter a username and password
2. When they submit it, the password will be hashed and it along with the username will be sent to a database. The database will also store a unique user id
3. The user will have a login cookie (explained later) created and will be redirected to the dashboard

## Login Verification

1. A user will enter their already-existing username and password into a login page
2. When submitted, the POST method on the form will store the two pieces of data
3. A PHP script will check if both those values exist and will get a result column for a user with that username
4. If the column exists, the `password_verify()` function will check if the password entered matches the one in the database
5. If it does, the page will continue to cookie generation

## Logout Procedures

1. When a user logs out, a script will run
2. This will get the required info from the cookie
3. The database will be directed to delete any records that include the cookie's session token
4. This, in theory, should only delete the record from the current browser
5. Finally, the cookie will be deleted from the users browser

## Cookie Generation, Verification, and Storage

A cookie is a piece of data stored on a user's browser. It can be used to securely verify if a user has previously logged in

The cookie will consist of three pieces of data:
1. A username (hashed)
2. A series identifier
3. A session token

On the database, a table of tokens stores four pieces of data:
1. A series identifier
2. A session token
3. A username
4. An expiry date


### Generation:
1. Upon verification of a password, a cookie and database record will be created
2. Three variables will be created from either new or existing data:
   1. Username: Taken from the record in the `users` table
   2. Series Identifier: 32-byte (64 digits in hex) cryptographically-secure random string of hex digits
   3. Session Token: 32-byte (64 digits in hex) cryptographically-secure random string of hex digits
3. Upon creation of these variables, a cookie will be created storing the *HASHED* username, session identifier, and secret token, and will last for *x* days
4. A database record in the `session_tokens` table will be created, storing all the three variables along with an expiry date at the same time as the cookie

### Verification:
1. If a site is requested that requires access verification, it will first check for the existence of a cookie
2. If no cookie was found, the user will be redirected to the login page
3. If a cookie was found, verification can continue. ***If at any point this process fails, the user will be redirected to the login page***
4. First, a database record with the cookie triplet will be located
5. The username will be checked against the hash stored, and the session token will be verified to match
6. If successful, a new cookie and database record will **replace** the existing one, with the same series identifier and username but *different* session token

## Sessions

Sessions will be used while the browser is open to minimize the load on the database

1. When a website is accessed, it will first check if a session is active
2. If so, you don't need to check for a cookie
3. If you need to check for a cookie, set a session at the end