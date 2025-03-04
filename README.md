# Web development part 3

This project was done for my universitys web development course in part 3.

## Initialising

Instead of using JavaScript I decided to get some TypeScript practice with this particular project.

## Lessons learned

### Error handling

Error handling through middleware differs from JavaScript. Instead of programming for example a cast error and telling the app to use the middleware and send it to the handler with next function the functionality needed to be built in a more comlicated fashion.

According to a article:
The error handler had to be declared as a ErrorRequesHandler, and the specific errors declared as classes extending Error. To get a sufficien level of abstraction an abstract CustomError class was created, and the specific errors extend it. Now the errors can be used quite similarly as in JavaScript, telling the app to utilize errorHandler and sending errors with next function to it.
