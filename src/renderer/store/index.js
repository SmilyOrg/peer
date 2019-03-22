import { } from 'vuex-electron';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Server from './models/Server';
import Channel from './models/Channel';
import Message from './models/Message';

import modules from './modules';

Vue.use(Vuex);

const database = new VuexORM.Database();
database.register(Server, {});
database.register(Channel, {});
database.register(Message, {});

export default new Vuex.Store({
  modules,
  plugins: [
    VuexORM.install(database),
    // createPersistedState(),
    // createSharedMutations(),
  ],
  // strict: process.env.NODE_ENV !== 'production',
});
