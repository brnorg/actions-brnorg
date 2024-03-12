*** Settings ***
Library           Browser

*** Variables ***
${URL}           https://www.google.com
${EXPECTED TITLE}   Google

*** Test Cases ***
Check Page Title
    New Page    ${URL}
    ${title}=    Get Title
    Should Be Equal    ${title}    ${EXPECTED TITLE}
    Close All Browsers
