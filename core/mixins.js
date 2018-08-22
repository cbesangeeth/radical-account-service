'use strict';

module.exports = (cfg) => {
    const _    = require('lodash');

    /**
      * A Timestamped entity
      *
      * @constructor
      * @class mixins.Timestamped
      */
    class Timestamped {
        constructor() {
            /**
            * @property createdAt
            * @type {Date}
            */
            this.createdAt = null;

            /**
            * @property updatedAt
            * @type {Date}
            */
            this.updatedAt = null;
        }

        /**
        * Update timestamps
        *
        * @method touch
        * @for mixins.Timestamped
        */
        touch() {
            this.updatedAt = new Date(_.now());

            if (!this.createdAt) {
                this.createdAt = this.updatedAt;
            }
        }
    }

    /**
    * A storable entity
    *
    * @constructor
    * @class mixins.Storable
    * @uses mixins.Timestamped
    */
    class Storable extends Timestamped {
        constructor() {
            super();

            /**
             * @property id
             * @type {integer}
             */
            this.id = null;

            /**
             * @property isDeleted
             * @type {boolean}
             * @default false
             */
            this.isDeleted = false;
        }
    }

    /**
    * Someone with a displayName
    *
    * @constructor
    * @class mixins.Person
    * @uses mixins.Storable
    */
    class Person extends Storable {
        constructor() {
            super();

            /**
             * @property displayName
             * @type {String}
             */
            this.displayName = null;
        }
    }

    /**
     * Someone with an email address and / or phone
     *
     * @constructor
     * @class mixins.Contact
     * @uses mixins.Person
     */
    class Contact extends Person {
        constructor() {
            super();

            /**
             * @property email
             * @type {String}
             */
            this.email = null;

            /**
             * @property phone
             * @type {String}
             */
            this.phone = null;
        }
    }

    return {
        Timestamped,
        Storable,
        Person,
        Contact,
    };
};