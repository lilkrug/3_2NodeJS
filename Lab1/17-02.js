const redis = require('redis');
const client = redis.createClient({url: 'redis://localhost:6379/'});

client.on('connect',()=>
{
    console.log('Connection accepted');
});

client.on('ready', () => {console.log('ready'); })

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

        console.time('10000 sets');
        await sets(client);
        
        console.time('10000 gets');
        await gets(client);

        console.time('10000 dels');
        await dels(client);
        


        async function sets(client)
        {
            console.log('sets');
        
            for(let n = 0;n < 10000;n++)
            {
                await client.set(`${n}`,`set${n}`);
            }
            console.timeEnd(`10000 sets`);
            
        }
        
        async function gets(client)
        {
            console.log('gets');
            for(let n = 0;n < 10000;n++)
            {
                await client.get(`${n}`, `get${n}`)
            }  
            console.timeEnd(`10000 gets`);
        }
        
        async function dels(client)
        {
            console.log('dels');
        
            for(let n = 0;n < 10000;n++)
            {
                await client.del(`${n}`, `dels${n}`)
            }
            console.timeEnd(`10000 dels`);
        
        }

        await client.quit();
    })()
    
    
    
    
    





