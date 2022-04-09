#!/usr/bin/env sh

# abort on errors
set -e

npm ci

# build
npm run build:no-ts

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'pvtools.dayo.fr' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com/dayofr/pvtools.git main:gh-pages

cd -
