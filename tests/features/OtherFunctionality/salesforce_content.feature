Feature: Salesforce CMS Content Workspace Creation
  As a Salesforce user
  I want to create new CMS content workspaces
  So that I can manage CMS content creation and publication efficiently

  @Content @CMS @OtherFunctionality @Smoke
  Scenario Outline: Create a new CMS workspace with comprehensive details
    Given Open a browser and login to the sales force site
    When Search for "Content" in app launcher
    When I create a new CMS workspace with the following details:
      | Field            | Value             |
      | Name             | <Name>            |
      | API Name         | <APIName>         |
      | Description      | <Description>     |
      | Channel          | <Channel>         |
      | Default Language | <DefaultLanguage> |
    And I should see the CMS workspace creation success
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name                   | APIName                | Description                          | Channel    | DefaultLanguage         |
      | Test Content Workspace | Test_Content_Workspace | Automated test workspace for content | Enablement | French |
      # | Marketing Hub          | Marketing_Hub          | Content workspace for marketing team | Skip       | English (United States) |
