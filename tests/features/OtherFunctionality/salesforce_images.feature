@images @otherFunctionality @regression
Feature: Salesforce Images Management
  As a Salesforce administrator
  I want to create and manage Images
  So that I can organize visual content effectively in the system

  Background:
    Given Open a browser and login to the sales force site

  @mode:serial
  Scenario Outline: Create and Manage New Images with Different Data
    When Search for "Images" in app launcher
    And Add new Image with following details
      | Field             | Value               |
      | Name              | <Name>              |
      | ImageOrientation  | <ImageOrientation>  |
      | Title             | <Title>             |
      | AccessibilityText | <AccessibilityText> |
      | URL               | <URL>               |
      | Active            | <Active>            |
      | Category          | <Category>          |
      | ImageType         | <ImageType>         |
      | File              | <File>              |
      | CameraAngle       | <CameraAngle>       |
    Then Verify Image is created successfully with details
      | Field | Value  |
      | Name  | <Name> |

    Examples:
      | Name         | ImageOrientation | Title         | AccessibilityText     | URL                   | Active | Category | ImageType | File     | CameraAngle |
      | Test Image 1 | Landscape        | Product Image | Image of main product | https://example.com/1 | true   | Logos    | Training  | --None-- | Front       |
      # | Test Image 2  | Portrait          | Banner Image    | Marketing banner      | https://example.com/2  | true   | Marketing   | Thumbnail  | image2.png   | Side         |
