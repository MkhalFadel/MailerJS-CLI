# ✉️ MailerJS-CLI

<p align="center">
  <img src="assets/mailerJsBanner.png" alt="MailerJS-CLI Banner" width="750">
</p>

<p align="center">
  <strong>A modern command-line tool for sending emails through SMTP.</strong>
</p>

<p align="center">
  Configure your SMTP account once, then send emails with attachments to one or multiple recipients directly from your terminal.
</p>

<p align="center">

![npm version](https://img.shields.io/npm/v/mailerjs-cli?style=for-the-badge)
![npm downloads](https://img.shields.io/npm/dm/mailerjs-cli?style=for-the-badge)
![License](https://img.shields.io/npm/l/mailerjs-cli?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D18-green?style=for-the-badge)

</p>

---

## About

MailerJS-CLI is a lightweight command-line tool for sending emails through SMTP directly from your terminal. It simplifies the process of configuring an email provider, composing messages, attaching files, and sending emails to one or multiple recipients through an interactive interface.

Whether you're sending job applications, notifications, newsletters, or bulk emails, MailerJS-CLI provides a fast, user-friendly workflow with built-in recipient validation, TXT file imports, SMTP connection testing, and persistent configuration to streamline repetitive email tasks.


---

# ✨ Features

* 📧 Interactive email sending
* 👥 Send to multiple recipients
* 📄 Import recipients from TXT files
* 📎 File attachment support
* ⚙️ One-time SMTP configuration
* ⚡ SMTP connection testing
* 🌐 Built-in SMTP provider presets
* 🛠 Custom SMTP server support
* ✅ Automatic email validation
* 🔄 Automatic duplicate removal
* 🎨 Beautiful interactive CLI
* ⏳ Progress spinners
* 📋 Sending summary
* 🔒 Secure SMTP authentication
* 💾 Persistent local configuration

---

# Supported Providers

* Gmail
* Outlook
* Yahoo
* Zoho Mail
* iCloud
* Custom SMTP

---

# Installation

```bash
npm install -g mailerjs-cli
```

---

# Requirements

* Node.js 18+
* npm

Verify your installation:

```bash
node -v
npm -v
```

---

# Quick Start

Configure your SMTP account:

```bash
mailer config
```

Test your configuration:

```bash
mailer test
```

Start MailerJS:

```bash
mailer
```

During the interactive session you can:

* Enter recipients manually.
* Import recipients from a TXT file.
* Attach a file.
* Review everything before sending.

---

# Commands

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `mailer`         | Start the interactive email sender |
| `mailer config`  | Configure SMTP settings            |
| `mailer test`    | Verify SMTP connection             |
| `mailer help`    | Show available commands            |
| `mailer version` | Display installed version          |

---

# Importing Recipients

MailerJS can import recipients directly from a plain text file.

Example:

```text
john@example.com
jane@example.com
alex@example.com
support@example.com
```

Rules:

* One email address per line
* Blank lines are ignored
* Invalid email addresses are skipped automatically
* Duplicate email addresses are removed automatically
* Email addresses are normalized before validation

After importing, MailerJS displays a summary including:

* Total recipients
* Valid email addresses
* Invalid email addresses
* Duplicates removed

---

# Example Workflow

```text
$ mailer

✔ Subject
✔ Message
✔ Attachment

How would you like to add recipients?

❯ Import from TXT file

Enter file path:
~/emails.txt

Recipients Imported

Total: 120
Valid: 117
Invalid: 2
Duplicates removed: 1

Email Review

Subject:
Summer Newsletter

Recipients:
117

Send emails? Yes

Sending email to john@example.com...
✔ Email sent

Sending email to jane@example.com...
✔ Email sent

Summary

Total Emails: 117
Sent: 117
Failed: 0
```

---

# Gmail Users

Google no longer allows SMTP login using your normal account password.

To use Gmail:

1. Enable Two-Factor Authentication.
2. Create an App Password.
3. Run:

```bash
mailer config
```

4. Use your Gmail address and the generated App Password.

---

# Configuration

MailerJS stores its configuration locally inside your home directory.

Example configuration:

```json
{
  "provider": "Gmail",
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": false,
    "username": "example@gmail.com",
    "password": "****************"
  },
  "sender": {
    "name": "John Doe",
    "email": "example@gmail.com"
  }
}
```

---

# Built With

* Node.js
* Nodemailer
* Inquirer
* Chalk
* Ora
* Figlet
* Validator.js

---

# Roadmap

* HTML email support
* Email templates
* CSV recipient import
* Multiple attachments
* Default attachment directory
* CC / BCC support
* Scheduled emails
* Verbose mode
* Configuration editor

---

# Development

Clone the repository:

```bash
git clone https://github.com/MkhalFadel/MailerJS-CLI.git
```

Install dependencies:

```bash
npm install
```

link locally:

```bash
npm link
```

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

See the **LICENSE** file for details.

---

# Author

**Mkhal Fadel**

GitHub: https://github.com/MkhalFadel

---

# Support

If you find MailerJS-CLI useful, consider giving the repository a ⭐ on GitHub. It helps others discover the project and supports future development.
