#!/bin/bash

red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)

echo "${green}@@@:Formatting code...${reset}"

if ! npx lint-staged; then
    echo "${red}@@@:Formatting ERROR${reset}"
    exit 1;
fi

echo "${green}@@@:Formatting complete.${reset}"
exit