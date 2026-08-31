I have used Bruno as the took to run restful-booker API tests

### Option 1: Run via Bruno App (UI)

1. Open **Bruno** app
2. Click **Open Collection**
3. Select the `restful-booker-api` folder
4. Choose an environment (e.g., `local` or `prod`)
5. Click **Run** on individual requests or **Run Collection**
### Option 2: Run via CLI

Install Bruno CLI:

```bash
npm install -g @usebruno/cli
```

Navigate to collection folder:

```bash
cd restful-booker-api
```

Run all tests:

```bash
bru run
```

Run with a specific environment:

```bash
bru run --env local
bru run --env prod
```

Run a specific folder:

```bash
bru run <folder-name>
```

Generate HTML report:

```bash
bru run --reporter html
```

## 🗂️ Collection Structure

```
restful-booker-api/
├── environments/       # Environment variables (local, prod)
├── auth/               # Authentication requests
├── booking/            # Booking CRUD requests
└── README.md
```
