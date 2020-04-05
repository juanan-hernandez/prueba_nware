# Technical test NWARE
(*)Insights from the test:

- This was my very first time building a lambda with Node and it was such an entertaining task. I had to figure out many 
stuff about JS that I didn't know and that was the part which took me more time. Specially:
    - Working with async functions and waiting for the response.
    - As I come from the Python syntax, I tried to simplify the lines for transformation the most. Maybe there is some
    other valid transformations more optimal and/or simpler. 
    - In other JS project I have used the module 'http' for getting the response from an API, but in this case, I don't 
    know why the response I was getting had no 'body' so it was impossible to retrieve the data. I found 'superagent' 
    module which helped me out a lot (but I don't really know whether is a wise choice)
    - As I was also newbie with DynamoDB, it took me a time to understand that retrieving all the information
    from the table was not possible with 'query', but with 'scan'. At first I was trying to retrieve the
    information as in a SQL query (select * from table_name where pk in (...)).
    - Tests are missing as I have never done test with JS, so maybe the time it could take me to learn it would be 
    too much for this task. I wish I learn it in a near future. 
    
I hope you like my solution! 

Regards