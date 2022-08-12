"use strict";
var Redis = require("ioredis");

exports.handler = (event, context, callback) => {
  const port = process.env.PORT;
  const client = new Redis.Cluster([
    {
      host: process.env.REDIS_HOST_1,
      port: port,
    },
    {
      host: process.env.REDIS_HOST_2,
      port: port,
    },
    {
      host: process.env.REDIS_HOST_3,
      port: port,
    },
  ]);

  const key = "viewcount";
  const start = 0;
  const end = 10;

  client.zrevrange(key, start, end, (err, ret) => {
    if (err) {
      console.info("err: ", err);
    } else {
      console.info("ret: ", ret);
    }
    client.quit(() => {
      callback(err, { body: ret });
    });
  });
};
