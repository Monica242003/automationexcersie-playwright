# Playwright Cucumber Automation Suite

[![Playwright Cucumber E2E Tests](https://github.com/Monica242003/automationexcersie-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/Monica242003/automationexcersie-playwright/actions/workflows/playwright.yml)

This repository contains the End-to-End (E2E) automation test suite for the [Automation Exercise](http://automationexercise.com) website. The suite is built using **Playwright**, **TypeScript**, and **Cucumber BDD**.

---

## 📂 Project Structure

```text
├── docs/                                # Test case & AI documentation
│   ├── Automation_Exercise_Test_Cases.xlsx  # Formatted Excel test cases
│   ├── Automation_Exercise_Test_Cases.pdf   # Professional PDF specification
│   └── AI_Integration_Ideas.pdf             # AI ideas whitepaper PDF
├── features/                            # Cucumber feature files
│   └── automation_exercise.feature      # Complete sequential test suite
├── src/                                 # Implementation source files
│   ├── pages/                           # Playwright Page Object Models (POM)
│   ├── steps/                           # BDD Step definitions
│   └── support/                         # Hooks and driver configuration
├── generate_docs.py                     # Python script to compile Excel/PDF docs
├── package.json                         # Node dependencies & test scripts
└── tsconfig.json                        # TypeScript configuration
```

---

## 📄 Project Documentation

We have generated comprehensive documentation for the test cases and future enhancements in the `docs/` folder:

1. **Excel Spreadsheet (`docs/Automation_Exercise_Test_Cases.xlsx`)**: Structured sheet with columns for ID, Name, Description, Steps, and Expected Results. Features custom formatting and auto-wrapping for easy tracking.
2. **PDF Specification Document (`docs/Automation_Exercise_Test_Cases.pdf`)**: A professionally formatted PDF document featuring a Summary Table of all automated test cases and detailed specifications for each scenario.
3. **AI Integration Document (`docs/AI_Integration_Ideas.pdf`)**: A professional whitepaper detailing five core architectural areas where AI can be applied to this test automation framework to increase resilience and debugging efficiency.

### Re-generating Documentation

If test cases or descriptions are updated in the suite, you can re-generate the documentation by running:

```bash
python generate_docs.py
```

*Note: Requires `openpyxl` and `fpdf2` python packages. If not installed, run: `pip install openpyxl fpdf2`.*

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3 (for document generation, optional)

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Tests

Execute the Cucumber test runner to run the automated scenarios:

```bash
npm test
```
