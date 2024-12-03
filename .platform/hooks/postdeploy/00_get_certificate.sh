#!/usr/bin/env bash
# Place in .platform/hooks/postdeploy directory
sudo certbot -n -d turtleshellproject.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email ejpratt7@byu.edu
