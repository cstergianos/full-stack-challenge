# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
For the FE I used next.js which is essentially a very nice wrapper of react. I tried not to use 
many libraries that were not included in react/next.js. Only fortawesome was
added in order to show some icons nicely.

### Q) What's the command to start the frontend application locally?
If you use docker, the docker-compose.yml file is already edited to include the correct command.
If you would like to run in dev mode then when someone enters the frontend folder
a simple "npm run dev" will do it.

### Q) What libraries did you add to the backend? What are they used for?
For the BE again I tried to minimise as much as possible but I used express and cors
which are both pretty standard. I used body parser to handle the json as well as
node-fetch to manage to perform an api request

### Q) What's the command to start the backend application locally?
npm start should be sufficient. Again - if you are going to use docker, everything
is already in place

### Q) Any other comments we should read before evaluating your solution?

---

# General:

### Q) If you had more time, what further improvements or new features would you add?
I would like to of course make the FE nicer but also split up the components even further.

### Q) Which parts are you most proud of? And why?
I am very happy with the whole node.js implementation it was very enjoyable process

### Q) Which parts did you spend the most time with? What did you find most difficult?
No matter how much I used next.js in the past, the react FE took me significant time 
just because I wanted to split it and make it beautiful. Breaking up components and passing
flags and props between them for instance. Also I struggled with the shuffle button
since I had a strange bug which the shuffle was executed only once.

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.
I have to say that I really enjoyed it, especially the BE. I also like that docker is included, it makes 
everything so much easier. As a suggestion I would like to have done some solidity too.