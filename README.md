# redis-llen-statsd

This project will send the length of some redis lists (LLEN) to StatsD.

It is distributed in a docker container to make deployment easy.

## Usage

Set the following environment variables:

  * STATSD_PREFIX: The prefix for the keys sent to statsd
  * STATSD_HOST: The statsd server hostname
  * REDIS_URI: The URI of the redis server

Then call the command with a list of the queues to monitor.

Example:

```
docker run -e REDIS_URI=redis://redis -e STATSD_HOST=stats.com -e STATSD_PREFIX=queues realgeeks/redis-llen-statsd node app.js queue1 queue2 queue3
```

