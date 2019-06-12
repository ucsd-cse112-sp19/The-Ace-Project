#!/bin/bash

# A simple bash script to copy release files into a zip to release on github and NPM
# Usage: ./deploy-github.sh

# tar and zip files
mkdir npm_release
cp dist/standard-bundle.js npm_release/index.js
cp package.json npm_release/package.json
tar -czf "NPM_TAR".tar.gz npm_release

tar -czf $RELEASE_NAME-$TRAVIS_TAG.tar.gz ./dist
zip -r $RELEASE_NAME-$TRAVIS_TAG.zip ./dist
echo "Release files created at: $RELEASE_NAME-$TRAVIS_TAG.tar.gz"