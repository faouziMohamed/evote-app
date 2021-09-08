#!/usr/bin/env bash

echo "Copying some file to build directory..."
cp package.json yarn.lock dist/


echo 
echo 
echo "Configure deploy script in 'package.json' file..."
sed -i '/"prepare"/d' dist/package.json
sed -i 's# node ./dist/# node ./#' dist/package.json
sed -i 's#\("build"\)\(.\+\),#\1: "echo Building...",#' dist/package.json
sed -i 's#dist/bin#bin#' dist/package.json
echo 
echo 
echo "Configuration Done!"
echo 
echo "Moving to next step..."
echo 
