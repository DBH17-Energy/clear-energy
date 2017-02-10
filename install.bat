echo "Getting baseimage..."
docker pull hyperledger/fabric-baseimage:x86_64-0.2.2
docker tag hyperledger/fabric-baseimage:x86_64-0.2.2 hyperledger/fabric-baseimage:latest

echo "Downloading go dependencies..."
docker-compose -f docker-util.yml run utils bash -c "cd blockchain/src/build-chaincode && GOPATH=$(pwd)/../.. govend -v"

echo "Downloading images..."
docker-compose pull

echo "Building images..."
docker-compose build

echo "Done! Start with docker-compose up."