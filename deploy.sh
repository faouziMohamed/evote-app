#!/usr/bin/env bash

echo "Copying some file to build directory..."
cp package.json yarn.lock dist/

echo 
echo "Configure deploy script in 'package.json' file..."
sed -i '/"prepare"/d' package.json
sed -i 's# node ./dist/# node ./#' package.json
sed -i 's#\(webpack --progress\)#\1 --mode production#' package.json 
sed -i 's#\(sass --watch\)\(.\+\)&#sass\2#' package.json
sed -i 's#\("build"\)\(.\+\),#\1: "echo Building...",#' package.json
sed -i 's#dist/bin#bin#' package.json
echo 
echo 
echo "Configuration Done!"
echo 
echo "Moving to next step..."
echo 
echo 
