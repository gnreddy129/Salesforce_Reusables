Feature: Salesforce Leads Creation and Management

  Scenario Outline: Create new leads with different test data
    Given Open a browser and login to the sales force site
    When Search for "Leads" in app launcher
    And I create a new lead with following details:
      | Field       | Value        |
      | First Name  | <firstName>  |
      | Last Name   | <lastName>   |
      | Company     | <company>    |
      | Email       | <email>      |
      | Phone       | <phone>      |
      | Lead Status | <leadStatus> |
      | Industry    | <industry>   |
    Then I should see the lead created successfully
      | Field Name | Value      |
      | Lead Name  | <leadName> |

    Examples:
      | firstName | lastName | company       | email                     | phone      | leadStatus           | industry   | leadName   |
      | Johnny    | Deep     | Tech Corp Ltd | johnny.smith@techcorp.com | 9876543210 | Open - Not Contacted | Technology | John Smith |
    # | Sarah     | Johnson   | Health Care Inc| sarah.j@healthcare.com  | 8765432109 | Working - Contacted   | Healthcare | Sarah Johnson |
