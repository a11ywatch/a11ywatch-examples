#!/bin/bash

declare -a Sites=( "https://a11ywatch.com" "https://www.drake.com" "https://jeffmendez.com" )

A11Y_CMD="scan"
A11Y_EXT="single"

if [ "$1" == "crawl" ]; then
    A11Y_CMD="crawl -d"
    A11Y_EXT="multi"
fi

for val in ${Sites[@]}; do
    $(a11ywatch $A11Y_CMD -u $val > "./tmp/${val#*//}-${A11Y_EXT}.json") &
done

wait;