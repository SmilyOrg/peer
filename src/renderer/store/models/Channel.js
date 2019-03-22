import { Model } from '@vuex-orm/core';

export default class Channel extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'channels';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      server_id: this.attr(null),
      name: this.attr(''),
      messages: this.attr([]),
      irc: this.attr(null),
    };
  }
}
