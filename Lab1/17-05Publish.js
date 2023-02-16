const redis = require('redis');
const client = redis.createClient({url: 'redis://localhost:6379/'});

client.on('connect',()=>
{
    console.log('Connection accepted');
});

client.on('ready', () => {console.log('ready')})

client.on('error', err => 
{       
    console.log('error: ' + err);
});

client.on('end', () => 
{
    console.log('End');
});
     
(async() => {

    await client.connect();
    await client.publish('one', 'message 1');
    await client.publish('two', 'message 2');
    
    setTimeout(async() => 
    {
        await client.publish('one', 'message 3 from pub-client');
    }, 5000);
    
    setTimeout(async() => 
    {
        await client.publish('one', 'message 4 from pub-client');
    }, 10000);

    setTimeout(async () =>{ await client.quit(); } , 15000);
})()







