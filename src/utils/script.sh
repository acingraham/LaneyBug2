#!/bin/sh
while [ true ]
do
    du -h; ls -lh | wc -l
    sleep 10
done
