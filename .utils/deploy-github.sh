#!/bin/bash

# A simple bash script to copy release files into a zip to release on github
# Usage: ./deploy-github.sh

# tar and zip files
tar -czf $RELEASE_NAME-$TRAVIS_TAG.tar.gz ./dist
zip -r $RELEASE_NAME-$TRAVIS_TAG.zip ./dist
echo "Release files created at: $RELEASE_NAME-$TRAVIS_TAG.tar.gz"