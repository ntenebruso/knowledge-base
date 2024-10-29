readarray -t orgfiles < <(find ../content/man/man1 -iname "*.org")

for x in "${orgfiles[@]}"; do
    filename=$(basename -- "$x")
    extension="${filename##*.}"
    filename="${filename%.*}"

    sed -i "1s/^/\#+TITLE\: Manpages - $filename\n/" "$x"
    #sed -i "1d" "$x"
done