#!/bin/bash
find ./Software ./Theory -name ".git" | while read fname; do
    zip -r $fname.zip $fname
    rm -rf $fname
done;