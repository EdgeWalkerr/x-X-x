#!/bin/bash
find ./Software -name ".git.zip" | while read fname; do
    unzip $fname
    rm $fname
done;