@mode:serial
Feature: Salesforce Contact Requests Management

  @customer @regression
  Scenario Outline: Create and Manage New Contact Requests with Different Data
    Given Open a browser and login to the sales force site
    When Search for "Contact Requests" in app launcher
    Then Add new Contact Request with following details
      | Field                  | Value                  |
      | Requested By           | <RequestedBy>          |
      | Related To             | <RelatedTo>            |
      | Preferred Channel      | <PreferredChannel>     |
      | Preferred Phone Number | <PreferredPhoneNumber> |
      | Request Status         | <RequestStatus>        |
      | Request Reason         | <RequestReason>        |
      | Request Description    | <RequestDescription>   |
    Then Verify Contact Request is created successfully with details
      | Field        | Value         |
      | Requested By | <RequestedBy> |

    Examples:
      | RequestedBy | RelatedTo | PreferredChannel | PreferredPhoneNumber | RequestStatus | RequestReason | RequestDescription          |
      | John Smith  | Testing   | Phone            |      +1-555-987-6543 | Attempted     | Case          | Question about case charges |
      # | Jhon Smith  | Tech Solutions Inc 2025 | Phone            |      +1-555-123-4567 | New           | Account       | Need help with account configuration |
