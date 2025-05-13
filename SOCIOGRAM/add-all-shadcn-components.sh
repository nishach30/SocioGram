#!/bin/bash

components=(
    button
    form
    input
    label
    sonner
)

for component in "${components[@]}"
do
    npx shadcn@latest add $component
done

# chmod +x add-all-shadcn-components.sh
# ./add-all-shadcn-components.sh