*** Settings ***
Library             Selenium2Library

*** Variables ***
${browser}          chrome
${url}              https://gcinitiative-front.azurewebsites.net/
${url1}             https://gcinitiative-front-qa.azurewebsites.net/
# ${username}       z0007141@pttgcgroup.com
# ${password}       3#Weedas
${username}         z0007142@pttgcgroup.com
${password}         2#First136969
${Approveruser1}    z0007142@pttgcgroup.com
${Approverpass1}    2#First136969
${selspeed}         0.5s

*** Test Case ***
Log in User New Initiatives
    # Open Browser
    Open Browser                     ${url1}                                                                        ${browser}          ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                    100 seconds
    Input Text                       passwd                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # หน้า General Information
    # Go To                            https://gcinitiative-front.azurewebsites.net/initiative/create
    Go To                            https://gcinitiative-front-qa.azurewebsites.net/initiative/create
    # Input initiative Name
    Click Element                    xpath=//input[@formcontrolname="name"]
    Input Text                       xpath=//input[@formcontrolname="name"]                                         Testproject

    # Input Company Name = GC Glycol Co., Ltd.
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="company"]
    click                            xpath=//ng-select[@formcontrolname="company"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]             30
    type                             xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]             10-PTTGC
    click                            xpath=//span[contains(text(),'10-PTTGC')]

    # Input Plant = 1021 - AROMATICS I - A-P1
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="plant"]
    click                            xpath=//ng-select[@formcontrolname="plant"]
    click                            xpath=//span[contains(text(),'1021 - AROMATICS I - A-P1')]

    # Organization (Budget Owner) = EOB
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="organization"]
    click                            xpath=//ng-select[@formcontrolname="organization"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]        30
    type                             xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]        EOB
    # Wait Until Element Is Visible    xpath=//span[@ng-reflect-ng-item-label="EOB"]                                                    50
    # click                            xpath=//span[@ng-reflect-ng-item-label="EOB"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'EOB')]                                           50
    click                            xpath=//span[contains(text(),'EOB')]

    # Finish Date
    Scroll Element Into View         xpath=//input[@formcontrolname="finishingDate"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="finishingDate"]                                30
    click                            xpath=//input[@formcontrolname="finishingDate"]

    # เลือกปี ปฏิทิน
    Wait Until Element Is Visible    xpath=//button[@class='current']                                               50
    click                            xpath=//button[@class='current']

    # เลือกปี 2021
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2021')]           50
    click                            xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2021')]

    # เลือก ตุลาคม
    Wait Until Element Is Visible    xpath=//span[contains(text(),'October')]                                       50
    click                            xpath=//span[contains(text(),'October')]

    # เลือกวันที่ 05
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"][2]//span[contains(text(),'5')]           50
    click                            xpath=//tr[@class="ng-star-inserted"][2]//span[contains(text(),'5')]

    # Background
    Scroll Element Into View         xpath=//textarea[@formcontrolname="background"]
    click                            xpath=//textarea[@formcontrolname="background"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="background"]                                30
    type                             xpath=//textarea[@formcontrolname="background"]                                Background1

    # Objective/Expected Result
    Scroll Element Into View         xpath=//textarea[@formcontrolname="background"]
    click                            xpath=//textarea[@formcontrolname="resultObjective"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="resultObjective"]                           30
    type                             xpath=//textarea[@formcontrolname="resultObjective"]                           resultObjective

    # Scope of Work
    Scroll Element Into View         xpath=//textarea[@formcontrolname="scopeOfWork"]
    click                            xpath=//textarea[@formcontrolname="scopeOfWork"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="scopeOfWork"]                               30
    type                             xpath=//textarea[@formcontrolname="scopeOfWork"]                               scopeOfWork

    # Request OPEX
    Scroll Element Into View         xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]
    Wait Until Element Is Visible    xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]                     50
    click                            xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]

    # Request CAPEX
    Scroll Element Into View         xpath=//input[@id='true']/..//label[@for="true"]
    Wait Until Element Is Visible    xpath=//input[@id='true']/..//label[@for="true"]                               50
    click                            xpath=//input[@id='true']/..//label[@for="true"]

    # Cost Estimated (CAPEX)
    Scroll Element Into View         xpath=//input[@formcontrolname="costEstCapex"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="costEstCapex"]                                 50
    click                            xpath=//input[@formcontrolname="costEstCapex"]
    type                             xpath=//input[@formcontrolname="costEstCapex"]                                 100

    # Budget Source
    Scroll Element Into View         xpath=//select[@formcontrolname="budgetSource"]
    click                            xpath=//select[@formcontrolname="budgetSource"]
    Wait Until Element Is Visible    xpath=//option[contains(text(),'CAPEX')]                                       30
    click                            xpath=//option[contains(text(),'CAPEX')]

    # Type of Investment
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    click                            xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    type                             xpath=//ng-select[@formcontrolname="typeOfInvestment"]//input[@type="text"]    Welfare
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Welfare')]                                       30
    click                            xpath=//span[contains(text(),'Welfare')]

    # Type of Benefit
    Wait Until Element Is Visible    xpath=//select[@formcontrolname="typeBenefit"]                                 30
    click                            xpath=//select[@formcontrolname="typeBenefit"]
    Wait Until Element Is Visible    xpath=//option[contains(text(),'NON-FINANCIAL')]                               30
    click                            xpath=//option[contains(text(),'NON-FINANCIAL')]

    # ปุ่ม Suggest
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn']
    Wait Until Element Is Visible    xpath=//button[@class='btn']                                                   30
    click                            xpath=//button[@class='btn']

    # ปุ่ม Next
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@class="container top"]//button[contains(text(),'Next')]
    Wait Until Element Is Visible    xpath=//div[@class="container top"]//button[contains(text(),'Next')]           50
    click                            xpath=//div[@class="container top"]//button[contains(text(),'Next')]
    Sleep                            10                                                                             second

    # Vice President of Owner (VP)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="president"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="president"]                                50
    click                            xpath=//ng-select[@formcontrolname="president"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'maykin.AUNGSUKIATETHAVORN <GM-TM')]              50
    click                            xpath=//span[contains(text(),'maykin.AUNGSUKIATETHAVORN <GM-TM')]

    # Division Manager of Owner (DM)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="manager"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="manager"]                                  50
    click                            xpath=//ng-select[@formcontrolname="manager"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Abdulroning.O <DEP-EMM-ECC')]                    50
    click                            xpath=//span[contains(text(),'Abdulroning.O <DEP-EMM-ECC')]

    # Project Manager
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="projectManager"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="projectManager"]                           50
    click                            xpath=//ng-select[@formcontrolname="projectManager"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'A_nun.K <P-LL-OP2')]                             50
    click                            xpath=//span[contains(text(),'A_nun.K <P-LL-OP2')]

    # Return of Investment Card
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']
    Wait Until Element Is Visible    xpath=//div[@id='return']                                                      50
    click                            xpath=//div[@id='return']

    # Depreciation Cost
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@formcontrolname="depreciationCost"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="depreciationCost"]                             50
    click                            xpath=//input[@formcontrolname="depreciationCost"]
    type                             xpath=//input[@formcontrolname="depreciationCost"]                             25

    # Useful life
    # Year
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@formcontrolname="usefulYear"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="usefulYear"]                                   50
    click                            xpath=//input[@formcontrolname="usefulYear"]
    type                             xpath=//input[@formcontrolname="usefulYear"]                                   1

    # Month
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@formcontrolname="usefulMonth"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="usefulMonth"]                                  50
    click                            xpath=//input[@formcontrolname="usefulMonth"]
    type                             xpath=//input[@formcontrolname="usefulMonth"]                                  0

    # Additional Information Card
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@id="additional"]
    Wait Until Element Is Visible    xpath=//div[@id="additional"]                                                  50
    click                            xpath=//div[@id="additional"]

    # For Environment (EMA) (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseEnvironment"]
    Wait Until Element Is Visible    xpath=//label[@for="falseEnvironment"]                                         50
    click                            xpath=//label[@for="falseEnvironment"]

    # For Turnaround Project (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseTurnaround"]
    Wait Until Element Is Visible    xpath=//label[@for="falseTurnaround"]                                          50
    click                            xpath=//label[@for="falseTurnaround"]

    # Replace Equipment (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseEquipment"]
    Wait Until Element Is Visible    xpath=//label[@for="falseEquipment"]                                           50
    click                            xpath=//label[@for="falseEquipment"]

    # Equipment or Asset which constructed from project (Ex. Boiler, CCR Building ,Hardware/Software/License etc.)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//textarea[@formcontrolname="equipmentOrAsset"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="equipmentOrAsset"]                          50
    click                            xpath=//textarea[@formcontrolname="equipmentOrAsset"]
    type                             xpath=//textarea[@formcontrolname="equipmentOrAsset"]                          test

    # BOI (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseBoi"]
    Wait Until Element Is Visible    xpath=//label[@for="falseBoi"]                                                 50
    click                            xpath=//label[@for="falseBoi"]

    # Do you have Additional Information (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseAdditional"]
    Wait Until Element Is Visible    xpath=//label[@for="falseAdditional"]                                          50
    click                            xpath=//label[@for="falseAdditional"]

    # Coordinate with external parties (Outside Company) (No)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                          50
    click                            xpath=//label[@for="falseCoordinate"]

    # Click "Save Draft"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//button[contains(text(),'Save Draft')]
    Wait Until Element Is Visible    xpath=//button[contains(text(),'Save Draft')]                                  50
    click                            xpath=//button[contains(text(),'Save Draft')]

    # Click "CAPEX Information"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),' CAPEX Information ')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),' CAPEX Information ')]                              50
    click                            xpath=//a[contains(text(),' CAPEX Information ')]

    # Request Project No. Date (Budget Start Date)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@formcontrolname="RequestIniNoDate"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="RequestIniNoDate"]                             50
    click                            xpath=//input[@formcontrolname="RequestIniNoDate"]

    # เลือกปี ปฏิทิน
    Wait Until Element Is Visible    xpath=//button[@class='current']                                               50
    click                            xpath=//button[@class='current']

    # เลือกปี 2020
    Scroll Element Into View         xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2020')]
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2020')]           50
    click                            xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2020')]

    # เลือก ตุลาคม
    Scroll Element Into View         xpath=//span[contains(text(),'September')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'September')]                                     50
    click                            xpath=//span[contains(text(),'September')]

    # เลือกวันที่ 25
    Scroll Element Into View         xpath=//tr[@class="ng-star-inserted"][4]//span[contains(text(),'25')]
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"][4]//span[contains(text(),'25')]          50
    click                            xpath=//tr[@class="ng-star-inserted"][4]//span[contains(text(),'25')]

    # Budget Period
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Annual (2021)')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Annual (2021)')]                                50
    click                            xpath=//label[contains(text(),'Annual (2021)')]

    # Annual Investment Plan
    # 2020
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@ng-reflect-name="y1"]
    Wait Until Element Is Visible    xpath=//input[@ng-reflect-name="y1"]                                           50
    click                            xpath=//input[@ng-reflect-name="y1"]
    type                             xpath=//input[@ng-reflect-name="y1"]                                           50

    # 2021
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//input[@ng-reflect-name="y2"]
    Wait Until Element Is Visible    xpath=//input[@ng-reflect-name="y2"]                                           50
    click                            xpath=//input[@ng-reflect-name="y2"]
    type                             xpath=//input[@ng-reflect-name="y2"]                                           50

    # Monthly Investment Plan (2020)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                             50
    click                            xpath=//button[@data-target="#M1"]

    # AUG 2020
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//input[@ng-reflect-name="m9"]
    Wait Until Element Is Visible    xpath=//div[@id="M1"]//input[@ng-reflect-name="m9"]                            50
    click                            xpath=//div[@id="M1"]//input[@ng-reflect-name="m9"]
    type                             xpath=//div[@id="M1"]//input[@ng-reflect-name="m9"]                            25000000

    # DEC 2020
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//input[@ng-reflect-name="m12"]
    Wait Until Element Is Visible    xpath=//div[@id="M1"]//input[@ng-reflect-name="m12"]                           50
    click                            xpath=//div[@id="M1"]//input[@ng-reflect-name="m12"]
    type                             xpath=//div[@id="M1"]//input[@ng-reflect-name="m12"]                           25000000

    # Monthly Investment Plan (2021)
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M2"]                                             50
    click                            xpath=//button[@data-target="#M2"]

    # JUL 2021
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//input[@ng-reflect-name="m7"]
    Wait Until Element Is Visible    xpath=//div[@id="M2"]//input[@ng-reflect-name="m7"]                            50
    click                            xpath=//div[@id="M2"]//input[@ng-reflect-name="m7"]
    type                             xpath=//div[@id="M2"]//input[@ng-reflect-name="m7"]                            50000000

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-width ng-star-inserted']            50
    click                            xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

    # Click "Overview"
    Sleep                            5                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Overview')]
    Sleep                            3                                                                              second
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Overview')]                                         50
    click                            xpath=//a[contains(text(),'Overview')]

    # Click "Edit Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible    xpath=//a[@id="approve-overview-button-link"]                                  50
    click                            xpath=//a[@id="approve-overview-button-link"]

    # Click "Action : Approve"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # Click "Submit"
    Sleep                            3                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-success btn-approve mr-2"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-success btn-approve mr-2"]                      50
    click                            xpath=//button[@class="btn btn-success btn-approve mr-2"]

*** Keywords ***
open
    [Arguments]                      ${element}
    Go To                            ${element}

wait
    [Arguments]                      ${element}
    Wait Until Element Is Visible    ${element}                                                                     30

waitAndType
    [Arguments]                      ${element}
    Input Text                       ${element}

click
    [Arguments]                      ${element}
    Click Element                    ${element}

sendKeys
    [Arguments]                      ${element}                                                                     ${value}
    Press Keys                       ${element}                                                                     ${value}

submit
    [Arguments]                      ${element}
    Submit Form                      ${element}

type
    [Arguments]                      ${element}                                                                     ${value}
    Input Text                       ${element}                                                                     ${value}

selectAndWait
    [Arguments]                      ${element}                                                                     ${value}
    Select From List                 ${element}                                                                     ${value}

select
    [Arguments]                      ${element}                                                                     ${value}
    Select From List                 ${element}                                                                     ${value}

verifyValue
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

verifyText
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

verifyElementPresent
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

verifyVisible
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

verifyTitle
    [Arguments]                      ${title}
    Title Should Be                  ${title}

verifyTable
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

assertConfirmation
    [Arguments]                      ${value}
    Alert Should Be Present          ${value}

assertText
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

assertValue
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

assertElementPresent
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

assertVisible
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

assertTitle
    [Arguments]                      ${title}
    Title Should Be                  ${title}

assertTable
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

waitForText
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

waitForValue
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

waitForElementPresent
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

waitForVisible
    [Arguments]                      ${element}
    Page Should Contain Element      ${element}

waitForTitle
    [Arguments]                      ${title}
    Title Should Be                  ${title}

waitForTable
    [Arguments]                      ${element}                                                                     ${value}
    Element Should Contain           ${element}                                                                     ${value}

doubleClick
    [Arguments]                      ${element}
    Double Click Element             ${element}

doubleClickAndWait
    [Arguments]                      ${element}
    Double Click Element             ${element}

goBack
    Go Back

goBackAndWait
    Go Back

runScript
    [Arguments]                      ${code}
    Execute Javascript               ${code}

runScriptAndWait
    [Arguments]                      ${code}
    Execute Javascript               ${code}

setSpeed
    [Arguments]                      ${value}
    Set Selenium Timeout             ${value}

setSpeedAndWait
    [Arguments]                      ${value}
    Set Selenium Timeout             ${value}

verifyAlert
    [Arguments]                      ${value}
    Alert Should Be Present          ${value}

Clear Field Of Characters
    [Arguments]                      ${field}
    [Documentation]                  This keyword pushes the delete key
    Press Keys                       ${field}                                                                       CTRL+a+BACKSPACE
