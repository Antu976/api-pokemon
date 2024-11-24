// https://dinogeek.me/FR/NodeJS/Comment-creer-un-systeme-de-logging-avec-Node-js.html

// un logger est un fichier qui nous permettent de garder une trace des logs(ennregistrement généres par une application ou système ils documentent ce qui se passe pdt l'éxecution), ainsi il ne s'affiche pas que dans la console mais aussi dans un fichier 

var winston = require('winston');
var logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(), 
  defaultMeta: { service: 'user-service' }, 
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple() 
  }));
}

export default logger;


// Pour enregistrer un log:
//logger.info(‘Information log’);
//logger.warn(‘Warning log’);
// logger.error(‘Error log’);