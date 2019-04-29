#!/bin/bash

# A simple bash script to copy release files into a zip to release on github
# Usage: ./deploy-github.sh

rm -rf $RELEASE_NAME || exit 0
for jsfile in `find ./components -name "*.min.js"`; do
    mkdir -p $RELEASE_NAME/$jsfile
    cp -r $jsfile $RELEASE_NAME/$jsfile
    tar -czf $RELEASE_NAME-$TRAVIS_TAG.tar.gz $RELEASE_NAME
    zip -r $RELEASE_NAME-$TRAVIS_TAG.zip $RELEASE_NAME
    echo "Release files created at: $RELEASE_NAME-$TRAVIS_TAG.tar.gz"
done