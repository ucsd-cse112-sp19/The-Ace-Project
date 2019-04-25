#!/bin/bash

# double check deploy only happens on correct branch
echo "------ Deploying Docs ------"
if [[ "$TRAVIS_REPO_SLUG" == "ucsd-cse112/The-Ace-Project" ]] && [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    echo "Generating docs..."
    npm ci
    npm run doc

    ls doc 

    echo "Cloning gh-pages branch..."
    cd $HOME
    git config --global user.email "travis@travis-ci.com"
    git config --global user.name "travis-ci"
    git clone --branch=gh-pages https://${GITHUB_KEY}@github.com/ucsd-cse112/The-Ace-Project.git webpage > /dev/null 2>&1

    echo "Moving generated docs..."
    cd webpage
    ls ../doc
    cat .gitignore
    cat ../.gitignore
    git rm -r ./doc
    cp -r ../doc ./doc

    echo "Pushing to gh-pages branch..."
    git add .
    git commit -m "Lastest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
    git push origin gh-pages > /dev/null
else
    echo "Attempting to deploy somewhere other than master, aborting..."
    exit 1
fi