@salesforce @service @change-requests @smoke @regression
Feature: Salesforce Change Requests Management

  @positive @create @priority-high
  Scenario: Create a new Change Request with all required fields
    Given Open a browser and login to the sales force site
    When Search for "Change Requests" in app launcher
    When Add new Change Request with the following details:
      | Field                       | Value                         |
      | Subject                     | <Subject>                     |
      | Description                 | <Description>                 |
      | Risk Level                  | <Risk Level>                  |
      | Status                      | <Status>                      |
      | Priority                    | <Priority>                    |
      | Impact                      | <Impact>                      |
      | Type of Change              | <Type of Change>              |
      | Business Justification      | <Business Justification>      |
      | Impact Analysis             | <Impact Analysis>             |
      | Remediation Plan            | <Remediation Plan>            |
      | Start Time (Estimated) Date | <Start Time (Estimated) Date> |
      | Start Time (Estimated) Time | <Start Time (Estimated) Time> |
      | End Time (Estimated) Date   | <End Time (Estimated) Date>   |
      | End Time (Estimated) Time   | <End Time (Estimated) Time>   |
      | Reviewer                    | <Reviewer>                    |
      | Reviewed On Date            | <Reviewed On Date>            |
      | Reviewed On Time            | <Reviewed On Time>            |
      | Final Review Notes          | <Final Review Notes>          |
    Then Verify Change Request is created successfully with details
      | Field   | Value     |
      | Subject | <Subject> |

    Examples:
      | Subject                  | Description                | Risk Level | Status | Priority | Impact | Type of Change | Business Justification | Impact Analysis            | Remediation Plan           | Start Time (Estimated) Date | Start Time (Estimated) Time | End Time (Estimated) Date | End Time (Estimated) Time | Reviewer        | Reviewed On Date | Reviewed On Time | Final Review Notes      |
      | Critical Security Update | Update to address security | High       | Open   | High     | High   | Major          | Security Patch         | To mitigate security risks | High impact if not applied |                  10/10/2025 |                    10:00 AM |                11/11/2025 |                  12:00 PM | Salesforce demo |       06/06/2025 |         02:00 PM | Approved for deployment |
