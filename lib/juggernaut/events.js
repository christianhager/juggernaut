var redis   = require("./redis");
var sys      = require("sys");
Events = module.exports = {};

Events.client = redis.createClient();

Events.publish = function(key, value){
	sys.log("hello from event publish: " + key + ' ' + JSON.stringify(value))
  this.client.publish(
    'ost', 
    JSON.stringify(value)
  );
};

Events.subscribe = function(channel, client) {
	sys.log("hello from the event subscribe with channel: " + channel.name)
  this.publish(
    channel.name, 
    {
      channel:    channel.name,
      meta:       client.meta,
      session_id: client.session_id,
			test: "testing"
    }
  );
};

Events.unsubscribe = function(channel, client) {
  this.publish(
    "unsubscribe",
    {
      channel:    channel.name,
      meta:       client.meta,
      session_id: client.session_id
    }
  );  
};

Events.custom = function(client, data) {
  this.publish(
    "custom", 
    {
      meta:       client.meta,
      session_id: client.session_id,
      data:       data
    }
  );
};