#!/bin/bash
find ./Software -name ".git" | while read fname; do
    zip -r $fname.zip $fname
    rm -rf $fname
done;