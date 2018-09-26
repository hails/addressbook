const escriba = require('escriba')
const log4js = require('log4js')

const log4jsConfig = {
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d] %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
  },
}

log4js.configure(log4jsConfig)

const escribaConfig = {
  loggerEngine: log4js.getLogger('ADDRESSBOOK'),
  service: 'ADDRESSBOOK',
  sensitive: {
    password: {
      paths: ['body.password'],
      pattern: /.*/g,
      replacer: '*',
    },
  },
  httpConf: {
    propsToLog: {
      request: [
        'id',
        'method',
        'url',
        'body',
        'httpVersion',
        'referrer',
        'referer',
        'user-agent',
      ],
      response: [
        'id',
        'method',
        'url',
        'statusCode',
        'body',
        'httpVersion',
        'referrer',
        'referer',
        'user-agent',
        'latency',
      ],
    },
    envToLog: ['SHELL', 'PATH'],
  },
}

module.exports = escriba(escribaConfig)
