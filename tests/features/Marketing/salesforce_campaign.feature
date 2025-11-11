Feature: Campaign Management in Salesforce
    As a marketing user
    I want to create and manage marketing campaigns
    So that I can track and organize marketing initiatives effectively

  Scenario Outline: Create a new marketing campaign with complete details
    Given Open a browser and login to the sales force site
    When Search for "Campaigns" in app launcher
    And I create a new campaign with following details:
      | Field Name        | Value              |
      | Campaign Name     | <campaignName>     |
      | Type              | <type>             |
      | Status            | <status>           |
      | Active            | <isActive>         |
      | Start Date        | <startDate>        |
      | Expected Revenue  | <expectedRevenue>  |
      | Budgeted Cost     | <budgetedCost>     |
      | Actual Cost       | <actualCost>       |
      | Expected Response | <expectedResponse> |
      | Description       | <description>      |
    Then I should see the campaign created successfully
      | Field Name    | Value          |
      | Campaign Name | <campaignName> |

    Examples:
      | campaignName                | type       | status      | isActive | startDate  | expectedRevenue | budgetedCost | actualCost | expectedResponse | description |                                                                                                         |
      | End of Year Campaign 2025   | Conference | Planned     | true     | 11/01/2025 |      15/01/2026 |        50000 |      25000 |                0 |          10 | End of year promotional campaign targeting existing customers with special holiday offers and discounts |
      # | Spring Marketing Drive 2026 | Webinar    | In Progress | true     | 03/01/2025 |      04/30/2025 |        30000 |      15000 |             5000 |          15 | Spring season marketing campaign focused on new product launches and customer engagement activities     |
