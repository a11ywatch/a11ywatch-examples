# with-cli

Example using A11yWatch CLI to run audits and more.

## Installation

Get the CLI by running `npm install a11ywatch-cli`. You need docker and docker compose installed.

The third step executes a shell script storing the values into a json file.

## Getting Started

1. `a11yatch build`
1. `a11yatch start`

## Usage

Single scan across files.

1. `./single_store.sh`

Crawl all pages on domain

1. `./single_store.sh crawl`

Open the `./tmp` folder to see the json output in realtime.