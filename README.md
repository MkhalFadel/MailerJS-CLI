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

MailerJS-CLI is a lightweight command-line tool for sending emails through SMTP. It provides a simple, interactive way to configure an email provider, compose plain text emails, HTML emails, or reusable HTML templates, attach files, and send emails to one or multiple recipients directly from your terminal.

Whether you're sending job applications, notifications, newsletters, or bulk emails, MailerJS-CLI streamlines the process with recipient validation, TXT file imports, HTML email support, reusable HTML templates, SMTP connection testing, and persistent configuration.


---

# ✨ Features

* 📧 Interactive email sending
* 📝 Plain text email support
* 🌐 HTML email support
* 📄 Reusable HTML template support
* 🏷️ Dynamic placeholder replacement
* 👥 Send to multiple recipients
* 📄 Import recipients from TXT files
* 📎 Multiple attachment support
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

* Choose between plain text, HTML files, or reusable HTML templates.
* Enter recipients manually or import them from a TXT file.
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

# HTML Emails

MailerJS-CLI supports sending HTML emails directly from an HTML file.

Choose **HTML File** as the message format, provide the path to your HTML document, and MailerJS-CLI will load and send it as the email body.

Example:

```html
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif;">
    <h2>Welcome!</h2>
    <p>This email was sent using <strong>MailerJS-CLI</strong>.</p>

    <a href="https://github.com/MkhalFadel/MailerJS-CLI">
      View the Project
    </a>
  </body>
</html>
```
---

# HTML Templates

MailerJS-CLI supports reusable HTML templates with dynamic placeholders.

Templates are stored inside:

~/.mailerjs/templates

Example template:

<h2>Hello {{name}}</h2>

<p>
Thank you for applying to {{company}}.
</p>

<p>
Position: {{position}}
</p>

When sending an email, MailerJS-CLI automatically detects every placeholder and prompts you to provide a value.

Example:

name >
John

company >
OpenAI

position >
Backend Developer

The placeholders are replaced before the email is sent, allowing you to reuse the same template with different content.

---

# Example Workflow

```text
$ mailer

████╗   ████╗ █████╗ ██╗██╗     ███████╗██████╗      ██╗███████╗
████╗ ████║██╔══██╗██║██║     ██╔════╝██╔══██╗     ██║██╔════╝
██╔████╔██║███████║██║██║     █████╗  ██████╔╝     ██║███████╗
██║╚██╔╝██║██╔══██║██║██║     ██╔══╝  ██╔══██╗██   ██║╚════██║
██║ ╚═╝ ██║██║  ██║██║███████╗███████╗██║  ██║╚█████╔╝███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚════╝ ╚══════╝

Modern SMTP Email CLI

Email Subject
─────────────
? > Project Update

Email Message
─────────────
? Choose format type: Plain text

Type "END" on a new line when finished.

 1 │ Hello team,
 2 │
 3 │ The latest build has been deployed successfully.
 4 │ END

Attachments
───────────
? Include attachments? Yes

? Enter file path:
~/Documents/report.pdf

? Add another attachment? Yes

? Enter file path:
~/Documents/changelog.pdf

? Add another attachment? No

Recipients
──────────
? How would you like to add recipients?
❯ Enter manually

When you finish adding recipients press Enter...

Recipient #1
────────────
? > john@example.com

Recipient #2
────────────
? > jane@example.com

Recipient #3
────────────
? >

───────────────
Email Review

Subject:
Project Update

Message:
Hello team,

The latest build has been deployed successfully.

Attachments:
~/Documents/report.pdf
~/Documents/changelog.pdf

Recipients:
john@example.com
jane@example.com

? Send emails? Yes

✔ Email sent to john@example.com
✔ Email sent to jane@example.com

Summary
───────
ℹ Total Emails: 2
✔ Sent: 2
✖ Failed: 0
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
