*** Settings ***
Library             Selenium2Library
*** Variables ***
${browser}          chrome
${url}              https://gcinitiative-front-qa.azurewebsites.net/
${url1}             https://gcinitiative-front-qa.azurewebsites.net/
${username}         z0007155@pttgcgroup.com
${password}         Aa+12345
${username1}        z0007141@pttgcgroup.com
${password1}        3#Weedas
${Approveruser1}    z0007142@pttgcgroup.com
${Approverpass1}    2#First136969
*** Keywords ***
Open Chrome Creator
    Open Browser                     ${url}                                                                                        ${browser}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt
Login Creator
    Input Text                       loginfmt                                                                                      ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                   100 seconds
    Input Text                       passwd                                                                                        ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds
Create Initiative
    Wait Until Page Contains         PTT Global Chemical Public Company Limited                                                    60 seconds
    # sleep                                5 seconds
    Go To                            https://gcinitiative-front-qa.azurewebsites.net/initiative/create
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="name"]                                                        10 seconds
    Input Text                       xpath=//input[@formcontrolname="name"]                                                        Testbyfrontis
    # Sleep                                1 seconds
    Input Text                       xpath=//input[@formcontrolname="specifyCompany"]                                              TestSpecifyCompany
    # Sleep                                1 seconds
    Input Text                       xpath=//input[@formcontrolname="specifyPlant"]                                                TestSpecifyCompany
    # Sleep                                1 seconds
    Click Element                    xpath=//ng-select[@placeholder='Choose Company']
    Click Element                    xpath=//div[@class="ng-option"][1]
    # Sleep                                1 seconds
    Click Element                    xpath=//ng-select[@placeholder='Choose Plant']
    Click Element                    xpath=//div[@class="ng-option"][1]
    # Wait Until Element Is Visible        id=idSIButton9                                                            60 seconds
    Click Element                    xpath=//ng-select[@placeholder='Choose Organization']
    Click Element                    xpath=//div[@class="ng-option"][1]
    Sleep                            1 seconds
    Input Text                       xpath=//input[@formcontrolname="finishingDate"]                                               05/10/20
    Sleep                            1 seconds
    Input Text                       xpath=//textarea[@ng-reflect-name="background"]                                               Background1
    Sleep                            1 seconds
    Input Text                       xpath=//textarea[@formcontrolname="resultObjective"]                                          resultObjective
    Sleep                            1 seconds
    Input Text                       xpath=//textarea[@formcontrolname="scopeOfWork"]                                              scopeOfWork
    Sleep                            1 seconds
Suggest MAX No CAPEX
    Click Element                    xpath=//label[@for="false"]
    Sleep                            2 seconds
    Click Element                    xpath=//option[@value="EBIT"]
    Sleep                            1 seconds
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="benefitAmount"]
    Input Text                       xpath=//input[@formcontrolname="benefitAmount"]                                               100
    Click Element                    xpath=//button[@type="submit"]
    Sleep                            1 seconds
    Wait Until Element Is Visible    xpath=//label[@for="max"]
    Sleep                            3 seconds
Next Button
    Click Element                    xpath=//button[@class="btn btn-primary btn-width ng-star-inserted"]
Detail MAX
    Wait Until Page Contains         Detail Information
    sleep                            5 seconds
    ${InitiativeCode}=               get text                                                                                      xpath=//div[@class='information']//div[1]//div[1]//div[1]//div[2]
    log to console                   '${InitiativeCode}'
    set suite variable               ${InitiativeCode}

    Click Element                    xpath=//option[@value="MAX Infinity"]
    sleep                            1 seconds
    Click Element                    xpath=//option[@value="Aromatics"]
    Sleep                            1 seconds
    Click Element                    xpath=//option[@value="Aromatics - Availability"]
    Sleep                            1 seconds
    Click Element                    xpath=//select[@formcontrolname='workstreamLead']
    Sleep                            1 seconds
    Click Element                    xpath=//option[@value="CHATCHAI.C@PTTGCGROUP.COM"]
    Sleep                            1 seconds
    # Click Element                        xpath=//button[@class='btn btn-warning btn-width ml-2']
    # Sleep                                5 seconds
Submit Button
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            5 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Close Browser
    Sleep                            5 seconds
Open Chrome Approver
    Open Browser                     ${url1}                                                                                       ${browser}
    Maximize Browser Window
    Reload Page
    # sleep                                5 seconds
    Wait Until Element Is Visible    name=loginfmt                                                                                 20 seconds
Login Approver 1
    Input Text                       loginfmt                                                                                      ${username1}
    click Button                     id=idSIButton9
    # sleep                                5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                   60 seconds
    Input Text                       passwd                                                                                        ${password1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds
    # Wait Until Element Is Visible        xpath=//li[@class='nav-item dropdown ml-2']                                  10 seconds
    # Click Element                        xpath=//li[@class='nav-item dropdown ml-2']
    # CLick Element                        xpath=//a[contains(text(),'Logout')]
    # Click Element                        xpath=//div[@class='table']
    # # sleep                                5 seconds
    # Wait Until Element Is Visible        xpath=//div[@class='table-cell text-left content']                           10 seconds
    # # Input Text                         loginfmt                                                                     ${username1}
    # click Element                        xpath=//div[@class='table-cell text-left content']
    # # Wait Until Element Is Visible        loginfmt                                                                     10 seconds
    # # Input Text                           loginfmt                                                                     ${username1}
    # # click Element                      xpath=//div[@class='table-cell text-left content']
    # # sleep                                5 seconds
    # Wait Until Element Is Visible        name=passwd                                                                  60 seconds
    # Input Text                           passwd                                                                      ${password1}
    # Wait Until Element Is Visible        id=idSIButton9                                                               60 seconds
    # click Button                         id=idSIButton9
    # Wait Until Element Is Visible        id=idBtn_Back                                                                60 seconds
    # click Button                         id=idBtn_Back
    # sleep                                5 seconds

Login Approver 2
    Input Text                       loginfmt                                                                                      ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                   60 seconds
    Input Text                       passwd                                                                                        ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds
    # Wait Until Element Is Visible        xpath=//li[@class='nav-item dropdown ml-2']                                  10 seconds
    # Click Element                        xpath=//li[@class='nav-item dropdown ml-2']
    # CLick Element                        xpath=//a[contains(text(),'Logout')]
    # Click Element                        xpath=//div[@class='table']
    # sleep                                5 seconds
    # Wait Until Element Is Visible        xpath=//div[@class='table-cell text-left content']                           10 seconds
    # # Input Text                         loginfmt                                                                     ${username1}
    # click Element                        xpath=//div[@class='table-cell text-left content']
    # # Wait Until Element Is Visible        loginfmt                                                                     10 seconds
    # # Input Text                           loginfmt                                                                     ${Approveruser1}
    # # click Element                      xpath=//div[@class='table-cell text-left content']
    # sleep                                3 seconds
    # Wait Until Element Is Visible        name=passwd                                                                  60 seconds
    # Input Text                           passwd                                                                      ${Approverpass1}
    # Wait Until Element Is Visible        id=idSIButton9                                                               60 seconds
    # click Button                         id=idSIButton9
    #  Wait Until Element Is Visible       id=idBtn_Back                                                                60 seconds
    # click Button                         id=idBtn_Back
    # sleep                                5 seconds
Search
    Wait Until Page Contains         PTT Global Chemical Public Company Limited                                                    10 seconds
    # log to console                       ${InitiativeCode}
    Go to                            https://gcinitiative-front.azurewebsites.net/initiative/my-tasks
    # Sleep                                10 seconds
    Wait Until Element Is Visible    xpath=//input[@placeholder='Search']                                                          10 seconds
    Input Text                       xpath=//input[@placeholder='Search']                                                          ${InitiativeCode}
    Sleep                            1 seconds
    CLick Element                    xpath=//button[@class='btn btn-success']
    Sleep                            3 seconds
Approver Approved
    CLick Element                    xpath=//a[@class="btn btn-success btn-sm mr-1 text-white btn-list"]
    Sleep                            3 seconds
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                     10 seconds
    CLick Element                    xpath=//button[@class='btn btn-success btn-approve mr-2']
    Sleep                            5 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Close Browser

Approver Approved SIL4
    CLick Element                    xpath=//a[@class="btn btn-success btn-sm mr-1 text-white btn-list"]
    Sleep                            3 seconds
    Click Element                    xpath=//span[contains(text(),'Impact Tracking')]
    sleep                            3 seconds
    ${SIL4RunrateValue}=             get value                                                                                     xpath=//input[@class='form-control ng-untouched ng-valid ng-dirty']
    log to console                   '${SIL4RunrateValue}'
    set suite variable               ${SIL4RunrateValue}
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                     10 seconds
    CLick Element                    xpath=//button[@class='btn btn-success btn-approve mr-2']
    Sleep                            5 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Close Browser

Add detail
    Click Element                    xpath=//a[@class='btn btn-warning btn-sm mr-1 text-white btn-list']
    Sleep                            3 seconds
    Wait Until Element Is Visible    xpath=//i[@class="far fa-check-circle mr-2"]                                                  10 seconds
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            5 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Sleep                            5 seconds
    Close Browser

Save Button
    Click Element                    xpath=//button[@class='btn btn-warning btn-width ml-2']

Add detail IL1
    # Wait Until Page Contains             PTT Global Chemical Public Company Limited
    # Sleep                                5 seconds
    # Go to                                https://gcinitiative-front-dev.azurewebsites.net/initiative/my-tasks
    # Sleep                                5 seconds
    # Input Text                           xpath=//input[@placeholder='Search']                                         '${InitiativeCode}'
    # Sleep                                1 seconds
    # CLick Element                        xpath=//button[@class='btn btn-success']
    # Sleep                                5 seconds
    Click Element                    xpath=//a[@class='btn btn-warning btn-sm mr-1 text-white btn-list']
    sleep                            3 seconds
    Wait Until Page Contains         Edit                                                                                          10 seconds
    # Click Element                        xpath=//i[@class="far fa-check-circle mr-2"]
    # Sleep                                5 seconds
    # CLick Element                        xpath=//button[@class='swal2-confirm swal2-styled']
    # Sleep                                10 seconds
    Open Detail Screen
    input text                       xpath=//input[@formcontrolname="il5Date"]                                                     31/12/2020
    Scroll Page To Location          0                                                                                             0
    Open Impact Screen
    Click Element                    xpath=//table[@class='table table-bordered impact-table']//div[@class='ng-input']
    sleep                            2 seconds
    Click Element                    xpath=//div[contains(text(),'Variable Cost - Stream')]
    sleep                            1 seconds
    input text                       xpath=//input[@formcontrolname="firstRunRateMonth"]                                           Feb-20
    Sleep                            1 seconds
    input text                       xpath=//input[@ng-reflect-name="month1"]                                                      0.8921111
    Sleep                            1 seconds
    # input text                           xpath=//input[@formcontrolname="il5Date"]                                               31/12/2020
    Click Element                    xpath=//option[@value="P&L"]
    sleep                            1 seconds
    # Click Element                        xpath=//button[@class='btn btn-warning btn-width ml-2']
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            5 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Close Browser

Add detail IL2
    Click Element                    xpath=//a[@class='btn btn-warning btn-sm mr-1 text-white btn-list']
    sleep                            3 seconds
    Wait Until Page Contains         Edit                                                                                          10 seconds
    Open Progress Screen
    input text                       xpath=//input[@formcontrolname="milestone"]                                                   TestMilestone
    sleep                            1 seconds
    input text                       xpath=//textarea[@formcontrolname="keyDeliverable"]                                           TestKeydelivarable
    sleep                            1 seconds
    input text                       xpath=//input[@formcontrolname="start"]                                                       25/06/2020
    sleep                            1 seconds
    input text                       xpath=//input[@formcontrolname="planFinish"]                                                  30/09/2020
    sleep                            1 seconds
    input text                       xpath=//input[@formcontrolname="actualFinish"]                                                31/12/2020
    sleep                            1 seconds
    # click button                         xpath=//button[@class="btn btn-primary mr-5"]
    # sleep                                1 seconds
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            3 seconds
    Wait Until Page Contains         My Tasks                                                                                      10 seconds
    Close Browser

Add detail IL3
    Click Element                    xpath=//a[@class='btn btn-warning btn-sm mr-1 text-white btn-list']
    Sleep                            5 seconds
    Open Impact Screen
    input text                       xpath=//div[@class='form-row align-items-center ng-star-inserted']//tr[2]//td[3]//input[1]    1.212333
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            5 seconds
    Close Browser

Add detail IL4
    Click Element                    xpath=//a[@class='btn btn-warning btn-sm mr-1 text-white btn-list']
    Sleep                            5 seconds
    Open Impact Screen
    ${IL4RunrateValue}=              get value                                                                                     xpath=//div[@class='form-group row mt-3 mb-5']//input[@class='form-control ng-untouched ng-valid ng-dirty']
    log to console                   '${IL4RunrateValue}'
    set suite variable               ${IL4RunrateValue}
    input text                       xpath=//tr[3]//td[3]//input[1]                                                                1.2523333
    input text                       xpath=//input[@class='form-control is-invalid ng-touched ng-pristine ng-invalid']             1.303333
    Click Element                    xpath=//i[@class="far fa-check-circle mr-2"]
    Sleep                            5 seconds
    Close Browser


Approver1
    Open Chrome Creator
    Login Approver 1
    Search
    Approver Approved

Approver2
    Open Chrome Creator
    Login Creator
    Search
    Approver Approved
Approver3
    Open Chrome Creator
    Login Approver 2
    Search
    Approver Approved
Approver Check SIL4
    Open Chrome Creator
    Login Approver 1
    Search
    Approver Approved SIL4


Open Impact Screen
    Click Element                    xpath=//a[contains(text(),'Impact Tracking')]
    Sleep                            3 seconds
    Wait Until Page Contains         Impact Tracking                                                                               10 seconds

Open Detail Screen
    Click Element                    xpath=//a[contains(text(),'Detail Information (Max)')]
    Sleep                            3 seconds
    Wait Until Page Contains         Detail Information                                                                            10 seconds

Open Progress Screen
    Click Element                    xpath=//a[contains(text(),'Progress')]
    Sleep                            3 seconds
    Wait Until Page Contains         Progress                                                                                      10 seconds


Scroll Page To Location
    [Arguments]                      ${x_location}                                                                                 ${y_location}
    Execute JavaScript               window.scrollTo(${x_location},${y_location})

*** Test Cases ***
Test First Approved
    Open Chrome Creator
    Login Creator
    Create Initiative
    Suggest MAX No CAPEX
    Next Button
    Detail MAX
    log to console                   '${InitiativeCode}'
    Submit Button
    sleep                            5 seconds
Admin Check
    Open Chrome Creator
    Login Approver 1
    Search
    Approver Approved

Owner Add detail IL0
    Open Chrome Creator
    Login Creator
    Search
    Add detail
Approver1 SIL1
    Open Chrome Creator
    Login Approver 2
    Search
    Approver Approved
Approver2 SIL1
    Open Chrome Creator
    Login Creator
    Search
    Approver Approved

# Approver3 SIL1
#                   Open Chrome Creator
#                   Login Approver 1
#                   Search
#                   Approver Approved


Owner Add detail IL1
    Open Chrome Creator
    Login Creator
    Search
    Add detail IL1
Approve SIL2
    Approver1
    Approver2
    Approver3



Owner Add detail IL2
    Open Chrome Creator
    Login Creator
    Search
    Add detail IL2

Approver SIL3
    Approver1
    Approver2
    Approver3

Owner Add detail IL3
    Open Chrome Creator
    Login Creator
    Search
    Add detail IL3

Approver SIL4

    Approver Check SIL4
    Approver2
    Approver3

Owner Add detail IL4
    Open Chrome Creator
    Login Creator
    Search
    Add detail IL4
    log to console                   '${IL4RunrateValue}'
Approver SIL5
    Approver1
    Approver2
    Approver3

