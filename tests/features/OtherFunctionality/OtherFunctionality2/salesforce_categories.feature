@mode:serial
Feature: Salesforce Category Management

  @categories @regression
  Scenario Outline: Add new category
    Given Open a browser and login to the sales force site
    When Search for "Categories" in app launcher
    Then Click on "New" button of "Categories"
    Then Add new category with following details
      | Field          | Value            |
      | Name           | <Name>           |
      | Catalog        | <Catalog>        |
      | ShowMenu       | <ShowMenu>       |
      | ParentCategory | <ParentCategory> |
      | Description    | <Description>    |
      | SortOrder      | <SortOrder>      |
    Then Verify category is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name       | Catalog | ShowMenu | ParentCategory | Description         | SortOrder |
      | Test Cat A | Testing | true     |                | Auto-created test A |         1 |