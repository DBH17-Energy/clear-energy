@echo off
echo Getting baseimage...
echo.
docker pull hyperledger/fabric-baseimage:x86_64-0.2.2
docker tag hyperledger/fabric-baseimage:x86_64-0.2.2 hyperledger/fabric-baseimage:latest

echo.
echo Downloading go dependencies...
echo.
docker-compose -f docker-util.yml run utils bash -c "cd blockchain/src/build-chaincode && GOPATH=$(pwd)/../.. govend -v"

echo.
echo Downloading images...
echo.
docker-compose pull

echo.
echo Building images...
echo.
docker-compose build

echo.
echo Done! Start with docker-compose up.