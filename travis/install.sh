#!/bin/sh

cp ./travis/.yarnrc ./.yarnrc
sed -i 's/"useWorkspaces": true/"useWorkspaces": false/g' ./lerna.json
sed -i 's/workspaces/unused/g' ./package.json
