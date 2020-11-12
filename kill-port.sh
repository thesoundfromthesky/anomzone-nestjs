#!/usr/bin/env bash
kill -9 $(lsof -i tcp:${1} -t);