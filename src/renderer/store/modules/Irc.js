const IRC = require('irc-framework');

let client = null;

const channelByName = {};
const maxEventTimeDiffMillis = 300 * 1000;

const state = {
  client: {
    status: '',
  },
  channels: [],
};

const getters = {
  channel: () => name => channelByName[name],
  channels: state => state.channels,
};

const mutations = {
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
};

const actions = {
  connect(context, opts) {
    if (client) return;

    // const ircOpts = {
    //   ...opts,
    //   userName: opts.username,
    //   realName: opts.realname,
    // };

    // client = new irc.Client(opts.host, opts.nick, ircOpts);

    client = new IRC.Client();
    client.connect({
      ...opts,
    });

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
      let channel = context.getters.channel(channelName);
      if (!channel) {
        context.commit('addChannel', channelName);
        channel = context.getters.channel(channelName);
      }
      // context.commit('addMessage', {
      //   from,
      //   to,
      //   message,
      // });
      // console.log(channel);

      const msgs = channel.messages;
      const last = msgs.length > 0 ?
        msgs[msgs.length - 1] :
        null;

      if (
        last &&
        event.ident === last.ident &&
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
