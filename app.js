var redis = require('redis');
var parseRedisUrl = require('parse-redis-url')(redis);
var queues = require('minimist')(process.argv.slice(2))._;
var StatsD = require('node-statsd');
var statsd = new StatsD({host:process.env.STATSD_HOST});

if (!process.env.STATSD_HOST) {
  console.error('Please set the STATSD_HOST environment variable');
  process.exit(1);
}

if (!queues.length) {
  console.error('Need to pass the queues to watch');
  process.exit(1);
}

var prefix = process.env.STATSD_PREFIX;
if (!prefix) {
  console.error('Please pass a statsd prefix');
  process.exit(1);
}

var interval = process.env.INTERVAL;
var url = process.env.REDIS_URI;
if (!interval) {
  interval = 1000;
}

parseRedisUrl.createClient(process.env.REDIS_URI, function(err, client) {
  setInterval(function() {
    queues.forEach(function(queue) {
      client.llen(queue, function(err, length) {
        console.log(prefix + '.' + queue + '.' + length);
        statsd.gauge(prefix + '.' + queue, length);
      });
    });
  }, interval);
});
