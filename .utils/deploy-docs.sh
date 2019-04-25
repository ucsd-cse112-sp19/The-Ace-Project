#!/bin/bash

# double check deploy only happens on correct branch
if [[ "$TRAVIS_REPO_SLUG" == "ucsd-cse112/The-Ace-Project" ]] && [[ "$TRAVIS_PULL_REQUESTS" == "false" ]] && [[ "$TRAVIS_REPO_BRANCH" == "master" ]]; then
    cd $HOME
    git config --global user.email "travis@travis-ci.com"
    git config --global user.name "travis-ci"
    git clone --quiet --branch=gh-pages https://${GITHUB_KEY}@github.com/ucsd-cse112/The-Ace-Project.git webpage > /dev/null 2>&1

    cd webpage
    git rm ./doc
    cp -r $HOME/doc ./doc
    git add .
    git commit -m "Lastest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
    git push origin gh-pages > /dev/null
fi