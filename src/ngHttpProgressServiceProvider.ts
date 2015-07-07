/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="./ngHttpProgressInterfaces.ts" />
/// <reference path="./ngHttpProgressService.ts" />
/// <reference path="./ngHttpProgressInterceptor.ts" />

module NgHttpProgress {

    export declare class Error {
        public name: string;
        public message: string;
        public stack: string;
        constructor(message?: string);
    }

    export class NgHttpProgressException extends Error {

        constructor(public message: string) {
            super(message);
            this.name = 'NgHttpProgressException';
            this.message = message;
            this.stack = (<any>new Error()).stack;
        }
        toString() {
            return this.name + ': ' + this.message;
        }
    }

    export class NgHttpProgressServiceProvider implements ng.IServiceProvider, IngHttpProgressServiceProvider {

        private config: INgHttpProgressServiceConfig;

        /**
         * Initialise the service provider
         */
        constructor() {

            //initialise service config
            this.config = {
                color: '#FF0000',
                height: '10px'
            };

        }

        /**
         * Set the configuration
         * @param config
         * @returns {NgHttpProgress.NgHttpProgressServiceProvider}
         */
        public configure(config:INgHttpProgressServiceConfig) : NgHttpProgressServiceProvider {
            this.config = _.defaults(config, this.config);
            return this;
        }

        public $get = ['$q', '$timeout', 'ngProgress', function ngHttpProgressServiceFactory($q, $timeout, ngProgress) {
            return new NgHttpProgressService(this.config, $q, $timeout, ngProgress);
        }];

    }



    angular.module('ngHttpProgress', ['ngProgress'])
        .provider('ngHttpProgress', NgHttpProgressServiceProvider)
        .service('ngHttpProgressInterceptor', NgHttpProgressInterceptor)
        .config(['$httpProvider', '$injector', ($httpProvider:ng.IHttpProvider) => {

            $httpProvider.interceptors.push('ngHttpProgressInterceptor');
        }])
    ;


}
