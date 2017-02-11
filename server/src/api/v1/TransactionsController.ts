import {Get, Post, JsonController, Param, Body, Req, UseBefore} from 'routing-controllers';
import {JSONWebToken} from '../../utils/JSONWebToken';
import {Transaction} from '../../entities/transaction.model';
import {UserAuthenticatorMiddleware} from '../../middleware/UserAuthenticatorMiddleware';
import {CORSMiddleware} from '../../middleware/CORSMiddleware';
import {LoggerFactory} from '../../utils/LoggerFactory';
import {Service} from 'typedi';

@JsonController('/transactions')
@UseBefore(UserAuthenticatorMiddleware, CORSMiddleware)
@Service()
export class TransactionsController {
    public constructor(private loggerFactory: LoggerFactory) { }

    @Get('/:id')
    public getTransactionsByUserID(@Param('id') userID: string, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return request.blockchain.query('getTransactionsByUserID', [userID], enrollmentID);
    }

    @Get('/:id/:startTime-:endTime')
    public getTransactionsByUserIDAndByTimeframe(@Param('id') userID: string, @Param('startTime') startTime: number, @Param('endTime') endTime: number, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return request.blockchain.query('getTransactionsByUserIDAndByTimeframe', [userID, startTime, endTime], enrollmentID);
    }

    @Get('/')
    public getTransactions(@Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return request.blockchain.query('getTransactions', [], enrollmentID);
    }

    @Get('/:startTime-:endTime')
    public getTransactionsByTimeframe(@Param('startTime') startTime: number, @Param('endTime') endTime: number, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return request.blockchain.query('getTransactionsByTimeframe', [startTime, endTime], enrollmentID);
    }

    @Post('/')
    public post(@Body() transaction: Transaction, @Req() request: any): any {
        let enrollmentID = new JSONWebToken(request).getUserID();

        return request.blockchain.invoke('createTransaction', [JSON.stringify(transaction)], enrollmentID);
    }
}