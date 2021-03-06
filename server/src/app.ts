'use strict';

import 'reflect-metadata';
import {Routes} from './routes';
import {BlockchainFactory} from './blockchain/BlockchainFactory';
import {LoggerFactory} from './utils/LoggerFactory';
import {Config} from './config';
import {Request, Response, NextFunction, Router} from 'express';
import {DeployPolicy} from './blockchain/Blockchain';
import {useExpressServer, useContainer} from 'routing-controllers';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import {Container} from 'typedi';
import {TransactionGenerator} from './testdata/transaction-generator';

class App {
    public async run(): Promise<void> {
        const logger = new LoggerFactory().create();
        const fs = require('fs');
        const https = require('https');
        const blockchain = BlockchainFactory.create(logger, Config.getServerDirectory());
        const chaincodeId = await blockchain.init(DeployPolicy.NEVER);
        logger.debug('[App]', 'Using chaincode id', chaincodeId);

        const blockchainClient = await blockchain.createClient(chaincodeId);
        process.on('unhandledRejection', (error: Error, promise: Promise<any>) => {
            logger.error(error.stack);
        });

        //Send 100 random transactions per second to the blockchain
        new TransactionGenerator(blockchainClient , logger).submitRandomTransactions();

        const app = express();
        app.use((request: any, response: any, next: NextFunction) => {
            request.blockchain = blockchainClient;
            next();
        });

        app.use(cors());

        // Enable CORS
        // http://stackoverflow.com/questions/11181546/how-to-enable-cross-origin-resource-sharing-cors-in-the-express-js-framework-o
        app.all('/', (req: any, res: any, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            next();
        });

        useContainer(Container);
        // initialize routing
        useExpressServer(app, {
            routePrefix: '/api/v1',
            controllers: [__dirname + '/api/v1/*.js']
        });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use('/', express.static(path.join(__dirname, '../client/dist')));
        app.use(morgan(null, <morgan.Options> {
            stream: {
                skip: (request: Request, response: Response) => response.statusCode < 400,
                write: (message: string): void => {
                    logger.debug(message);
                }
            }
        }));

        // routes
        const expressRouter: Router = express.Router();
        new Routes(blockchainClient, logger).register(expressRouter);
        app.use('/', expressRouter);

        const port = (process.env.VCAP_PORT || process.env.PORT || 8080);
        const sslPort = 8443;
        const host = (process.env.VCAP_HOST || process.env.HOST || 'localhost');

        if (fs.existsSync(path.join(__dirname, '../resources/ssl/certificate.pem'))) {
            logger.info('[NodeJS] Got certificate, starting HTTPS server');
            var options = {
                key: fs.readFileSync(path.join(__dirname, '../resources/ssl/private.key')),
                cert: fs.readFileSync(path.join(__dirname, '../resources/ssl/certificate.pem'))
            };
            https.createServer(options, app).listen(sslPort);
            logger.info(`[NodeJS] Express server listening at https://${host}:${sslPort}`);
        } else {
            logger.info('[NodeJS] No certificate at ' + path.join(__dirname, '../resources/ssl/certificate.pem') + ', starting HTTP server');
            app.listen(port);
            logger.info(`[NodeJS] Express server listening at http://${host}:${port}`);
        }
    }
}

new App().run();