#!/bin/bash

timestamp=$(date +%s)

perl -pi -e "s/var cache = 'javascripture.([0-9]+).([0-9]+).([0-9]+)/var cache = 'javascripture.\1.\2.$timestamp/g" sw.js

echo 'cache version number updated'
