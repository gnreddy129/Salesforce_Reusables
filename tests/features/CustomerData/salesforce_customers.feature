@mode:serial
Feature: Salesforce Customer Management

  @customer @customers @regression
  Scenario Outline: Create and Manage New Customers with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Customers" in app launcher
    Then Add new customer with following details
      | Field                 | Value                |
      | Party                 | <Party>              |
      | Name                  | <Name>               |
      | Customer Status Type  | <CustomerStatusType> |
      | Total Life Time Value | <TotalLifeTimeValue> |
    Then Verify customer is created successfully with details
      | Field | Value   |
      | Name  | <Name>  |
      | Party | <Party> |

    Examples:
      | Party               | Name                   | CustomerStatusType | TotalLifeTimeValue |
      | John TestIndividual | Customer for John Test | Active             |              50000 |
      # | Add New Individual   | New Customer Test         | Inactive           | 25000              |
