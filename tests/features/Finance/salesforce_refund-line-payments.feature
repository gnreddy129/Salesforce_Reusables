Feature: Salesforce Refund Line Payment Creation
  As a Salesforce user
  I want to create new refund line payments
  So that I can manage financial refund transactions efficiently

  @RefundLinePayment @Finance @Smoke
  Scenario Outline: Create a new refund line payment with various field combinations
    Given Open a browser and login to the sales force site
    When Search for "Refund Line Payments" in app launcher
    And I create a new refund line payment with the following details:
      | Field                          | Value                         |
      | Refund                         | <Refund>                      |
      | Type                           | <Type>                        |
      | Has Been Unapplied             | <HasBeenUnapplied>            |
      | Payment                        | <Payment>                     |
      | Comments                       | <Comments>                    |
      | Amount                         | <Amount>                      |
      | Associated Account             | <AssociatedAccount>           |
      | Associated Refund Line Payment | <AssociatedRefundLinePayment> |
      | Date                           | <Date>                        |
      | DateTime                       | <DateTime>                    |
      | Effective Date                 | <EffectiveDate>               |
      | Effective Date Time            | <EffectiveDateTime>           |
      | Applied Date                   | <AppliedDate>                 |
      | Applied Date Time              | <AppliedDateTime>             |
      | Unapplied Date                 | <UnappliedDate>               |
      | Unapplied Date Time            | <UnappliedDateTime>           |
    And  I should see the refund line payment created successfully
      |Field                          | Value                         |
      | Refund                         | <Refund>                      |

    Examples:
      | Refund      | Type    | HasBeenUnapplied | Payment     | Comments                 | Amount | AssociatedAccount | AssociatedRefundLinePayment | Date       | DateTime | EffectiveDate | EffectiveDateTime | AppliedDate | AppliedDateTime | UnappliedDate | UnappliedDateTime |
      | R-000000003 | Applied | No               | P-000000002 | Automated test comment 1 |   50 | Testing           | --None--                    | 12/12/2024 | 10:00 AM |    10/12/2024 |          10:30 AM |  05/11/2024 |        11:00 AM | --None--      | --None--          |
      # | Test Refund 002 | Debit   | Yes              | Payment-002 | Automated test comment 2 | 750.50 | Test Account 2    | RefundLinePayment-001       | 12/22/2024 |  2:00 PM |    12/22/2024 |           2:30 PM |  12/22/2024 |         3:00 PM |    12/23/2024 |           4:00 PM |
