#!/bin/bash

# Execute node command with EB's node.js environment.
# Basically, /etc/init/nodejs.conf defines how node command is executed:
#  - environment variables
#  - add path to node.js installation
#  - execute as nodejs user
# Implementation is taken from https://github.com/kopurando/better-faster-elastic-beanstalk/blob/7e20fe7/cron-node.sh
# Note: requires root access.

eval "$(grep -E '^env [A-Za-z0-9_-]+="[^"]+"$' /etc/init/nodejs.conf |  sed 's/env /export /g')"
export __EXECUTE_NODE_COMMAND="$1"
cd /var/app/current
exec su -s /bin/sh -c 'PATH=$PATH:$NODE_HOME/bin eval "$__EXECUTE_NODE_COMMAND" 2>&1' nodejs