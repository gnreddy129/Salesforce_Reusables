# 🎯 Quick Reference - Simplified Cucumber Reports

## 📁 Hierarchical Structure

```
cucumber-reports/
├── index.html                          # 🏠 Main dashboard
├── sales/                              # 📊 Sales module
│   ├── price-books/report.html         #   � Price books feature
│   ├── leads/report.html               #   🎯 Leads feature
│   ├── accounts/report.html            #   🏢 Accounts feature
│   └── opportunities/report.html       #   � Opportunities feature
├── inventory/                          # �📦 Inventory module
│   └── location-groups/report.html     #   📍 Location groups feature
├── customerdata/                       # 👤 Customer data module
│   └── contacts/report.html            #   � Contacts feature
├── finance/                            # �💰 Finance module
│   └── [features]/report.html          #   💳 Finance features
├── service/                            # 🔧 Service module
│   ├── cases/report.html               #   📋 Cases feature
│   └── work-orders/report.html         #   🔧 Work orders feature
├── marketing/                          # 📢 Marketing module
│   └── [features]/report.html          #   📊 Marketing features
├── platform/                           # ⚙️ Platform module
│   └── [features]/report.html          #   🛠️ Platform features
├── otherfunctionality/                 # 🔧 Other functionality
│   ├── scorecards/report.html          #   📊 Scorecards feature
│   ├── streaming-channels/report.html  #   📡 Streaming channels
│   └── images/report.html              #   🖼️ Images feature
└── screenshots/                        # 📸 Screenshots by module
```

## 🚀 How to Generate Reports

| Method  | Command                 | Description           |
| ------- | ----------------------- | --------------------- |
| **NPM** | `npm run simple:report` | Generate reports only |

## 🌐 How to View Reports

| Method     | Command                                      | Description          |
| ---------- | -------------------------------------------- | -------------------- |
| **NPM**    | `npm run open:reports`                       | Open main dashboard  |
| **Direct** | Open `cucumber-reports/index.html`           | Manual access        |
| **Module** | Open `cucumber-reports/{module}/report.html` | Direct module access |

## ✅ Features

- ✅ **No timestamps** - Always latest report
- ✅ **Module organized** - Same as screenshots folder
- ✅ **Screenshots embedded** - Integrated in reports
- ✅ **Simple navigation** - Clean index page
- ✅ **Easy access** - Multiple ways to run/view
