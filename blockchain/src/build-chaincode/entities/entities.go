package entities

type ECertResponse struct {
	OK string `json:"OK"`
}

type TestData struct {
	Users        []User        `json:"users"`
	Transactions []Transaction `json:"transactions"`
	Devices      []Device      `json:"devices"`
	Wallets      []Wallet      `json:"wallets"`
}

type TestDataElement interface {
	ID() string
}

type User struct {
	TestDataElement `json:"-"`
	UserID   string `json:"userID"`
	Role     string `json:"role"`
	Username string `json:"username"`
	Password string `json:"password"`
	Salt     string `json:"salt"`
	Hash     string `json:"hash"`
}

type Transaction struct {
	TestDataElement `json:"-"`
	TransactionID   string  `json:"id"`
	TransactionType string  `json:"transactionType"`
	Sender          User    `json:"sender"`
	Receiver        User    `json:"receiver"`
	EUnit           float32 `json:"eunit"`
	Device          Device  `json:"device"`
	EType           string  `json:"etype"`
	CO2             float32 `json:"co2"`
	Timestamp       int64   `json:"timestamp"`
}

type Device struct {
	TestDataElement `json:"-"`
	DeviceID    string  `json:"id"`
	DeviceType  string  `json:"deviceType"`
	EnergyType  string  `json:"energyType"`
	Owner       User    `json:"owner"`
	LocationX   float32 `json:"locationX"`
	LocationY   float32 `json:"locationY"`
	TotalEUnit  float32 `json:"totalEUnit"`
	TotalCO2    float32 `json:"totalCo2"`
	CO2PerEUnit float32 `json:"co2PerEUnit"`
}

type Wallet struct {
	TestDataElement `json:"-"`
	WalletID   string  `json:"id"`
	Owner      User    `json:"owner"`
	TotalEUnit float32 `json:"totalEUnit"`
	TotalCO2   float32 `json:"totalCo2"`
}

type UserAuthenticationResult struct {
	User          User
	Authenticated bool
}

type Users struct {
	Users []User `json:"users"`
}

func (t *User) ID() string {
	return t.UserID
}

func (t *Device) ID() string {
	return t.DeviceID
}

func (t *Transaction) ID() string {
	return t.TransactionID
}

func (t *Wallet) ID() string {
	return t.WalletID
}