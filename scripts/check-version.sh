#! /usr/bin/bash

g=`git diff origin/master -- package.json | grep -P '\+\s+"version":' | grep -P '(\d+\.){2}\d(-\w+)?' -o`

if [ "$g" != '' ]; then
    echo "current version is $g"
else echo "Update version number please" && exit -1
fi

