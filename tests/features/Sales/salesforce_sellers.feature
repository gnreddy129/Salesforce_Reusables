@mode:serial
Feature: Salesforce Sellers Management

  @sales @sellers @regression
  Scenario Outline: Create and Manage New Seller with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Sellers" in app launcher
    Then Add new seller with following details
      | Field            | Value              |
      | Party            | <Party>            |
      | Name             | <Name>             |
      | Seller Type      | <Seller Type>      |
      | Seller Tier      | <Seller Tier>      |
      | Sales Amount     | <Sales Amount>     |
      | Active To Date   | <Active To Date>   |
      | Active From Date | <Active From Date> |
    And Verify Seller is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Party    | Name          | Seller Type | Seller Tier | Sales Amount | Active To Date | Active From Date |
      | John Doe | Test Seller 1 | Reseller    | Gold        |        10000 |     12/03/2025 |       01/01/2025 |
      # | Test Party 2  | Test Seller 2| Corporate   | Tier 2      | 20000        | 12/31/2025     | 01/01/2025       |

# yeikuhozoiffa-1695@yopmail.com",