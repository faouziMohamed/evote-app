#!/usr/bin/env bash

echo 
echo 
echo "Configure deploy script before building 'package.json' file..."
sed -i "s#echo '\(.\+\)' &&#\1 \&\&#" package.json
sed -i 's#\(webpack --progress\)#\1 --mode production#' package.json 
sed -i 's#\(sass --watch\)\(.\+\)&#sass\2#' package.json
echo 
echo 
echo "Before script done !"
echo 
