#! /bin/bash

DIR="./node_modules"

if [ -d "$DIR" ]; then
  echo "Install was executed"
else
  echo "Error: ${DIR} not found. Installed env not available."
  exit 1
fi