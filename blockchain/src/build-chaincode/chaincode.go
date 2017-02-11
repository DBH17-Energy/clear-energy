package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"os"
	"build-chaincode/util"
	"build-chaincode/entities"
	"build-chaincode/invokeAndQuery"
	"strconv"
)

var logger = shim.NewLogger("fabric-boilerplate")
//======================================================================================================================
//	 Structure Definitions
//======================================================================================================================
//	SimpleChaincode - A blank struct for use with Shim (An IBM Blockchain included go file used for get/put state
//					  and other IBM Blockchain functions)
//==============================================================================================================================
type Chaincode struct {
}

//======================================================================================================================
//	Invoke - Called on chaincode invoke. Takes a function name passed and calls that function. Passes the
//  		 initial arguments passed are passed on to the called function.
//======================================================================================================================

func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Invoke is running " + functionName)

	if functionName == "init" {
		return t.Init(stub, "init", args)
	} else if functionName == "resetIndexes" {
		return nil, util.ResetIndexes(stub, logger)
	} else if functionName == "addUser" {
		return nil, t.addUser(stub, args[0], args[1])
	} else if functionName == "addTestdata" {
		return nil, t.addTestdata(stub, args[0])
	} else if functionName == "addTransaction" {
		transaction := entities.Transaction{}
		transactionAsJsonBytes := []byte(args[0])
		err := json.Unmarshal(transactionAsJsonBytes, &transaction)
		if err != nil {
			return nil, errors.New("Error while unmarshalling transaction")
		}

		return nil, util.StoreObjectInChain(stub, transaction.TransactionID, util.TransactionsIndexName,transactionAsJsonBytes)
	}

	return nil, errors.New("Received unknown invoke function name")
}

//======================================================================================================================
//	Query - Called on chaincode query. Takes a function name passed and calls that function. Passes the
//  		initial arguments passed are passed on to the called function.
//=================================================================================================================================
func (t *Chaincode) Query(stub shim.ChaincodeStubInterface, functionName string, args []string) ([]byte, error) {
	logger.Infof("Query is running " + functionName)

	result, err := t.GetQueryResult(stub, functionName, args)
	if err != nil {
		return nil, err
	}

	return json.Marshal(result)
}

func (t *Chaincode) GetQueryResult(stub shim.ChaincodeStubInterface, functionName string, args []string) (interface{}, error) {
	if functionName == "getUser" {
		user, err := util.GetUser(stub, args[0])
		if err != nil {
			return nil, err
		}

		return user, nil
	} else if functionName == "authenticateAsUser" {
		user, err := util.GetUser(stub, args[0])
		if err != nil {
			logger.Infof("User with id %v not found.", args[0])
		}

		return t.authenticateAsUser(stub, user, args[1]), nil
	} else if functionName == "getTransactionsByUserID" {
		return invokeAndQuery.GetTransactionsByUserID(stub, args[0])
	} else if functionName == "getTransactions" {
		return util.GetTransactions(stub)
	} else if functionName == "getTransactionsByUserIDAndTimeframe" {
		startDateInMilliseconds, err := strconv.Atoi(args[1])
		if err != nil {
			return nil, errors.New("Could not convert startDate to int. Reason: " + err.Error())
		}

		endDateInMilliseconds, err := strconv.Atoi(args[2])
		if err != nil {
			return nil, errors.New("Could not convert endDate to int. Reason: " + err.Error())
		}

		return invokeAndQuery.GetTransactionsByUserIDAndTimeframe(stub, args[0], int64(startDateInMilliseconds), int64(endDateInMilliseconds))
	} else if functionName == "getTransactionsByTimeframe" {
		startDateInMilliseconds, err := strconv.Atoi(args[0])
		if err != nil {
			return nil, errors.New("Could not convert startDate to int. Reason: " + err.Error())
		}

		endDateInMilliseconds, err := strconv.Atoi(args[1])
		if err != nil {
			return nil, errors.New("Could not convert endDate to int. Reason: " + err.Error())
		}

		return invokeAndQuery.GetTransactionsByTimeframe(stub, int64(startDateInMilliseconds), int64(endDateInMilliseconds))
	}

	return nil, errors.New("Received unknown query function name")
}

//======================================================================================================================
//  Main - main - Starts up the chaincode
//======================================================================================================================

func main() {
	// LogDebug, LogInfo, LogNotice, LogWarning, LogError, LogCritical (Default: LogDebug)
	logger.SetLevel(shim.LogInfo)

	logLevel, _ := shim.LogLevel(os.Getenv("SHIM_LOGGING_LEVEL"))
	shim.SetLoggingLevel(logLevel)

	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting SimpleChaincode: %s", err)
	}
}

//======================================================================================================================
//  Init Function - Called when the user deploys the chaincode
//======================================================================================================================

func (t *Chaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

//======================================================================================================================
//  Invoke Functions
//======================================================================================================================

func (t *Chaincode) addUser(stub shim.ChaincodeStubInterface, index string, userJSONObject string) error {
	id, err := util.WriteIDToBlockchainIndex(stub, util.UsersIndexName, index)
	if err != nil {
		return errors.New("Error creating new id for user " + index)
	}

	err = stub.PutState(string(id), []byte(userJSONObject))
	if err != nil {
		return errors.New("Error putting user data on ledger")
	}

	return nil
}

func (t *Chaincode) addTestdata(stub shim.ChaincodeStubInterface, testDataAsJson string) error {
	var testData entities.TestData
	err := json.Unmarshal([]byte(testDataAsJson), &testData)
	if err != nil {
		return errors.New("Error while unmarshalling testdata, reason:" + err.Error())
	}

	for _, user := range testData.Users {
		userAsBytes, err := json.Marshal(user);
		if err != nil {
			return errors.New("Error marshalling testUser, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, user.UserID, util.UsersIndexName, userAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, transaction := range testData.Transactions {
		transactionAsBytes, err := json.Marshal(transaction)
		if err != nil {
			return errors.New("Error marshalling testTransaction, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, transaction.TransactionID, util.TransactionsIndexName, transactionAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, device := range testData.Devices {
		deviceAsBytes, err := json.Marshal(device)
		if err != nil {
			return errors.New("Error marshalling testDevice, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, device.DeviceID, util.DevicesIndexName, deviceAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	for _, wallet := range testData.Wallets {
		walletAsBytes, err := json.Marshal(wallet)
		if err != nil {
			return errors.New("Error marshalling testWallet, reason: " + err.Error())
		}

		err = util.StoreObjectInChain(stub, wallet.WalletID, util.WalletsIndexName, walletAsBytes)
		if err != nil {
			return errors.New("error in storing object, reason: " + err.Error())
		}
	}

	return nil
}

//======================================================================================================================
//		Query Functions
//======================================================================================================================

func (t *Chaincode) authenticateAsUser(stub shim.ChaincodeStubInterface, user entities.User, passwordHash string) (entities.UserAuthenticationResult) {
	if user == (entities.User{}) {
		fmt.Println("User not found")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	if user.Hash != passwordHash {
		fmt.Println("Hash does not match")
		return entities.UserAuthenticationResult{
			User: user,
			Authenticated: false,
		}
	}

	return entities.UserAuthenticationResult{
		User: user,
		Authenticated: true,
	}
}

