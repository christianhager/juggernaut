var redis   = require("./redis");
var sys      = require("sys");
Events = module.exports = {};

Events.client = redis.createClient();

Events.publish = function(key, value){
  this.client.publish(
    "kjeks", 
    JSON.stringify(value)
  );
};

Events.subscribe = function(channel, client) {
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
    "kjeks",
    {
      channel:    channel.name,
      meta:       client.meta,
      session_id: client.session_id,
			event: 'left'
    }
  );  
};

Events.custom = function(client, data) {
	sys.log("hellofrom custom: "  + JSON.stringify(data))
  this.publish(
    "custom", 
    {
      meta:       client.meta,
      session_id: client.session_id,
      data:       data
    }
  );
};