#!/bin/bash

read -p "Please enter a domain name or external IP address [default: localhost]: " APP_DOMAIN

if [ -z "$APP_DOMAIN" ]; then
  APP_DOMAIN="localhost"
fi

read -p "Please set a port for the frontend server [default: 80]: " CLIENT_PORT

if [ -z "$CLIENT_PORT" ]; then
  CLIENT_PORT="80"
fi

read -p "Please set a port for the backend server [default: 9000]: " SERVER_PORT

if [ -z "$SERVER_PORT" ]; then
  SERVER_PORT="9000"
fi

read -p "Please set a port for the backend WSGI server [default: 8000]: " WSGI_PORT

if [ -z "$WSGI_PORT" ]; then
  WSGI_PORT="8000"
fi

if [[ $(which docker) ]]; then
    echo "Docker is already installed"
else
    echo "Docker is not installed, installing now..."

    sudo apt-get update

    sudo apt-get install -y \
        ca-certificates \
        curl \
        g