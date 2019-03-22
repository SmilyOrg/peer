import Server from '../models/Server';
import Channel from '../models/Channel';
// import Message from '../models/Message';

const IRC = require('irc-framework');

// const channelByName = {};
const maxEventTimeDiffMillis = 300 * 1000;

const state = {
  // servers: [],
  // servers: [
  //   {
  //     id: 'efnet',
  //     name: 'EFNet',
  //     channels: [{
  //       id: 'test',
  //       name: '#test',
  //       active: false,
  //     }],
  //   },
  // ],
  // client: {
  //   status: '',
  // },
  // channels: [],
};

const getters = {
  // channel: () => (server, id) => server.channels.find(channel => channel.id === id),
  // channels: state => state.channels,
  // servers: state => state.servers,
  // server: () => serverId => state.servers.find(server => server.id === serverId),
};

const mutations = {
  addServer(state, server) {
    state.servers.push(server);
  },
  /*
  addChannel(state, name) {
    if (channelByName[name]) return;
    const channel = {
      name,
      messages: [],
    };
    channelByName[name] = channel;
    state.channels.push(channel);
  },
  addMessage(state, msg) {
    const channel = channelByName[msg.to];
    if (!channel) return;
    msg.index = channel.messages.length;
    channel.messages.push(msg);
  },
  */
};

const actions = {
  connect(context, opts) {
    // if (client) return;

    // const ircOpts = {
    //   ...opts,
    //   userName: opts.username,
    //   realName: opts.realname,
    // };

    // client = new irc.Client(opts.host, opts.nick, ircOpts);

    const client = new IRC.Client();
    const server = {
      client,
      ...opts,
      // channels: [],
      // channels: [
      //   {
      //     id: 'test',
      //     server_id: 'efnet',
      //     name: '#test',
      //     active: false,
      //   },
      // ],
    };
    // context.commit('addServer', server);

    client.connect({
      ...opts,
    });

    console.log(server);

    Server.insert({ data: server });
    // Channel.insert({
    //   data: {
    //     id: 'efnet_test',
    //     server_id: 'efnet',
    //     name: '#test',
    //     active: false,
    //   },
    // });

    // console.log(Server.find(server.id));
    // console.log(Server.query().whereId(server.id).with('channels').get());
    // console.log(Channel.query().where('server_id', 'efnet').get());

    // client.addListener('error', (message) => {
    //   console.log('error: ', message);
    // });

    // client.on('join', (event) => {
    //   console.log('user joined', event);
    // });
    
    // client.on('userlist', (event) => {
    //   console.log('userlist for', event.channel, event.users);
    // });
    
    // client.on('part', (event) => {
    //   console.log('user part', event);
    // });
    
    client.on('message', (event) => {
      
      // console.log(event);
      
      const channelName = event.target;
      const channels = Channel
        .query()
        .where('server_id', server.id)
        .where('name', channelName)
        .get();

      let channel;
      const newChannel = channels.length === 0;
      if (newChannel) {
        channel = {
          irc: client.channel(channelName),
          id: `${server.id}_${channelName.slice(1)}`,
          server_id: server.id,
          name: channelName,
          messages: [],
        };
        console.log(channel);
      } else {
        [channel] = channels;
      }
      
      // Message.insert({
      //   data: {
      //     id: msgId,
      //     ident: event.ident,
      //     events: [event],
      //   },
      // });

      
      const msgs = channel.messages;
      const last = msgs.length > 0 ?
        msgs[msgs.length - 1] :
        null;

      if (
        last && event.ident === last.ident &&
        (event.time - last.events[last.events.length - 1].time) <= maxEventTimeDiffMillis
      ) {
        last.events.push(event);
      } else {
        msgs.push({
          id: msgs.length,
          ident: event.ident,
          events: [event],
        });
      }
      
      if (newChannel) {
        Channel.insert({
          data: channel,
        });
      }
      // {
      //   id: msgs.length,
      //   ident: event.ident,
      //   events: [event],
      // }

      // console.log(event);

      // const channelName = event.target;
      // let channel = context.getters.channel(channelName);
      // if (!channel) {
      //   context.commit('addChannel', channelName);
      //   channel = context.getters.channel(channelName);
      // }

      // const msgs = channel.messages;
      // const last = msgs.length > 0 ?
      //   msgs[msgs.length - 1] :
      //   null;

      // if (
      //   last &&
      //   event.ident === last.ident &&
      //   (event.time - last.events[last.events.length - 1].time) <= maxEventTimeDiffMillis
      // ) {
      //   last.events.push(event);
      // } else {
      //   msgs.push({
      //     id: msgs.length,
      //     ident: event.ident,
      //     events: [event],
      //   });
      // }

      // console.log(channel);
      // console.log(`${from} => ${to}: ${message}`);
    });
  
  },
  disconnect() {
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
