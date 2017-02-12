package invokeAndQuery

import (
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"build-chaincode/entities"
	"build-chaincode/util"
)

func GetTransactionsByUserID(stub shim.ChaincodeStubInterface, userID string) ([]entities.Transaction, error) {
	transactions, err := util.GetTransactions(stub)
	if err != nil {
		return []entities.Transaction{}, err
	}

	filteredTransactions := []entities.Transaction{}

	for _, transaction := range transactions {
		if (transaction.Sender.UserID == userID || transaction.Receiver.UserID == userID) {
			filteredTransactions = append(filteredTransactions,transaction)
		}
	}

	return filteredTransactions, nil
}

func GetTransactionsByUserIDAndTimeframe(stub shim.ChaincodeStubInterface, userID string, startDate int64, endDate int64) ([]entities.Transaction, error) {
	transactions, err := GetTransactionsByUserID(stub,userID)
	if err != nil {
		return []entities.Transaction{}, err
	}

	filteredTransactions := []entities.Transaction{}

	for _, transaction := range transactions {
		if (transaction.Timestamp >= startDate && transaction.Timestamp <= endDate) {
			filteredTransactions = append(filteredTransactions,transaction)
		}
	}

	return filteredTransactions, nil
}

func GetTransactionsByTimeframe(stub shim.ChaincodeStubInterface, startDate int64, endDate int64) ([]entities.Transaction, error) {
	transactions, err := util.GetTransactions(stub)
	if err != nil {
		return []entities.Transaction{}, err
	}

	filteredTransactions := []entities.Transaction{}

	for _, transaction := range transactions {
		if (transaction.Timestamp >= startDate && transaction.Timestamp <= endDate) {
			filteredTransactions = append(filteredTransactions,transaction)
		}
	}

	return filteredTransactions, nil
}