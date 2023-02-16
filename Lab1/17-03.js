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
     

    (async()=>{

        await client.connect();
        await incrQuery(client);
        await decrQuery(client);


        async function incrQuery(client){
            console.time(`10000 incr`);
            for (let n = 0; n < 10000; n++) 
            {
                await client.incr('incr');
            }
            console.timeEnd(`10000 incr`);
        
        }
    
        async function decrQuery(client){
            console.time(`10000 decr`);
            for (let n = 0; n < 10000; n++) 
            {
                await client.decr('decr');
            }
            console.timeEnd(`10000 decr`);
        
        }

        await client.quit();
    })()

    