Feature: Asset Management in Salesforce
    As a Salesforce user
    I want to create and manage assets
    So that I can track customer assets effectively

  Scenario Outline: Create a new asset with complete details
    Given Open a browser and login to the sales force site
    When Search for "Assets" in app launcher
    And I create a new asset with following details:
      | Field            | Value             |
      | Asset Name       | <assetName>       |
      | Account Name     | <accountName>     |
      | Contact          | <contact>         |
      | Serial Number    | <serialNumber>    |
      | Competitor Asset | <competitorAsset> |
      | Install Date     | <installDate>     |
      | Purchase Date    | <purchaseDate>    |
      | Status           | <status>          |
      | Usage End Date   | <usageEndDate>    |
      | Quantity         | <quantity>        |
      | Price            | <price>           |
      | Description      | <description>     |
    Then I should see the asset created successfully
      | Field Name | Value       |
      | Asset Name | <assetName> |

    Examples:
      | assetName    | accountName    | contact    | serialNumber | competitorAsset | installDate | purchaseDate | status  | usageEndDate | quantity | price | description                                     |
      | Test Asset 1 | Test Account 1 | Jhon Smith | SN001        | true            |  30/10/2025 |   30/10/2025 | Shipped |   30/10/2026 |        1 |  1000 | Enterprise hardware asset for customer tracking |
    #   | Demo Asset 2 | Demo Account 2 | auto    | SN002        | false           |  11/01/2025 |   11/01/2025 | Installed |   11/01/2026 |        1 |  2000 | Demo software licenses for training purposes    |
