Feature: Automation Exercise Complete E2E E-Commerce Test Suite

  @smoke @regression @positive @e2e
  Scenario: Main E2E E-Commerce Happy Path Flow (Register, Cart, Order, Invoice, Cleanup)
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click on "Signup / Login" button
    Then "New User Signup!" is visible
    When I enter name "John David" and email "johndavid_@example.com"
    And I click "Signup" button
    Then "ENTER ACCOUNT INFORMATION" is visible
    When I fill user account details and address from testData
    And I click "Create Account" button
    Then "ACCOUNT CREATED!" is visible
    When I click "Continue" button
    Then "Logged in as John David" is visible
    When I click "Products" button
    Then User is navigated to ALL PRODUCTS page successfully
    When I search product from testData
    Then "SEARCHED PRODUCTS" is visible
    And Verify all the products related to search are visible
    When I hover over first product and click "Add to cart"
    And I click "View Cart" button
    Then Verify cart page is displayed
    When I click Proceed To Checkout
    Then Verify Address Details and Review Your Order
    When I enter order comment from testData and click "Place Order"
    And I enter payment details from environment configuration
    And I click "Pay and Confirm Order" button
    Then success message "Your order has been placed successfully!" is visible
    When I click "Download Invoice" button and verify invoice is downloaded successfully
    And I click "Continue" button
    When I click "Delete Account" button
    Then "ACCOUNT DELETED!" is visible
    And I click "Continue" button

  @regression @positive
  Scenario: Test Case 2: Login User with correct email and password
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click on "Signup / Login" button
    Then "Login to your account" is visible
    When I register a temporary user "LoginCorrect" with email "logincorrect_@example.com" and password from env
    And I click on "Signup / Login" button
    And I enter correct email "logincorrect_@example.com" and password from env
    And I click "login" button
    Then "Logged in as LoginCorrect" is visible
    When I click "Delete Account" button
    Then "ACCOUNT DELETED!" is visible

  @regression @positive
  Scenario: Test Case 4: Logout User
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click on "Signup / Login" button
    Then "Login to your account" is visible
    When I register a temporary user "LogoutUser" with email "logoutuser_@example.com" and password from env
    And I click on "Signup / Login" button
    And I enter correct email "logoutuser_@example.com" and password from env
    And I click "login" button
    Then "Logged in as LogoutUser" is visible
    When I click "Logout" button
    Then User is navigated to login page

  @regression @positive
  Scenario: Test Case 12: Add Products in Cart
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click "Products" button
    And I hover over first product and click "Add to cart"
    And I click "Continue Shopping" button
    And I hover over second product and click "Add to cart"
    And I click "View Cart" button
    Then Verify both products are added to Cart
    And Verify their prices, quantity and total price

  @regression @positive
  Scenario: Test Case 21: Add review on product
    Given I navigate to url "http://automationexercise.com"
    When I click on "Products" button
    Then User is navigated to ALL PRODUCTS page successfully
    When I click on "View Product" of first product
    Then "Write Your Review" is visible
    When I submit review details from testData
    Then review success message "Thank you for your review." is visible

  # Negative Test Scenarios grouped at the bottom
  @regression @negative
  Scenario: Test Case 3: Login User with incorrect email and password
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click on "Signup / Login" button
    Then "Login to your account" is visible
    When I enter incorrect email "incorrect_@example.com" and wrong password from env
    And I click "login" button
    Then error "Your email or password is incorrect!" is visible

  @regression @negative
  Scenario: Test Case 5: Register User with existing email
    Given I navigate to url "http://automationexercise.com"
    Then Home page is visible successfully
    When I click on "Signup / Login" button
    Then "New User Signup!" is visible
    When I register a temporary user "ExistingUser" with email "existing_@example.com" and password from env
    And I click on "Signup / Login" button
    And I enter name "ExistingUser" and email "existing_@example.com"
    And I click "Signup" button
    Then error "Email Address already exist!" is visible
