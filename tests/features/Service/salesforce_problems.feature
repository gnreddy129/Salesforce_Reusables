@service @problems @regression
Feature: Create and Manage Problems in Salesforce Service Cloud

  @smoke @create
  Scenario Outline: Create and Manage New Problems with Complete Details
    Given Open a browser and login to the sales force site
    When Search for "Problems" in app launcher
    Then Add new problem with following details
      | Field                  | Value                    |
      | Subject                | <Subject>                |
      | Description            | <Description>            |
      | Status                 | <Status>                 |
      | Urgency                | <Urgency>                |
      | ParentProblem          | <ParentProblem>          |
      | Impact                 | <Impact>                 |
      | Priority               | <Priority>               |
      | Category               | <Category>               |
      | Subcategory            | <Subcategory>            |
      | PriorityOverrideReason | <PriorityOverrideReason> |
      | RootCauseSummary       | <RootCauseSummary>       |
      | ResolvedBy             | <ResolvedBy>             |
      | ResolutionDate         | <ResolutionDate>         |
      | ResolutionSummary      | <ResolutionSummary>      |
    Then Verify problem "<Subject>" exists in the list

    Examples: Standard Issues with Partial Details
      | Subject                   | Description                                    | Status | Urgency | ParentProblem | Impact | Priority | Category | Subcategory   | PriorityOverrideReason | RootCauseSummary               | ResolvedBy | ResolutionDate | ResolutionSummary                     |
      | Memory Leak in Production | Application memory usage constantly increasing | Open   | Medium  | PRB-000000001 | Medium | High     | Software | MS SQL Server | System stability risk  | Memory leak in background task | test test  |     17/11/2025 | Patched memory leak in task scheduler |
