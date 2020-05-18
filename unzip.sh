#!/bin/bash
find ./Software ./Theory -name ".git.zip" | while read fname; do
    unzip $fname
    rm $fname
done;
