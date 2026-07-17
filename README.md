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

## ✨ Features

- 📧 Interactive email sending
- 👥 Multiple recipients
- 📎 File attachment support
- ⚡ SMTP connection testing
- ⚙️ Persistent configuration
- 🖥️ Beautiful interactive CLI
- 🎨 Colored terminal output
- ⏳ Progress spinners
- 📋 Sending summary
- 🔒 Secure SMTP authentication
- 🌐 Built-in SMTP provider presets
- 🛠 Custom SMTP server support

---

## Supported Providers

- Gmail
- Outlook
- Yahoo
- Zoho Mail
- iCloud
- Custom SMTP

---

## Installation

### npm

```bash
npm install -g mailerjs-cli
```

or

```bash
npm install --global mailerjs-cli
```

---

## Requirements

- Node.js 18+
- npm

Check your version:

```bash
node -v
npm -v
```

---

# Quick Start

### Configure SMTP

```bash
mailer config
```

Configure your email account once.

---

### Test SMTP

```bash
mailer test
```

Verify your SMTP credentials.

---

### Send Emails

```bash
mailer
```

The CLI will guide you through:

- Subject
- Message
- Attachment
- Recipients
- Confirmation

---

## Commands

| Command | Description |
|----------|-------------|
| `mailer` | Start the interactive email sender |
| `mailer config` | Configure SMTP credentials |
| `mailer test` | Test SMTP connection |
| `mailer help` | Display help information |
| `mailer version` | Display installed version |

---

# Example Workflow

```text
$ mailer

✔ Subject
✔ Message
✔ Attachment
✔ Recipient #1
✔ Recipient #2

Email Review

Subject:
Project Update

Recipients:
john@example.com
jane@example.com

Send emails? Yes

Sending email to john@example.com...
✔ Email sent

Sending email to jane@example.com...
✔ Email sent

Summary

Total Emails: 2
Sent: 2
Failed: 0
```

---

# Gmail Users

Google no longer allows SMTP login using your normal account password.

You must generate an **App Password**.

Steps:

1. Enable Two-Factor Authentication.
2. Generate an App Password.
3. Use the generated password inside:

```bash
mailer config
```

---

# Configuration

MailerJS stores your configuration locally.

Typical configuration:

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

- Node.js
- Nodemailer
- Inquirer
- Chalk
- Ora
- Figlet

---

# Roadmap

- HTML email support
- Email templates
- CC / BCC
- Multiple attachments
- CSV recipient import
- Default attachment directory
- Verbose mode
- Scheduling emails
- Configuration editor

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

If you'd like to improve MailerJS-CLI:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# License

Licensed under the MIT License.

See the LICENSE file for more information.

---

# Author

**MkhalFadel**

GitHub

https://github.com/MkhalFadel

---

## Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps the project grow and motivates future development.