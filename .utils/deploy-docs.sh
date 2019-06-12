#!/bin/bash

# sanity check to double ensure deploy only occures from the correct branch
echo "------ Deploying Docs ------"
if [[ "$TRAVIS_REPO_SLUG" == "ucsd-cse112/The-Ace-Project" ]] && [[ "$TRAVIS_PULL_REQUEST" == "false" ]] && [[ "$TRAVIS_BRANCH" == "master" ]]; then
    echo "Generating docs..."
    npm ci
    npm run doc
    
    if [[ $? -ne 0 ]]; then
        echo "Error generating docs, aborting..."
        exit 1;
    fi

    # save current directory so we docs path
    CURRENT_DIR=$(pwd)

    echo "Cloning gh-pages branch..."
    cd $HOME
    git config --global user.email "travis@travis-ci.com"
    git config --global user.name "travis-ci"
    git clone --branch=gh-pages https://${GITHUB_KEY}@github.com/ucsd-cse112/The-Ace-Project.git webpage > /dev/null 2>&1

    if [[ $? -ne 0 ]]; then
        echo "Error cloning gh-pages, aborting..."
        exit 1;
    fi

    echo "Moving generated docs..."
    cd webpage
    git rm -r ./doc
    cp -r $CURRENT_DIR/doc ./doc

    if [[ $? -ne 0 ]]; then
        echo "Error copying docs, aborting..."
        exit 1;
    fi

    git rm -r ./components
    cp -r $CURRENT_DIR/components ./components

    if [[ $? -ne 0 ]]; then
        echo "Error copying components, aborting..."
        exit 1;
    fi

    echo "Pushing to gh-pages branch..."
    git add .
    git commit -m "Latest documentation. Successful build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages."
    git push origin gh-pages > /dev/null
else
    echo "Attempting to deploy somewhere other than master, aborting..."
    exit 1
fi
