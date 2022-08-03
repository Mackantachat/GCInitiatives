*** Settings ***
Library             Selenium2Library

*** Variables ***
${browser}          chrome
${url}              https://gcinitiative-front.azurewebsites.net/
${url1}             https://gcinitiative-front-qa.azurewebsites.net/
${username}         z0007141@pttgcgroup.com
${password}         3#Weedas
${Approveruser1}    z0007142@pttgcgroup.com
${Approverpass1}    2#First136969
${selspeed}         0.5s
*** Test Case ***
Log in User New Initiatives
    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    100 seconds
    Input Text                       passwd                                                                                                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # หน้า General Information
    # Go To                            https://gcinitiative-front.azurewebsites.net/initiative/create
    Go To                            https://gcinitiative-front-qa.azurewebsites.net/initiative/create
    # Input initiative Name
    Click Element                    xpath=//input[@formcontrolname="name"]
    Input Text                       xpath=//input[@formcontrolname="name"]                                                                                                                         Testproject

    # Input Company Name
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="company"]
    click                            xpath=//ng-select[@formcontrolname="company"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]                                                                                             30
    type                             xpath=//ng-select[@formcontrolname="company"]//input[@type="text"]                                                                                             PTT Global Chemical Public Company Limited
    click                            xpath=//span[@class='ng-option-label'][contains(text(),'PTT Global Chemical Public Company Limited')]

    # Input Plant
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="plant"]
    click                            xpath=//ng-select[@formcontrolname="plant"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="plant"]//input[@type="text"]                                                                                               30
    Wait Until Element Is Visible    xpath=//span[contains(text(),'GC04 : Aromatics 1')]                                                                                                            50
    click                            xpath=//span[contains(text(),'GC04 : Aromatics 1')]

    # Organization (Budget Owner)
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="organization"]
    click                            xpath=//ng-select[@formcontrolname="organization"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]                                                                                        30
    type                             xpath=//ng-select[@formcontrolname="organization"]//input[@type="text"]                                                                                        ARO
    Wait Until Element Is Visible    xpath=//span[contains(text(),'ARO')]                                                                                                                           50
    click                            xpath=//span[contains(text(),'ARO')]

    # Finish Date
    Scroll Element Into View         xpath=//input[@formcontrolname="finishingDate"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="finishingDate"]                                                                                                                30
    click                            xpath=//input[@formcontrolname="finishingDate"]

    # เลือกปี ปฏิทิน
    Wait Until Element Is Visible    xpath=//button[@class='current']                                                                                                                               50
    click                            xpath=//button[@class='current']

    # เลือกปี 2022
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2022')]                                                                                           50
    click                            xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2022')]

    # เลือก ธันวาคม
    Wait Until Element Is Visible    xpath=//span[contains(text(),'December')]                                                                                                                      50
    click                            xpath=//span[contains(text(),'December')]

    # เลือกวันที่ 31
    Wait Until Element Is Visible    xpath=//span[contains(text(),'31')]                                                                                                                            50
    click                            xpath=//span[contains(text(),'31')]

    # Background
    Scroll Element Into View         xpath=//textarea[@formcontrolname="background"]
    click                            xpath=//textarea[@formcontrolname="background"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="background"]                                                                                                                30
    type                             xpath=//textarea[@formcontrolname="background"]                                                                                                                Test

    # Objective/Expected Result
    Scroll Element Into View         xpath=//textarea[@formcontrolname="background"]
    click                            xpath=//textarea[@formcontrolname="resultObjective"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="resultObjective"]                                                                                                           30
    type                             xpath=//textarea[@formcontrolname="resultObjective"]                                                                                                           Test

    # Scope of Work
    Scroll Element Into View         xpath=//textarea[@formcontrolname="scopeOfWork"]
    click                            xpath=//textarea[@formcontrolname="scopeOfWork"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="scopeOfWork"]                                                                                                               30
    type                             xpath=//textarea[@formcontrolname="scopeOfWork"]                                                                                                               Test

    # Cost Estimated (CAPEX)
    Scroll Element Into View         xpath=//input[@formcontrolname="costEstCapex"]
    click                            xpath=//input[@formcontrolname="costEstCapex"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="costEstCapex"]                                                                                                                 30
    type                             xpath=//input[@formcontrolname="costEstCapex"]                                                                                                                 20.5

    # Budget Source
    Scroll Element Into View         xpath=//select[@formcontrolname="budgetSource"]
    click                            xpath=//select[@formcontrolname="budgetSource"]
    Wait Until Element Is Visible    xpath=//option[contains(text(),'CAPEX')]                                                                                                                       30
    click                            xpath=//option[contains(text(),'CAPEX')]

    # Type of Investment
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    click                            xpath=//ng-select[@formcontrolname="typeOfInvestment"]
    type                             xpath=//ng-select[@formcontrolname="typeOfInvestment"]//input[@type="text"]                                                                                    Welfare
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Welfare')]                                                                                                                       30
    click                            xpath=//span[contains(text(),'Welfare')]

    # Type of Benefit
    Wait Until Element Is Visible    xpath=//select[@formcontrolname="typeBenefit"]                                                                                                                 30
    click                            xpath=//select[@formcontrolname="typeBenefit"]
    Wait Until Element Is Visible    xpath=//option[contains(text(),'NON-FINANCIAL')]                                                                                                               30
    click                            xpath=//option[contains(text(),'NON-FINANCIAL')]

    # ปุ่ม Suggest
    Scroll Element Into View         xpath=//button[@class='btn btn-info hvr-shadow']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-info hvr-shadow']                                                                                                               30
    click                            xpath=//button[@class='btn btn-info hvr-shadow']

    # ปุ่ม Next
    Sleep                            5                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class="btn btn-primary btn-width ng-star-inserted"]
    Wait Until Element Is Visible    xpath=//button[@class="btn btn-primary btn-width ng-star-inserted"]                                                                                            50
    click                            xpath=//button[@class="btn btn-primary btn-width ng-star-inserted"]

    # Vice President of Owner (VP)
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="president"]                                                                                                                50
    click                            xpath=//ng-select[@formcontrolname="president"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Abhisit.C <SC-EX-SE')]                                                                                                           50
    click                            xpath=//span[contains(text(),'Abhisit.C <SC-EX-SE')]

    # Division Manager of Owner (DM)
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="manager"]                                                                                                                  50
    click                            xpath=//ng-select[@formcontrolname="manager"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Achariya.K <F-CF-ST')]                                                                                                           50
    click                            xpath=//span[contains(text(),'Achariya.K <F-CF-ST')]

    # Project Manager
    Sleep                            5                                                                                                                                                              second
    Scroll Element Into View         xpath=//ng-select[@formcontrolname="projectManager"]
    Wait Until Element Is Visible    xpath=//ng-select[@formcontrolname="projectManager"]                                                                                                           50
    click                            xpath=//ng-select[@formcontrolname="projectManager"]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Abdulroning.O <DEP-EMM-ECC')]                                                                                                    50
    click                            xpath=//span[contains(text(),'Abdulroning.O <DEP-EMM-ECC')]

    # Project Manager
    Scroll Element Into View         xpath=//div[@id='Investment']

    # Investment Framework
    Sleep                            5                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']                                                                                                                                  50
    click                            xpath=//div[@id='Investment']

    # Strategic Analysis
    Scroll Element Into View         xpath=//div[@id='strategic']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']                                                                                                                                   50
    click                            xpath=//div[@id='strategic']

    # Business Analysis
    Scroll Element Into View         xpath=//div[@id="business"]
    Wait Until Element Is Visible    xpath=//div[@id="business"]                                                                                                                                    50
    click                            xpath=//div[@id="business"]

    # Quality Index
    Scroll Element Into View         xpath=//div[@id="quality"]
    Wait Until Element Is Visible    xpath=//div[@id="quality"]                                                                                                                                     50
    click                            xpath=//div[@id="quality"]

    # Return of Investment
    Scroll Element Into View         xpath=//div[@id='return']
    Wait Until Element Is Visible    xpath=//div[@id='return']                                                                                                                                      50
    click                            xpath=//div[@id='return']

    # Input Depreciation Cost
    Scroll Element Into View         xpath=//input[@formcontrolname="depreciationCost"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="depreciationCost"]                                                                                                             50
    type                             xpath=//input[@formcontrolname="depreciationCost"]                                                                                                             120

    # Input Useful life (Year)
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="usefulYear"]                                                                                                                   50
    click                            xpath=//input[@formcontrolname="usefulYear"]
    type                             xpath=//input[@formcontrolname="usefulYear"]                                                                                                                   2

    # Input Useful life (Month)
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="usefulMonth"]                                                                                                                  50
    click                            xpath=//input[@formcontrolname="usefulMonth"]
    type                             xpath=//input[@formcontrolname="usefulMonth"]                                                                                                                  1

    # Additional Information
    Scroll Element Into View         xpath=//div[@id='additional']
    Wait Until Element Is Visible    xpath=//div[@id='additional']                                                                                                                                  50
    click                            xpath=//div[@id='additional']

    # For Environment (EMA)
    Scroll Element Into View         xpath=//input[@id='falseEnvironment']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseEnvironment"]                               50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseEnvironment"]

    # For Turnaround Project
    Scroll Element Into View         xpath=//input[@id='falseTurnaround']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseTurnaround"]                                50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseTurnaround"]

    # Replace Equipment
    Scroll Element Into View         xpath=//input[@id='falseEquipment']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseEquipment"]                                 50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseEquipment"]

    # Equipment or Asset which constructed from project (Ex. Boiler, CCR Building ,Hardware/Software/License etc.)
    Scroll Element Into View         xpath=//textarea[@formcontrolname="equipmentOrAsset"]
    Wait Until Element Is Visible    xpath=//textarea[@formcontrolname="equipmentOrAsset"]                                                                                                          50
    type                             xpath=//textarea[@formcontrolname="equipmentOrAsset"]                                                                                                          Test

    # BOI
    Scroll Element Into View         xpath=//input[@id='falseBoi']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseBoi"]                                       50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseBoi"]

    # Do you have Additional Information
    Scroll Element Into View         xpath=//input[@id='falseAdditional']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseAdditional"]                                50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseAdditional"]

    # Coordinate with external parties (Outside Company)
    Scroll Element Into View         xpath=//input[@id='falseCoordinate']
    Wait Until Element Is Visible    xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseCoordinate"]                                50
    click                            xpath=//div[@class="mt-1"]//div[@class="custom-control custom-radio custom-control-inline ml-5"]//label[@for="falseCoordinate"]

    # ปุ่ม Save Draft
    Scroll Element Into View         xpath=//button[contains(text(),'Save Draft')]
    Wait Until Element Is Visible    xpath=//button[contains(text(),'Save Draft')]                                                                                                                  50
    Sleep                            5                                                                                                                                                              second
    click                            xpath=//button[contains(text(),'Save Draft')]

    # CAPEX Information
    Sleep                            5                                                                                                                                                              second
    Scroll Element Into View         xpath=//li[@class="nav-item ng-star-inserted"]//a[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//li[@class="nav-item ng-star-inserted"]//a[contains(text(),'CAPEX Information')]                                                                        50
    click                            xpath=//li[@class="nav-item ng-star-inserted"]//a[contains(text(),'CAPEX Information')]

    # Request Project No. Date (Budget Start Date)
    Sleep                            5                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//input[@name='RequestIniNoDate_1']                                                                                                                      50
    Scroll Element Into View         xpath=//input[@name='RequestIniNoDate_1']
    click                            xpath=//input[@name='RequestIniNoDate_1']

    # เลือกปี ปฏิทิน
    Wait Until Element Is Visible    xpath=//button[@class='current']                                                                                                                               50
    click                            xpath=//button[@class='current']

    # เลือกปี 2021
    Wait Until Element Is Visible    xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2021')]                                                                                           50
    click                            xpath=//tr[@class="ng-star-inserted"]//span[contains(text(),'2021')]

    # เลือก กุมภาพันธ์
    Wait Until Element Is Visible    xpath=//span[contains(text(),'February')]                                                                                                                      50
    click                            xpath=//span[contains(text(),'February')]

    # เลือกวันที่ 04
    Wait Until Element Is Visible    xpath=//tr[1]//td[5]//span[1]                                                                                                                                  50
    click                            xpath=//tr[1]//td[5]//span[1]

    # Budget Period (Annual (2021))
    Scroll Element Into View         xpath=//label[contains(text(),'Annual (2021)')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Annual (2021)')]                                                                                                                50
    click                            xpath=//label[contains(text(),'Annual (2021)')]

    # Annual Investment Plan
    # ปุ่ม ADD
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-primary mt-3']                                                                                                                  30
    Scroll Element Into View         xpath=//button[@class='btn btn-primary mt-3']
    click                            xpath=//button[@class='btn btn-primary mt-3']

    # ปุ่ม ADD รอบที่ 2
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-primary mt-3']                                                                                                                  30
    Scroll Element Into View         xpath=//button[@class='btn btn-primary mt-3']
    click                            xpath=//button[@class='btn btn-primary mt-3']

    # ปุ่ม ถังขยะ
    Scroll Element Into View         xpath=//td[@class='text-center']//button[@class='btn btn-danger btn-sm mt-3 ng-star-inserted']
    Sleep                            2                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//td[@class='text-center']//button[@class='btn btn-danger btn-sm mt-3 ng-star-inserted']                                                                 30
    Scroll Element Into View         xpath=//td[@class='text-center']//button[@class='btn btn-danger btn-sm mt-3 ng-star-inserted']
    click                            xpath=//td[@class='text-center']//button[@class='btn btn-danger btn-sm mt-3 ng-star-inserted']

    # หน่วยค่าเงิน
    Scroll Element Into View         xpath=//td[@ng-reflect-name="1"]//select[@ng-reflect-name="currencyTitle"]
    Wait Until Element Is Visible    xpath=//td[@ng-reflect-name="1"]//select[@ng-reflect-name="currencyTitle"]                                                                                     50
    click                            xpath=//td[@ng-reflect-name="1"]//select[@ng-reflect-name="currencyTitle"]
    Wait Until Element Is Visible    xpath=//td[@ng-reflect-name="1"]//select[@ng-reflect-name="currencyTitle"]//option[@value="Million Yuan"]                                                      50
    click                            xpath=//td[@ng-reflect-name="1"]//select[@ng-reflect-name="currencyTitle"]//option[@value="Million Yuan"]

    # ค่า FX
    Scroll Element Into View         xpath=//input[@formcontrolname="fx"]
    Wait Until Element Is Visible    xpath=//input[@formcontrolname="fx"]                                                                                                                           50
    click                            xpath=//input[@formcontrolname="fx"]
    type                             xpath=//input[@formcontrolname="fx"]                                                                                                                           4.48

    # ปี 2021 (บาท)
    Scroll Element Into View         xpath=//tr[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//td[3]//input[1]
    Wait Until Element Is Visible    xpath=//tr[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//td[3]//input[1]                                                                            50
    click                            xpath=//tr[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//td[3]//input[1]
    type                             xpath=//tr[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//td[3]//input[1]                                                                            10.25

    # ปี 2021 (หยวน)
    Wait Until Element Is Visible    xpath=/html/body/app-root/app-main/div/app-main/app-capex/div/div[3]/div/div/div/form/form/div[1]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/input    50
    click                            xpath=/html/body/app-root/app-main/div/app-main/app-capex/div/div[3]/div/div/div/form/form/div[1]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/input
    type                             xpath=/html/body/app-root/app-main/div/app-main/app-capex/div/div[3]/div/div/div/form/form/div[1]/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/input    1.5

    # ปี 2022 (บาท)
    Scroll Element Into View         xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]
    Wait Until Element Is Visible    xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]                                                                   50
    click                            xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]
    type                             xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]                                                                   3.55

    # ปุ่ม OK
    click                            xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@class="swal2-confirm swal2-styled"]                                                                                                            50
    click                            xpath=//button[@class="swal2-confirm swal2-styled"]

    # ปี 2022 (บาท)
    Sleep                            2                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]                                                                   50
    Clear Field Of Characters        xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]
    click                            xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]
    type                             xpath=//form[@class='ng-valid ng-star-inserted ng-dirty ng-touched']//tbody//td[4]//input[1]                                                                   3.53

    # Monthly Investment Plan (2021)
    # ปุ่ม +
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]

    # Investment Plan (FEB)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]                          2000000

    # Investment Plan (MAR)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]                          2000000

    # Investment Plan (APR)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]                          2000000

    # Investment Plan (MAY)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]                          2000000

    # Investment Plan (JUN)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]                          2000000

    # Investment Plan (SEP/BATH)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]                          200000

    # Investment Plan (OCT)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]                         50000

    # Investment Plan (SEP/YUAN)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m9"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m9"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m9"]                          1000000

    # Investment Plan (NOV/YUAN)
    Scroll Element Into View         xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m11"]
    click                            xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m11"]
    type                             xpath=//tbody[@class="ng-star-inserted"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m11"]                         500000

    # Monthly Investment Plan (2022)
    # ปุ่ม +
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M2"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M2"]

    # Investment Plan (JAN/BATH)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]                                             500000

    # Investment Plan (JAN/YUAN)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]                                             1

    # Investment Plan (FEB)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m2"]                                             500000

    # Investment Plan (MAR)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m3"]                                             500000

    # Investment Plan (APR)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m4"]                                             500000

    # Investment Plan (MAY)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m5"]                                             500000

    # Investment Plan (JUN)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m6"]                                             500000

    # Investment Plan (JUL)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m7"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m7"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m7"]                                             100000

    # Investment Plan (AUG)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m8"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m8"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m8"]                                             100000

    # Investment Plan (SEP)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]                                             100000

    # Investment Plan (OCT)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]                                            100000

    # Investment Plan (NOV)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m11"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m11"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m11"]                                            100000

    # Investment Plan (DEC)
    Scroll Element Into View         xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    click                            xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    type                             xpath=//div[@id="M2"]//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]                                            30000

    # ปุ่ม Save Draft
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[contains(text(),'Save Draft')]
    Wait Until Element Is Visible    xpath=//button[contains(text(),'Save Draft')]                                                                                                                  50
    click                            xpath=//button[contains(text(),'Save Draft')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    click                            xpath=//button[@class="btn btn-success btn-width ng-star-inserted"]

    # ปิดโปรแกรมทั้งหมด
    Close All Browsers

Log in Revise By DM
    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Tasks
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Revise
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Revise')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Revise')]                                                                                                                       50
    click                            xpath=//label[contains(text(),'Revise')]

    # Input Remark
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//textarea[@id='Remark']
    Wait Until Element Is Visible    xpath=//textarea[@id='Remark']                                                                                                                                 50
    type                             xpath=//textarea[@id='Remark']                                                                                                                                 แก้ไขการแจกแจงเงินของปีแรก

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Edit Detail
    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    100 seconds
    Input Text                       passwd                                                                                                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # Click My Tasks
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Click Edit Revised
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-warning btn-sm mr-1 text-white btn-list ng-star-inserted"]
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-warning btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-warning btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # Click General Information
    # Edit Initiatives
    # Footer
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='container my-2 mt-3']
    Wait Until Element Is Visible    xpath=//div[@class='container my-2 mt-3']                                                                                                                      50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                                50
    click                            xpath=//a[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'CAPEX Information')]                                                                                                                50
    click                            xpath=//a[contains(text(),'CAPEX Information')]

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    click                            xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    Clear Field Of Characters        xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m10"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m8"]
    click                            xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    Clear Field Of Characters        xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]
    Sleep                            2                                                                                                                                                              second
    type                             xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m9"]                                      250000
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='container my-2 mt-3']
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]

    # เลื่อนลงมา Click ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-width ng-star-inserted']
    click                            xpath=//button[@class='btn btn-success btn-width ng-star-inserted']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in Approve By DM

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Check Status DM Approve

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    100 seconds
    Input Text                       passwd                                                                                                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # Click เลือก My Own Initiatives
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Own Initiatives')]                                                                                                               50
    click                            xpath=//a[contains(text(),'My Own Initiatives')]

    # Check VP
    Sleep                            3                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                                   50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]

    # Click General Information
    # Edit Initiatives
    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]

    # Tab Status
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Status')]                                                                                                                        50
    Scroll Element Into View         xpath=//span[contains(text(),'Status')]
    click                            xpath=//span[contains(text(),'Status')]

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser


Log in Approve By VP

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Check Status VP Approve

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    100 seconds
    Input Text                       passwd                                                                                                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # Click เลือก My Own Initiatives
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Own Initiatives')]                                                                                                               50
    click                            xpath=//a[contains(text(),'My Own Initiatives')]

    # Check VP
    Sleep                            3                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                                   50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]

    # Click General Information
    # Edit Initiatives
    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]

    # Tab Status
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Status')]                                                                                                                        50
    Scroll Element Into View         xpath=//span[contains(text(),'Status')]
    click                            xpath=//span[contains(text(),'Status')]

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in Approve By EVP/MD/SEVP/COE/PSD/CEO

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Check Status EVP/MD/SEVP/COE/PSD/CEO Approve

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${username}
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    100 seconds
    Input Text                       passwd                                                                                                                                                         ${password}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    sleep                            5 seconds

    # Click เลือก My Own Initiatives
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Own Initiatives')]                                                                                                               50
    click                            xpath=//a[contains(text(),'My Own Initiatives')]

    # Check VP
    Sleep                            3                                                                                                                                                              second
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]                                                                                   50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@type="button"]

    # Click General Information
    # Edit Initiatives
    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="1"]//input[@ng-reflect-name="m1"]

    # Tab Status
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Status')]                                                                                                                        50
    Scroll Element Into View         xpath=//span[contains(text(),'Status')]
    click                            xpath=//span[contains(text(),'Status')]

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in Approve By BUDGET TEAM

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Check Status Budget Team Approve

    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in Approve By BOD
    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

Log in User Check Status BOD Approve
    # Open Browser
    Open Browser                     ${url1}                                                                                                                                                        ${browser}                                    ${selspeed}
    Maximize Browser Window
    Wait Until Element Is Visible    name=loginfmt

    # Login Creator
    Input Text                       loginfmt                                                                                                                                                       ${Approveruser1}
    click Button                     id=idSIButton9
    # sleep                                             5 seconds
    Wait Until Element Is Visible    name=passwd                                                                                                                                                    60 seconds
    Input Text                       passwd                                                                                                                                                         ${Approverpass1}
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Wait Until Element Is Visible    id=idSIButton9                                                                                                                                                 60 seconds
    click Button                     id=idSIButton9
    Sleep                            5 seconds

    # Click My Task
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//a[contains(text(),'My Tasks')]
    Wait Until Element Is Visible    xpath=//a[contains(text(),'My Tasks')]                                                                                                                         50
    click                            xpath=//a[contains(text(),'My Tasks')]

    # Action
    Wait Until Element Is Visible    xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]                        50
    click                            xpath=//tr[@class="table-initiative ng-star-inserted"][1]//a[@class="btn btn-success btn-sm mr-1 text-white btn-list ng-star-inserted"]

    # เลื่อนลงมา
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'General Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'General Information')]                                                                                                           50

    # เลื่อนลงมา Direct CAPEX
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Direct CAPEX')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Direct CAPEX')]                                                                                                                 50

    # เลื่อนขึ้นมา Detail Information (Direct CAPEX)
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]                                                                                             50
    click                            xpath=//span[contains(text(),'Detail Information (Direct CAPEX)')]

    # เลื่อนลงมาเปิด Investment Framework
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='Investment']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='Investment']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='Investment']//div[@class='card-header']

    # เลื่อนลงมาเปิด Strategic Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='strategic']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='strategic']//div[@class='card-header']                                                                                                        50
    click                            xpath=//div[@id='strategic']//div[@class='card-header']

    # เลื่อนลงมาเปิด Business Analysis
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='business']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='business']//div[@class='card-header']                                                                                                         50
    click                            xpath=//div[@id='business']//div[@class='card-header']

    # เลื่อนลงมาเปิด Quality Index
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='quality']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='quality']//div[@class='card-header']                                                                                                          50
    click                            xpath=//div[@id='quality']//div[@class='card-header']

    # เลื่อนลงมาเปิด Return of Investment
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='return']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='return']//div[@class='card-header']                                                                                                           50
    click                            xpath=//div[@id='return']//div[@class='card-header']

    # เลื่อนลงมาเปิด Additional Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='additional']//div[@class='card-header']
    Wait Until Element Is Visible    xpath=//div[@id='additional']//div[@class='card-header']                                                                                                       50
    click                            xpath=//div[@id='additional']//div[@class='card-header']

    # เลื่อนลงมา No
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[@for="falseCoordinate"]
    Wait Until Element Is Visible    xpath=//label[@for="falseCoordinate"]                                                                                                                          50

    # เลื่อนขึ้นมาที่ CAPEX Information
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//span[contains(text(),'CAPEX Information')]
    Wait Until Element Is Visible    xpath=//span[contains(text(),'CAPEX Information')]                                                                                                             50
    click                            xpath=//span[contains(text(),'CAPEX Information')]

    # เลื่อนลงมาที่ตาราง Annual Investment Plan
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']
    Wait Until Element Is Visible    xpath=//form[@class='ng-untouched ng-star-inserted ng-dirty']//div[@class='col-md-12']                                                                         50

    # เลื่อนลงมา Monthly Investment Plan (2021)
    # กดปุ่ม +
    Sleep                            3                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M1"]
    Wait Until Element Is Visible    xpath=//button[@data-target="#M1"]                                                                                                                             50
    click                            xpath=//button[@data-target="#M1"]
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M1"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # ปุ่ม + Monthly Investment Plan (2022)
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@data-target="#M2"]
    click                            xpath=//button[@data-target="#M2"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id='M2']//label[contains(text(),'Total Baht')]
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m12"]
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@id="M2"]//tbody//tr[@formarrayname="monthForm_list"]//td[@ng-reflect-name="0"]//input[@ng-reflect-name="m1"]

    # เลื่อนขึ้นมา Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']
    Wait Until Element Is Visible    xpath=//div[@class='card mb-3 mt-2 ng-star-inserted']//div[@class='card-body']                                                                                 50

    # เลือก Action : Approve
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//label[contains(text(),'Approve')]
    Wait Until Element Is Visible    xpath=//label[contains(text(),'Approve')]                                                                                                                      50
    click                            xpath=//label[contains(text(),'Approve')]

    # ปุ่ม Submit
    Sleep                            2                                                                                                                                                              second
    Scroll Element Into View         xpath=//button[@class='btn btn-success btn-approve mr-2']
    Wait Until Element Is Visible    xpath=//button[@class='btn btn-success btn-approve mr-2']                                                                                                      50
    click                            xpath=//button[@class='btn btn-success btn-approve mr-2']

    # ปิดโปรแกรม
    Sleep                            2                                                                                                                                                              second
    Close Browser

*** Keywords ***
open
    [Arguments]                      ${element}
    Go To                            ${element}

wait
    [Arguments]                      ${element}
    Wait Until Element Is Visible    ${element}                                                                                                                                                     30

waitAndType
    [Arguments]                      ${element}
    Input Text                       ${element}

click
    [Arguments]                      ${element}
    Click Element                    ${element}

sendKeys
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Press Keys                       ${element}                                                                                                                                                     ${value}

submit
    [Arguments]                      ${element}
    Submit Form                      ${element}

type
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Input Text                       ${element}                                                                                                                                                     ${value}

selectAndWait
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Select From List                 ${element}                                                                                                                                                     ${value}

select
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Select From List                 ${element}                                                                                                                                                     ${value}

verifyValue
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

verifyText
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

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
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

assertConfirmation
    [Arguments]                      ${value}
    Alert Should Be Present          ${value}

assertText
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

assertValue
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

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
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

waitForText
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

waitForValue
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

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
    [Arguments]                      ${element}                                                                                                                                                     ${value}
    Element Should Contain           ${element}                                                                                                                                                     ${value}

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
    Press Keys                       ${field}                                                                                                                                                       CTRL+a+BACKSPACE
