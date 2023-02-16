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

    const oneChanelSub = client.duplicate();
    await oneChanelSub.connect();
    await oneChanelSub.subscribe('one', (message) => {
        console.log(`One sent message: ${message}`);
    })


    oneChanelSub.on('error', err => console.error(err))

    setTimeout(async() =>{
       await oneChanelSub.unsubscribe();
       await oneChanelSub.quit();
    }, 30000)
})()

     





