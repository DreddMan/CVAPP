#!/bin/bash

read -p "Please enter a domain name or external IP address [default: localhost]: " APP_DOMAIN

if [ -z "$APP_DOMAIN" ]; then
  APP_DOMAIN="localhost"
fi

read -p "Please set a port for the frontend server [default: 80]: " CLIENT_PORT

if [ -z "$CLIENT_POR