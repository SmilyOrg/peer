import { Model } from '@vuex-orm/core';
import Channel from './Channel';

export default class Server extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'servers';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      host: this.attr(''),
      port: this.attr(''),
      nick: this.attr(''),
      username: this.attr(''),
      channels: this.hasMany(Channel, 'server_id'),
    };
  }
}
