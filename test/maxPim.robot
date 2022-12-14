*** Settings ***
Library                    Selenium2Library
Library                    DateTime
Library                    String

*** Variables ***
${browser}                 chrome
${url}                     https://gcinitiative-front-qa.azurewebsites.net/
${url1}                    https://gcinitiative-front-qa.azurewebsites.net/
${username}                z0007155@pttgcgroup.com
${password}                Aa+12345
${username1}               z0007141@pttgcgroup.com
${password1}               3#Weedas
${Approveruser1}           z0007142@pttgcgroup.com
${Approverpass1}           2#First136969
${selspeed}                0.5s
${initiativeCode}          null
${runRate(M.THB)}          null
${firstRunRateMonth}       null
${reviseRunRate(M.THB)}    null
${iL4RunRateRecurring}     null

*** Test Case ***
Log in User New Initiatives Max
    # [Template]                       Run Keyword And Continue On Failure
    # Open Browser
    Open Browser                           ${url1}                                                                                                                                        ${browser}                                                                                                              ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible          name=loginfmt

    # Login Creator
    Input Text                             loginfmt                                                                                                                                       ${Approveruser1}
    click Button                           id=idSIButton9
    Wait Until Element Is Visible          name=passwd                                                                                                                                    100 seconds
    Input Text                             passwd                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible          id=idSIButton9                                                                                                                                 60 seconds
    click Button                           id=idSIButton9
    Wait Until Element Is Visible          id=idSIButton9                                                                                                                                 60 seconds
    click Button                           id=idSIButton9
    sleep                                  5 seconds

    # ???????????? General Information
    Go To                                  https://gcinitiative-front-qa.azurewebsites.net/initiative/create

    # Check Required
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Next ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Next ')]                                                                                                      30
    click                                  xpath=//button[contains(text(),' Next ')]

    # Click "Error Required"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),'OK')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),'OK')]                                                                                                          30
    click                                  xpath=//button[contains(text(),'OK')]

    # Error "Initiative Name is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Initiative Name is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Initiative Name is required !')]                                                           Initiative Name is required !

    # Error "Company is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Company is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Company is required !')]                                                                   Company is required !

    # Error "Plant is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Plant is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Plant is required !')]                                                                     Plant is required !

    # Error "Organization (Budget Owner) is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Organization (Budget Owner) is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Organization (Budget Owner) is required !')]                                               Organization (Budget Owner) is required !

    # Error "Finish Date is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Finish Date is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Finish Date is required !')]                                                               Finish Date is required !

    # Error "Background is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Background is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Background is required !')]                                                                Background is required !

    # Error "Objective/Expected Result is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Objective')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Objective')]                                                                               Objective/Expected Result is required !

    # Error "ScopeOfWork is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'ScopeOfWork is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'ScopeOfWork is required !')]                                                               ScopeOfWork is required !

    # Error "Cost Estimated (CAPEX) is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Cost Estimated (CAPEX) is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Cost Estimated (CAPEX) is required !')]                                                    Cost Estimated (CAPEX) is required !

    # Error "Budget Source is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Budget Source is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Budget Source is required !')]                                                             Budget Source is required !

    # Error "Type of Investment is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Type of Investment is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Type of Investment is required !')]                                                        Type of Investment is required !

    # Input initiative Name
    Scroll Element Into View               xpath=//input[@formcontrolname="name"]
    Click Element                          xpath=//input[@formcontrolname="name"]
    Input Text                             xpath=//input[@formcontrolname="name"]                                                                                                         [Testing1Max]

    # Input Company Name = GC Glycol Co., Ltd.
    Scroll Element Into View               xpath=//ng-select[@formcontrolname="company"]
    click                                  xpath=//ng-select[@formcontrolname="company"]
    Wait Until Element Is Visible          xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]                                                                             30
    type                                   xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]                                                                             11-Glycol
    click                                  xpath=//span[contains(text(),'11-Glycol')]
    # type                             xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]                                GC Glycol Co., Ltd.
    # click                            xpath=//span[contains(text(),'GC Glycol Co., Ltd.')]

    # Input Plant = 1151 - GC GLYCOL PLANT - E-GC1.1
    Scroll Element Into View               xpath=//ng-select[@formcontrolname="plant"]
    click                                  xpath=//ng-select[@formcontrolname="plant"]
    click                                  xpath=//span[contains(text(),'1151 - GC GLYCOL PLANT - E-GC1.1')]
    # click                            xpath=//span[@ng-reflect-ng-item-label="GC Glycol"]

    # Organization (Budget Owner) = EOB
    Scroll Element Into View               xpath=//ng-select[@formcontrolname="organization"]
    click                                  xpath=//ng-select[@formcontrolname="organization"]
    Wait Until Element Is Visible          xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]                                                                        30
    type                                   xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]                                                                        EOB
    # Wait Until Element Is Visible    xpath=//span[@ng-reflect-ng-item-label="EOB"]                                                    50
    # click                            xpath=//span[@ng-reflect-ng-item-label="EOB"]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'EOB')]                                                                                                           50
    click                                  xpath=//span[contains(text(),'EOB')]

    # Finish Date
    Scroll Element Into View               xpath=//input[@formcontrolname="finishingDate"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="finishingDate"]                                                                                                30
    click                                  xpath=//input[@formcontrolname="finishingDate"]

    # ????????????????????? ??????????????????
    Wait Until Element Is Visible          xpath=//button[@class='current']                                                                                                               50
    click                                  xpath=//button[@class='current']

    # ?????????????????????????????????
    ${date} =                              Get Current Date                                                                                                                               UTC                                                                                                                     + 365 days
    ${newDate}=                            Convert Date                                                                                                                                   ${date}                                                                                                                 result_format=%d/%m/%Y

    # ??????????????????????????????????????????????????? + 1 ??????
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="finishingDate"]                                                                                                50
    type                                   xpath=//input[@formcontrolname="finishingDate"]                                                                                                ${newDate}

    # Background
    Scroll Element Into View               xpath=//textarea[@formcontrolname="background"]
    Wait Until Element Is Visible          xpath=//textarea[@formcontrolname="background"]                                                                                                30
    type                                   xpath=//textarea[@formcontrolname="background"]                                                                                                Background1

    # Objective/Expected Result
    Scroll Element Into View               xpath=//textarea[@formcontrolname="background"]
    click                                  xpath=//textarea[@formcontrolname="resultObjective"]
    Wait Until Element Is Visible          xpath=//textarea[@formcontrolname="resultObjective"]                                                                                           30
    type                                   xpath=//textarea[@formcontrolname="resultObjective"]                                                                                           resultObjective

    # Scope of Work
    Scroll Element Into View               xpath=//textarea[@formcontrolname="scopeOfWork"]
    click                                  xpath=//textarea[@formcontrolname="scopeOfWork"]
    Wait Until Element Is Visible          xpath=//textarea[@formcontrolname="scopeOfWork"]                                                                                               30
    type                                   xpath=//textarea[@formcontrolname="scopeOfWork"]                                                                                               scopeOfWork

    # Request OPEX
    Scroll Element Into View               xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]
    Wait Until Element Is Visible          xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]                                                                                     50
    click                                  xpath=//input[@id='falseOpex']/..//label[@for="falseOpex"]

    # Request CAPEX
    Scroll Element Into View               xpath=//input[@id='true']/..//label[@for="true"]
    Wait Until Element Is Visible          xpath=//input[@id='true']/..//label[@for="true"]                                                                                               50
    click                                  xpath=//input[@id='true']/..//label[@for="true"]

    # Cost Estimated (CAPEX)
    Scroll Element Into View               xpath=//input[@formcontrolname="costEstCapex"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="costEstCapex"]                                                                                                 50
    click                                  xpath=//input[@formcontrolname="costEstCapex"]
    type                                   xpath=//input[@formcontrolname="costEstCapex"]                                                                                                 100

    # Budget Source (CAPEX)
    Scroll Element Into View               xpath=//select[@formcontrolname="budgetSource"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="budgetSource"]                                                                                                50
    click                                  xpath=//select[@formcontrolname="budgetSource"]
    Wait Until Element Is Visible          xpath=//option[contains(text(),'CAPEX')]                                                                                                       50
    click                                  xpath=//option[contains(text(),'CAPEX')]

    # Type of Investment
    Scroll Element Into View               xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    Wait Until Element Is Visible          xpath=//ng-select[@formcontrolname="typeOfInvestment"]                                                                                         50
    click                                  xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'Sustain Core: Energy saving')]                                                                                   50
    click                                  xpath=//span[contains(text(),'Sustain Core: Energy saving')]

    # IRR
    Scroll Element Into View               xpath=//input[@formcontrolname="irr"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="irr"]                                                                                                          50
    click                                  xpath=//input[@formcontrolname="irr"]
    type                                   xpath=//input[@formcontrolname="irr"]                                                                                                          100

    # Type of Benefit
    Scroll Element Into View               xpath=//select[@formcontrolname="typeBenefit"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="typeBenefit"]                                                                                                 30
    click                                  xpath=//select[@formcontrolname="typeBenefit"]
    Wait Until Element Is Visible          xpath=//option[@value="EBIT"]                                                                                                                  30
    click                                  xpath=//option[@value="EBIT"]

    # Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]
    Input Text                             xpath=//input[@formcontrolname="benefitAmount"]                                                                                                100
    Click Element                          xpath=//button[@type="submit"]
    Sleep                                  1 seconds
    Wait Until Element Is Visible          xpath=//label[@for="max"]
    Sleep                                  3 seconds

    # ???????????? Suggest
    Scroll Element Into View               xpath=//button[@class='btn']
    Wait Until Element Is Visible          xpath=//button[@class='btn']                                                                                                                   30
    click                                  xpath=//button[@class='btn']

    # ???????????? Next
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="container top"]//button[contains(text(),'Next')]
    Wait Until Element Is Visible          xpath=//div[@class="container top"]//button[contains(text(),'Next')]                                                                           50
    click                                  xpath=//div[@class="container top"]//button[contains(text(),'Next')]
    Sleep                                  10                                                                                                                                             second

    ##################################### Detail Information (Max) ############################################

    # back to general tab
    click                                  xpath=//a[contains(text(),'General Information')]

    # get and set value form textbox
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//input[@id='initiativeCode']                                                                                     attribute=value
    Set Global Variable                    ${initiativeCode}                                                                                                                              ${getCode}

    # go to detail tab
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//a[contains(text(),'Detail Information (Max)')]

    # Error "Initiative Type is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Initiative Type is required !')]
    Element Text Should Be                 xpath=//div[contains(text(),'Initiative Type is required !')]                                                                                  Initiative Type is required !

    # Error "Workstream is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Workstream is required !')]
    Element Text Should Be                 xpath=//div[contains(text(),'Workstream is required !')]                                                                                       Workstream is required !

    # Initiative Type
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//select[@formcontrolname="initiativeTypeMax"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="initiativeTypeMax"]                                                                                           50
    click                                  xpath=//select[@formcontrolname="initiativeTypeMax"]
    Wait Until Element Is Visible          xpath=//option[@value="MAX Infinity"]                                                                                                          50
    Click                                  xpath=//option[@value="MAX Infinity"]
    sleep                                  1 seconds

    # Workstream
    Scroll Element Into View               xpath=//select[@formcontrolname="workstream"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="workstream"]                                                                                                  50
    click                                  xpath=//select[@formcontrolname="workstream"]
    Wait Until Element Is Visible          xpath=//option[@value="Aromatics"]                                                                                                             50
    Click                                  xpath=//option[@value="Aromatics"]
    Sleep                                  3                                                                                                                                              seconds

    # Error "Workstream is required !"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[contains(text(),'Workstream is required !')]
    Run Keyword And Continue on Failure    Element Text Should Be                                                                                                                         xpath=//div[contains(text(),'Workstream is required !')]                                                                Workstream is required !

    # Sub-Workstream
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//select[@formcontrolname="subWorkstream2"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="subWorkstream2"]                                                                                              50
    click                                  xpath=//select[@formcontrolname="subWorkstream2"]
    Wait Until Element Is Visible          xpath=//option[@value="Aromatics - Availability"]                                                                                              50
    Click                                  xpath=//option[@value="Aromatics - Availability"]
    Sleep                                  1 seconds

    # Error "Workstream Leader"
    ################################

    # Workstream Leader (Chatchai.C <TF-BT-TO/4006>)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//select[@formcontrolname="workstreamLead"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="workstreamLead"]                                                                                              50
    click                                  xpath=//select[@formcontrolname="workstreamLead"]
    Wait Until Element Is Visible          xpath=//option[contains(text(),'Thammatad.A <TF-DT-DP>')]                                                                                      50
    Click                                  xpath=//option[contains(text(),'Thammatad.A <TF-DT-DP>')]
    Sleep                                  1 seconds
    # Wait Until Element Is Visible          xpath=//option[@value="CHATCHAI.C@PTTGCGROUP.COM"]                                                                                             50
    # Click                                  xpath=//option[@value="CHATCHAI.C@PTTGCGROUP.COM"]
    # Sleep                                  1 seconds

    # ???????????? Submit
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Submit ')]                                                                                                    50
    click                                  xpath=//button[contains(text(),' Submit ')]
    Sleep                                  5                                                                                                                                              second

    ################################################## IL0 Approve ##################################################

    # Click "Tab My Tasks"
    Sleep                                  5                                                                                                                                              second
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Tasks')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'My Tasks')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Action "Approve"
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='approve-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='approve-button-link']                                                                                                           50
    click                                  xpath=//a[@id='approve-button-link']

    # Check "Action" (IL0)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (IL0)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Submit ')]                                                                                                    50
    click                                  xpath=//button[contains(text(),' Submit ')]

    ################################ Submit IL0 And Input Financial Impact Area #############################

    # Click "My Tasks"
    Sleep                                  10                                                                                                                                             second
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Tasks')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'My Tasks')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" (IL0)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='edit-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='edit-button-link']                                                                                                              50
    click                                  xpath=//a[@id='edit-button-link']

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    # Financial Impact Area
    Scroll Element Into View               xpath=//select[@formcontrolname="financialImpactArea"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="financialImpactArea"]                                                                                         50
    click                                  xpath=//select[@formcontrolname="financialImpactArea"]
    Sleep                                  2                                                                                                                                              second
    Wait Until Element Is Visible          xpath=//option[@value="Balance sheet - Capex"]                                                                                                 50
    click                                  xpath=//option[@value="Balance sheet - Capex"]
    Sleep                                  3                                                                                                                                              second

    # Type Of Benefit
    Scroll Element Into View               xpath=//select[@formcontrolname="financialImpactArea"]
    Wait Until Element Is Visible          xpath=//select[@formcontrolname="financialImpactArea"]                                                                                         50
    click                                  xpath=//select[@formcontrolname="financialImpactArea"]
    Sleep                                  2                                                                                                                                              second
    Wait Until Element Is Visible          xpath=//option[@value="Balance sheet - Capex"]                                                                                                 50
    click                                  xpath=//option[@value="Balance sheet - Capex"]
    Sleep                                  3                                                                                                                                              second

    # Choose Type Of Business
    Scroll Element Into View               xpath=//table[@class="table table-bordered impact-table"]//ng-select[@formcontrolname="typeOfBenefit"]
    Wait Until Element Is Visible          xpath=//table[@class="table table-bordered impact-table"]//ng-select[@formcontrolname="typeOfBenefit"]                                         50
    click                                  xpath=//table[@class="table table-bordered impact-table"]//ng-select[@formcontrolname="typeOfBenefit"]
    Sleep                                  3                                                                                                                                              second
    Wait Until Element Is Visible          xpath=//div[contains(text(),' Manufacturing Fixed Cost - Personal Expense ')]                                                                  50
    click                                  xpath=//div[contains(text(),' Manufacturing Fixed Cost - Personal Expense ')]

    # AUG 2020
    Scroll Element Into View               xpath=//div[@class="form-initiative"][1]//tr[@class="ng-star-inserted"][1]//td[@class="ng-star-inserted"]//input[@ng-reflect-name="month1"]
    Wait Until Element Is Visible          xpath=//div[@class="form-initiative"][1]//tr[@class="ng-star-inserted"][1]//td[@class="ng-star-inserted"]//input[@ng-reflect-name="month1"]    50
    click                                  xpath=//div[@class="form-initiative"][1]//tr[@class="ng-star-inserted"][1]//td[@class="ng-star-inserted"]//input[@ng-reflect-name="month1"]
    type                                   xpath=//div[@class="form-initiative"][1]//tr[@class="ng-star-inserted"][1]//td[@class="ng-star-inserted"]//input[@ng-reflect-name="month1"]    3.443
    click                                  xpath=//th[contains(text(),'Type Of Benefit')]

    # Check "Action" : Submit (IL0)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="col-md-6"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="col-md-6"]//button[contains(text(),' Submit ')]                                                                            50
    click                                  xpath=//div[@class="col-md-6"]//button[contains(text(),' Submit ')]

    ######################################### Approve SIL1 (1) ####################################################

    # Click Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Approve (SIL1)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL1)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL1)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Submit ')]                                                                                                    50
    click                                  xpath=//button[contains(text(),' Submit ')]

    ###################################### Approbe SIL1 (2) ######################################################

    # Tab "Overview"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" (SIL1)(2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL1)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL1)(2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Submit ')]                                                                                                    50
    click                                  xpath=//button[contains(text(),' Submit ')]

    ################################################################### IL1 Check Change Tab ########################################################

    # Tab "My Tasks"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Tasks')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'My Tasks')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" stage = wating
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="edit-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="edit-button-link"]                                                                                                              50
    click                                  xpath=//a[@id="edit-button-link"]
    Sleep                                  3                                                                                                                                              second

    ####################################### Get Benefit Amount (1) #######################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ###################################### Change Tab (1) ##########################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ##################################### Get Run Rate (1) ########################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    #################################### Get firstRunRateMonth (1) ##########################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ################################### Change Month To Upper Case (1) #####################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ################################### Get First Month And Ignor Error Month (1) ##########################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    ######################################## Recheck Tab And Value ##########################################
    ################################## Click "General Information" (2) ##############################################

    # Click "General Information"
    Scroll Element Into View               xpath=//a[contains(text(),' General Information ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' General Information ')]                                                                                            50
    click                                  xpath=//a[contains(text(),' General Information ')]

    ################################# Get Benefit Amount (2) ##############################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ################################ Click Tab Impact Tracking (2) ###########################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ################################ Get Run Rate (2) ##################################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ############################### Get firstRunRateMonth (2) ###########################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ############################### Change Month To Upper Case (2) ##########################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ################################ Get First Month And Ignor Error Month (2) ##########################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    # Click "Submit"
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible          xpath=//button[@class='btn btn-success btn-width ng-star-inserted']                                                                            50
    click                                  xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    ################################# Approve SIL2 (1) ###########################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" stage = SIL2 (1)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]                                               50
    click                                  xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Click "Approve SIL2" (1)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    click                                  xpath=//label[contains(text(),'Approve')]

    # Click "Submit SIL2" (1)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="form-group row justify-content-end"]//button[contains(text(),' Submit ')]
    click                                  xpath=//div[@class="form-group row justify-content-end"]//button[contains(text(),' Submit ')]

    ################################# Approve SIL2 (2) ###########################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" SIL2 (2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]                                               50
    click                                  xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Click "Approve SIL2" (2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    click                                  xpath=//label[contains(text(),'Approve')]

    # Click "Submit SIL2" (2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    click                                  xpath=//button[contains(text(),' Submit ')]

    ############################### Approve SIL2 (3) #############################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" stage = SIL2 (3)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Click "Approve SIL2" (3)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    click                                  xpath=//label[contains(text(),'Approve')]

    # Click "Submit SIL2 (3)"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    click                                  xpath=//button[contains(text(),' Submit ')]

    ########################################## IL2 #######################################################

    # Tab "My Own Initiatives"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'My Own Initiatives')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Own Initiatives')]                                                                                               50
    click                                  xpath=//a[contains(text(),'My Own Initiatives')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" stage = IL2
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="edit-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="edit-button-link"]                                                                                                              50
    click                                  xpath=//a[@id="edit-button-link"]
    Sleep                                  3                                                                                                                                              second

    ################################ Click Tab General Information (IL2)(1) ##############################################

    # Click "General Information"
    Scroll Element Into View               xpath=//a[contains(text(),' General Information ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' General Information ')]                                                                                            50
    click                                  xpath=//a[contains(text(),' General Information ')]

    ############################### Get Benefit Amount (IL2)(1) #################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ############################## Click Tab Impact Tracking (IL2)(1) ##############################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ############################# Get Run Rate (M.THB) (IL2)(1) ################################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ############################ Get firstRunRateMonth (IL2)(1) ##########################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ########################### Change Month To Uppercase (IL2)(1) ##########################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ########################## Get First Month (IL2)(1) ####################################################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    ########################## Click Tab "General Information" (IL2)(2) ####################################

    # Click "General Information"
    Scroll Element Into View               xpath=//a[contains(text(),' General Information ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' General Information ')]                                                                                            50
    click                                  xpath=//a[contains(text(),' General Information ')]

    ########################## Get Benefit Amount (IL2)(2) ##################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ########################## Click Tab Impact Tracking (IL2)(2) ###########################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ############################## Get Run Rate (M.THB) (IL2)(2) ########################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ############################# Get firstRunRateMonth (IL2)(2) ########################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ############################# Change Month To UpperCase (IL2)(2) #############################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ############################# Get First Month (IL2)(2) ##################################################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    ######################################## Input Tab Progress ###########################################

    # Tab "Progress"
    Scroll Element Into View               xpath=//a[contains(text(),' Progress ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' Progress ')]                                                                                                       50
    click                                  xpath=//a[contains(text(),' Progress ')]
    Sleep                                  3                                                                                                                                              second

    # Milestone
    Scroll Element Into View               xpath=//input[@formcontrolname="milestone"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="milestone"]                                                                                                    50
    click                                  xpath=//input[@formcontrolname="milestone"]
    type                                   xpath=//input[@formcontrolname="milestone"]                                                                                                    120
    Sleep                                  3                                                                                                                                              second

    # Key Deliverable
    Scroll Element Into View               xpath=//textarea[@formcontrolname="keyDeliverable"]
    Wait Until Element Is Visible          xpath=//textarea[@formcontrolname="keyDeliverable"]                                                                                            50
    type                                   xpath=//textarea[@formcontrolname="keyDeliverable"]                                                                                            111
    Sleep                                  3                                                                                                                                              second

    # Start
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="start"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="start"]                                                                                                        50
    click                                  xpath=//input[@formcontrolname="start"]

    # ?????????????????????????????????
    ${date}=                               Get Current Date                                                                                                                               UTC                                                                                                                     + 365 days
    ${newDate}=                            Convert Date                                                                                                                                   ${date}                                                                                                                 result_format=%d/%m/%Y
    type                                   xpath=//input[@formcontrolname="start"]                                                                                                        ${newDate}

    # Plan Finish
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="planFinish"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="planFinish"]                                                                                                   50
    click                                  xpath=//input[@formcontrolname="planFinish"]
    Wait Until Element Is Visible          xpath=//button[@class='current']                                                                                                               50
    click                                  xpath=//button[@class='current']

    # ?????? 2024
    Scroll Element Into View               xpath=//span[contains(text(),'2024')]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'2024')]                                                                                                          50
    click                                  xpath=//span[contains(text(),'2024')]

    # ??????????????? July
    Scroll Element Into View               xpath=//span[contains(text(),'July')]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'July')]                                                                                                          50
    click                                  xpath=//span[contains(text(),'July')]

    # ?????????????????? 20
    Wait Until Element Is Visible          xpath=//tr[@class="ng-star-inserted"][3]//span[contains(text(),'20')]                                                                          50
    click                                  xpath=//tr[@class="ng-star-inserted"][3]//span[contains(text(),'20')]

    # Actual Finish
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="actualFinish"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="actualFinish"]                                                                                                 50
    click                                  xpath=//input[@formcontrolname="actualFinish"]
    Wait Until Element Is Visible          xpath=//button[@class='current']                                                                                                               50
    click                                  xpath=//button[@class='current']

    # ?????? 2024
    Scroll Element Into View               xpath=//span[contains(text(),'2024')]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'2024')]                                                                                                          50
    click                                  xpath=//span[contains(text(),'2024')]

    # ??????????????? July
    Scroll Element Into View               xpath=//span[contains(text(),'July')]
    Wait Until Element Is Visible          xpath=//span[contains(text(),'July')]                                                                                                          50
    click                                  xpath=//span[contains(text(),'July')]

    # ?????????????????? 31
    Wait Until Element Is Visible          xpath=//tr[@class="ng-star-inserted"][5]//span[contains(text(),'31')]                                                                          50
    click                                  xpath=//tr[@class="ng-star-inserted"][5]//span[contains(text(),'31')]

    # Click "Submit"
    Sleep                                  2                                                                                                                                              second
    Scroll Element Into View               xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible          xpath=//button[@class='btn btn-success btn-width ng-star-inserted']                                                                            50
    click                                  xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    ################################################# Approve SIL3(1) ##############################################################

    # Click Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Approve (SIL3)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL3)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL3)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ############################################# Approve SIL3(2) #############################################################

    # Click Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Approve (SIL3)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL3)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL3)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ######################################### Approve SIL3(3) ############################################################

    # Click Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Approve (SIL3)(3)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL3)(3)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL3)(3)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ########################################## Approve IL3 ###########################################################

    # My Own Initiatives
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'My Own Initiatives')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Own Initiatives')]                                                                                               50
    click                                  xpath=//a[contains(text(),'My Own Initiatives')]
    Sleep                                  3                                                                                                                                              second

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" (IL3)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='edit-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='edit-button-link']                                                                                                              50
    click                                  xpath=//a[@id='edit-button-link']

    ####################################### Get Benefit Amount (IL3)(1) ################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ####################################### Click Tab Impact Tracking (IL3)(1) ################################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ###################################### Get Run Rate (M.THB) (IL3)(1) ######################################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ##################################### Get Revise Run Rate (M.THB) (IL3)(1) ###############################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row2"]    attribute=value
    Set Global Variable                    ${reviseRunRate(M.THB)}                                                                                                                        ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${runRate(M.THB)}                                                                                                       ${reviseRunRate(M.THB)}

    ######################################## Get firstRunRateMonth (IL3)(1) ################################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ####################################### Change Month To UpperCase (IL3)(1) ##############################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ####################################### Get First Month (IL3)(1) #######################################################3

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    ####################################### Click Tab "General Information" (IL3)(2) ################################################

    # Click "General Information"
    Scroll Element Into View               xpath=//a[contains(text(),' General Information ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' General Information ')]                                                                                            50
    click                                  xpath=//a[contains(text(),' General Information ')]

    ######################################### Get Benefit Amount (IL3)(2) #######################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ######################################## Click Tab Impact Tracking (IL3)(2) ################################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ####################################### Get Run Rate (M.THB) (IL3)(2) ##############################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ##################################### Get Revise Run Rate (M.THB) (IL3)(2) ###############################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row2"]    attribute=value
    Set Global Variable                    ${reviseRunRate(M.THB)}                                                                                                                        ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${runRate(M.THB)}                                                                                                       ${reviseRunRate(M.THB)}

    ###################################### Get firstRunRateMonth (IL3)(2) ##############################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ####################################### Change Month To UpperCase (IL3)(2) ##############################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ####################################### Get First Month (IL3)(2) ########################################################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    # Click "Submit"
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible          xpath=//button[@class='btn btn-success btn-width ng-star-inserted']                                                                            50
    click                                  xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    ########################################## Approve SIL4 (1) ################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Approve" (SIL4)(1)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='approve-overview-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='approve-overview-button-link']                                                                                                  50
    click                                  xpath=//a[@id='approve-overview-button-link']
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL4)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL4)(1)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ########################################## Approve SIL4 (2) ################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Approve" (SIL4)(2)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='approve-overview-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='approve-overview-button-link']                                                                                                  50
    click                                  xpath=//a[@id='approve-overview-button-link']
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL4)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL4)(2)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ########################################## Approve SIL4 (3) ################################################

    # Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Approve" (SIL4)(3)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='approve-overview-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='approve-overview-button-link']                                                                                                  50
    click                                  xpath=//a[@id='approve-overview-button-link']
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL4)(3)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    # Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                   50
    # click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL4)(3)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]                                                     50
    click                                  xpath=//div[@class="card mb-3 mt-2 ng-star-inserted"]//button[contains(text(),' Submit ')]

    ###################################### Submit IL4 And Input Impact Tracking #################################################

    # My Own Initiatives
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'My Own Initiatives')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'My Own Initiatives')]                                                                                               50
    click                                  xpath=//a[contains(text(),'My Own Initiatives')]
    Sleep                                  3                                                                                                                                              second

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click "Edit" (IL4)
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id='edit-button-link']
    Wait Until Element Is Visible          xpath=//a[@id='edit-button-link']                                                                                                              50
    click                                  xpath=//a[@id='edit-button-link']

    ############################################# Check Required ##################################################

    # Click "Submit"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible          xpath=//button[@class='btn btn-success btn-width ng-star-inserted']                                                                            30
    click                                  xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    # Click Required Impact "OK"
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),'OK')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),'OK')]                                                                                                          30
    click                                  xpath=//button[contains(text(),'OK')]

    ####################################### Get Benefit Amount (IL4)(1) ################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ####################################### Click Tab Impact Tracking (IL4)(1) ################################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ###################################### Get Run Rate (M.THB) (IL4)(1) ######################################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ##################################### Get Revise Run Rate (M.THB) (IL4)(1) ###############################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row2"]    attribute=value
    Set Global Variable                    ${reviseRunRate(M.THB)}                                                                                                                        ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${runRate(M.THB)}                                                                                                       ${reviseRunRate(M.THB)}

    #################################### Input Actual Run Rate (M.THB) (IL4)(1) ##############################################

    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row3"]
    Wait Until Element Is Visible          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row3"]                           50
    click                                  xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row3"]
    type                                   xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row3"]                           41.316

    ############################### Check Revise & IL4 Run Rate Recurring (IL4)(1) ###########################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="iL4RunRateRecurring"]                                                                   attribute=value
    Set Global Variable                    ${iL4RunRateRecurring}                                                                                                                         ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${reviseRunRate(M.THB)}                                                                                                 ${reviseRunRate(M.THB)}

    ######################################## Get firstRunRateMonth (IL4)(1) ################################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ####################################### Change Month To UpperCase (IL4)(1) ##############################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ####################################### Get First Month (IL4)(1) #######################################################3

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    ####################################### Click Tab "General Information" (IL4)(2) ################################################

    # Click "General Information"
    Scroll Element Into View               xpath=//a[contains(text(),' General Information ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),' General Information ')]                                                                                            50
    click                                  xpath=//a[contains(text(),' General Information ')]

    ######################################### Get Benefit Amount (IL4)(2) #######################################################

    # Get Benefit Amount
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//input[@formcontrolname="benefitAmount"]
    Wait Until Element Is Visible          xpath=//input[@formcontrolname="benefitAmount"]                                                                                                50
    ${getBenefit}=                         Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="benefitAmount"]                                                                         attribute=value

    ######################################## Click Tab Impact Tracking (IL4)(2) ################################################

    # Tab Impact Tracking
    Sleep                                  3                                                                                                                                              second
    Scroll Element Into View               xpath=//a[contains(text(),'Impact Tracking ')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Impact Tracking ')]                                                                                                 50
    click                                  xpath=//a[contains(text(),'Impact Tracking ')]
    Sleep                                  3                                                                                                                                              second

    ####################################### Get Run Rate (M.THB) (IL4)(2) ##############################################

    # Get Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row1"]    attribute=value
    Set Global Variable                    ${runRate(M.THB)}                                                                                                                              ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getBenefit}                                                                                                           ${runRate(M.THB)}

    ##################################### Get Revise Run Rate (M.THB) (IL4)(2) ###############################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//div[@class="form-initiative"][1]//td[@class="impact-col-3 ng-star-inserted"]//input[@formcontrolname="row2"]    attribute=value
    Set Global Variable                    ${reviseRunRate(M.THB)}                                                                                                                        ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${runRate(M.THB)}                                                                                                       ${reviseRunRate(M.THB)}

    #################################################### Check Revise & IL4 Run Rate Recurring (IL4)(2) #########################################################

    # Get Revise Run Rate (M.THB)
    ${getCode}=                            Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="iL4RunRateRecurring"]                                                                   attribute=value
    Set Global Variable                    ${iL4RunRateRecurring}                                                                                                                         ${getCode}
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${reviseRunRate(M.THB)}                                                                                                 ${reviseRunRate(M.THB)}

    ###################################### Get firstRunRateMonth (IL4)(2) ##############################################

    # Get firstRunRateMonth
    ${getFirstRunRateMonth}=               Get Element Attribute                                                                                                                          xpath=//input[@formcontrolname="firstRunRateMonth"]                                                                     attribute=value                              #xpath=//input[@formcontrolname="firstRunRateMonth"]
    Set Global Variable                    ${firstRunRateMonth}                                                                                                                           ${getFirstRunRateMonth}

    ####################################### Change Month To UpperCase (IL4)(2) ##############################################

    # UpperCase
    ${firstRunRateMonthUpper}=             Convert To Uppercase                                                                                                                           ${firstRunRateMonth}

    ####################################### Get First Month (IL4)(2) ########################################################

    # Get First Month
    ${getFirstMonth}=                      Get Text                                                                                                                                       xpath=//thead[@class='text-center bg-light']//th[@class='fixedMonth ng-star-inserted'][1]
    Run Keyword And Continue on Failure    Should Be Equal                                                                                                                                ${getFirstMonth}                                                                                                        ${firstRunRateMonthUpper}

    # Click "Submit"
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible          xpath=//button[@class='btn btn-success btn-width ng-star-inserted']                                                                            50
    click                                  xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    ############################################ Approve SIL5 ###########################################################
    # Click Tab "Overview"
    Sleep                                  10                                                                                                                                             second
    Scroll Element Into View               xpath=//a[contains(text(),'Overview')]
    Wait Until Element Is Visible          xpath=//a[contains(text(),'Overview')]                                                                                                         50
    click                                  xpath=//a[contains(text(),'Overview')]

    # ???????????????
    # search
    Sleep                                  5                                                                                                                                              second
    click                                  xpath=//input[@placeholder='Search']
    type                                   xpath=//input[@placeholder='Search']                                                                                                           ${initiativeCode}

    click                                  xpath=//div[@class='input-group-prepend']//button[@class='btn']

    # Click Approve (SIL5)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//a[@id="approve-overview-button-link"]
    Wait Until Element Is Visible          xpath=//a[@id="approve-overview-button-link"]                                                                                                  50
    click                                  xpath=//a[@id="approve-overview-button-link"]
    Sleep                                  3                                                                                                                                              second

    # Check "Action" (SIL5)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible          xpath=//label[contains(text(),'Approve')]                                                                                                      50
    click                                  xpath=//label[contains(text(),'Approve')]
    Sleep                                  5                                                                                                                                              second

    # Click "Submit" (SIL5)
    Sleep                                  5                                                                                                                                              second
    Scroll Element Into View               xpath=//button[contains(text(),' Submit ')]
    Wait Until Element Is Visible          xpath=//button[contains(text(),' Submit ')]                                                                                                    50
    click                                  xpath=//button[contains(text(),' Submit ')]

*** Keywords ***
open
    [Arguments]                            ${element}
    Go To                                  ${element}

wait
    [Arguments]                            ${element}
    Wait Until Element Is Visible          ${element}                                                                                                                                     30

waitAndType
    [Arguments]                            ${element}
    Input Text                             ${element}

click
    [Arguments]                            ${element}
    Click Element                          ${element}

sendKeys
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Press Keys                             ${element}                                                                                                                                     ${value}

submit
    [Arguments]                            ${element}
    Submit Form                            ${element}

type
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Input Text                             ${element}                                                                                                                                     ${value}

selectAndWait
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Select From List                       ${element}                                                                                                                                     ${value}

select
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Select From List                       ${element}                                                                                                                                     ${value}

verifyValue
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

verifyText
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

verifyElementPresent
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

verifyVisible
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

verifyTitle
    [Arguments]                            ${title}
    Title Should Be                        ${title}

verifyTable
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

assertConfirmation
    [Arguments]                            ${value}
    Alert Should Be Present                ${value}

assertText
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

assertValue
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

assertElementPresent
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

assertVisible
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

assertTitle
    [Arguments]                            ${title}
    Title Should Be                        ${title}

assertTable
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

waitForText
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

waitForValue
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

waitForElementPresent
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

waitForVisible
    [Arguments]                            ${element}
    Page Should Contain Element            ${element}

waitForTitle
    [Arguments]                            ${title}
    Title Should Be                        ${title}

waitForTable
    [Arguments]                            ${element}                                                                                                                                     ${value}
    Element Should Contain                 ${element}                                                                                                                                     ${value}

doubleClick
    [Arguments]                            ${element}
    Double Click Element                   ${element}

doubleClickAndWait
    [Arguments]                            ${element}
    Double Click Element                   ${element}

goBack
    Go Back

goBackAndWait
    Go Back

runScript
    [Arguments]                            ${code}
    Execute Javascript                     ${code}

runScriptAndWait
    [Arguments]                            ${code}
    Execute Javascript                     ${code}

setSpeed
    [Arguments]                            ${value}
    Set Selenium Timeout                   ${value}

setSpeedAndWait
    [Arguments]                            ${value}
    Set Selenium Timeout                   ${value}

verifyAlert
    [Arguments]                            ${value}
    Alert Should Be Present                ${value}

Clear Field Of Characters
    [Arguments]                            ${field}
    [Documentation]                        This keyword pushes the delete key
    Press Keys                             ${field}                                                                                                                                       CTRL+a+BACKSPACE

##########################################################

    # # Get First Month
    # ${getName}=
    # ...                              Get Element Attribute
    # ...                              xpath=//ng-select[@formcontrolname="company"]
    # ...                              attribute=value
    # Should Be Equal
    # ...                              ${getName}
    # ...                              abcde


