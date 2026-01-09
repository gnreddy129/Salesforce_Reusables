Feature: Asset Management in Salesforce
    As a Salesforce user
    I want to create and manage assets
    So that I can track customer assets effectively

  Scenario Outline: Create a new asset with complete details
    Given Open a browser and login to the sales force site
    When Search for "Assets" in app launcher
    Then Click on "New" button of "Assets"
    And I create a new asset with following details:
      | Field Name       | Value             |
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
      | assetName    | accountName | contact | serialNumber | competitorAsset | installDate | purchaseDate | status  | usageEndDate | quantity | price | description                                     |
      | Test Asset 1 | Testing     |         | SN001        | true            |  10/10/2025 |   10/10/2025 | Shipped |   10/10/2026 |        1 |  1000 | Enterprise hardware asset for customer tracking |
