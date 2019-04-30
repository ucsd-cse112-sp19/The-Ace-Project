#!/bin/bash

# A simple bash script to minify each JS file within a given directory.
# Usage: ./minify-js.sh directory

# TODO: May be nicer to use JS scripting, as it is both more cross platform
#       and more easily understood by the dev team.

# TODO: Add override option
if [[ $1 == "" ]]; then
    echo "No folder given. Aborting..."
    exit 1
fi

for jsfile in `find $1 -name "*.js"`; do
    # don't minify spec files or already minified files
    if [[ $jsfile != *.spec.js ]] && [[ $jsfile != *.min.* ]]; then
        jsdirname=`dirname $jsfile`
        jsbasename=`basename $jsfile .js`
        ./node_modules/.bin/minify $jsfile -o $jsdirname/$jsbasename.min.js
        echo "$jsfile minified!"
    fi
done