#!/bin/bash

components=(
    button
    form
    input
    label
    sooner
)

for component in "${components[@]}"
do
    npx shadcn@latest add $component
done

# chmod +x add-all-shadcn-components.sh
# ./add-all-shadcn-components.sh