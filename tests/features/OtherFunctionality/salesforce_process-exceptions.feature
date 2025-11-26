@mode:serial
Feature: Salesforce Process Exceptions Management

  @processexceptions @regression
  Scenario Outline: Add new process exception with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Process Exceptions" in app launcher
    Then Add new process exception with following details
      | Field              | Value               |
      | Category           | <Category>          |
      | Status             | <Status>            |
      | Priority           | <Priority>          |
      | Severity           | <Severity>          |
      | Message            | <Message>           |
      | Object Type        | <ObjectType>        |
      | Attached To        | <AttachedTo>        |
      | Case               | <Case>              |
      | External Reference | <ExternalReference> |
      | Description        | <Description>       |
    Then Verify process exception is created successfully
      | Category | <Category> |
      | Status   | <Status>   |
      | Priority | <Priority> |
      | Message  | <Message>  |

    Examples:
      | Category       | Status   | Priority | Severity | Message                   | ObjectType | AttachedTo  | Case     | ExternalReference | Description             |
      | Order Approval | Resolved | High     | High     | Payment processing failed | Payment    | P-000000001 | 00001036 | EXT-REF-001       | Order payment exception |
