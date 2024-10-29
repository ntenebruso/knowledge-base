#!/usr/bin/env bash

readarray -t manfiles < <(find ../mandb/man1 -iname "*.*")

for file in "${manfiles[@]}"; do
    name=$(echo "$file" | awk -F '/' '{print $NF}')
    pandoc -f man -t org "$file" -o ../content/man/man1/"$name".org \
        && echo "$name.org created." || echo "Error converting $file"
done

