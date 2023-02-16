let redis = require('redis')
let client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err)
})

client.connect().then(async () => {
    console.log('connect');
    await client.set('incr',0)
    console.time('HSET');
    await dhset();
    console.timeEnd('HSET');

    console.time('HGET');
    await dhget();
    console.timeEnd('HGET');
    client.quit();
});

async function dhset() {
    for (var i = 0; i < 10000; i++){
        await client.hSet(`hset${i}`, 'kav',i);
    }
}

async function dhget() {
    for (var i = 0; i < 10000; i++){
        await client.hGet(`hset${i}`,'kav');
    }
}