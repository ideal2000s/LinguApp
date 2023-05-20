#!/usr/bin/env bash

bundle install
yarn install
bin/rails db:migrate

